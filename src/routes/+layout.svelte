<!--
  Root Layout
  Main application layout wrapper with global providers
-->
<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { authStore } from "$lib/stores/auth";
  import Toast from "$lib/components/common/Toast.svelte";

  interface Props {
    children: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  // Check authentication status on mount
  onMount(() => {
    authStore.checkAuth();
  });
</script>

<svelte:head>
  <title>OwnYourTwin - Your Digital Twin</title>
</svelte:head>

<!-- Main content -->
{@render children()}

<!-- Global toast notifications -->
<Toast />
