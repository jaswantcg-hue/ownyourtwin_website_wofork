## PR: Remove hardcoded secret from history and use env vars

Summary
- Replaces a hardcoded `DATABASE_URL` in `docker-compose.yml` with an environment variable reference.
- Adds `.env.example` with placeholders.
- Provides `replacements.txt` for `git-filter-repo` and a cleanup script to purge history.

Why
- A secret (database credential) was committed into the repository. This exposes access and must be revoked and removed from git history.

What I changed
- Updated `docker-compose.yml` to use `DATABASE_URL=${DATABASE_URL}`.
- Added `.env.example` with placeholders instead of real credentials.

How to run the history cleanup (maintainers)
1. Rotate/revoke the exposed DB credentials in your DB provider immediately.
2. Ensure you have `git-filter-repo` installed: https://github.com/newren/git-filter-repo
3. Review `replacements.txt` to confirm the exact secret mapping.
4. Run the cleanup script locally (it will mirror the repo and force-push cleaned history):
```bash
./scripts/cleanup-secrets.sh --remote <git-remote-url>
```
5. Verify remote, CI, and deployments after pushing cleaned history.

Notes & safety
- The `replacements.txt` file contains the exact secret string; delete it after running the cleanup to avoid storing it in plain files.
- Force-pushing rewritten history will require all contributors to reclone or reset their local clones. Communicate this change to the team.

Suggested review checklist
- [ ] Confirm credentials were rotated/revoked at the provider
- [ ] Confirm `replacements.txt` was used and then securely deleted
- [ ] Confirm no other hardcoded secrets remain
- [ ] Merge and communicate history rewrite to all contributors
