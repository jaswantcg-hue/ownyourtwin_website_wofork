#!/usr/bin/env bash
set -euo pipefail

# cleanup-secrets.sh
# Usage: ./scripts/cleanup-secrets.sh [--remote <remote-url>]
# This script creates a mirror, runs git-filter-repo with the repo's `replacements.txt`,
# and force-pushes the cleaned history. It does NOT delete your local working files.

REPLACEMENTS_FILE="replacements.txt"
TMP_DIR="/tmp/auraai-repo-mirror-$$"
REMOTE_URL=""

usage(){
  echo "Usage: $0 [--remote <remote-url>]"
  echo "If --remote is not provided, the script will attempt to read origin from git." 
  exit 1
}

if [ "${1-}" = "--remote" ]; then
  REMOTE_URL="${2-}"
  if [ -z "$REMOTE_URL" ]; then
    usage
  fi
elif [ "${1-}" != "" ]; then
  usage
fi

if [ ! -f "$REPLACEMENTS_FILE" ]; then
  echo "Error: $REPLACEMENTS_FILE not found in repository root."
  echo "Ensure you have a replacements.txt with the exact secret to replace."
  exit 1
fi

if [ -z "$REMOTE_URL" ]; then
  if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    REMOTE_URL=$(git remote get-url origin 2>/dev/null || true)
  fi
fi

if [ -z "$REMOTE_URL" ]; then
  echo "No remote URL detected. Provide one with --remote <remote-url>."
  exit 1
fi

if ! command -v git-filter-repo >/dev/null 2>&1; then
  echo "git-filter-repo not found. Install it: https://github.com/newren/git-filter-repo"
  echo "Or use BFG as an alternative: https://rtyley.github.io/bfg-repo-cleaner/"
  exit 1
fi

echo "Mirror cloning $REMOTE_URL -> $TMP_DIR"
git clone --mirror "$REMOTE_URL" "$TMP_DIR"

echo "Running git-filter-repo with $REPLACEMENTS_FILE"
cp "$REPLACEMENTS_FILE" "$TMP_DIR/"
pushd "$TMP_DIR" >/dev/null
git-filter-repo --replace-text "$REPLACEMENTS_FILE"
popd >/dev/null

echo "Pushing cleaned history back to remote (force)"
pushd "$TMP_DIR" >/dev/null
git push --force --all
git push --force --tags
popd >/dev/null

echo "Done. Cleaned mirror is in: $TMP_DIR"
echo "Verify the remote and your downstream clones. If everything looks good, you may remove the mirror: rm -rf $TMP_DIR"
echo "Important: Rotate/revoke the exposed credentials immediately at your provider."
echo "Also remove the local replacements file and any other temporary artifacts after use: rm -v $REPLACEMENTS_FILE"
