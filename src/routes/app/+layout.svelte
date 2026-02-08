<!--
  App Layout
  Layout for authenticated app pages with navigation tabs
-->
<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { isAuthenticated, currentUser, authStore } from "$lib/stores/auth";
  import { twinStore } from "$lib/stores/twin";
  import { uiStore } from "$lib/stores/ui";
  import { Avatar, Tabs } from "$lib/components/common";

  interface Props {
    children: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  // Navigation tabs
  const tabs = [
    { id: "chat", label: "Journal", icon: "message-circle" },
    { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
    { id: "explorer", label: "Explorer", icon: "compass" },
  ];

  // Get active tab from URL
  let activeTab = $derived($page.url.pathname.split("/").pop() || "chat");

  // Handle tab change
  function handleTabChange(tabId: string) {
    goto(`/app/${tabId}`);
    uiStore.setActiveTab(tabId);
  }

  // Handle logout
  async function handleLogout() {
    await authStore.logout();
    goto("/");
  }

  // Load twin data on mount
  onMount(() => {
    // Redirect if not authenticated
    if (!$isAuthenticated) {
      goto("/login");
      return;
    }

    // Load twin data
    twinStore.loadTwin();
    twinStore.loadActivities();
    twinStore.loadEarnings();
  });

  // Watch auth state
  $effect(() => {
    if (!$isAuthenticated) {
      goto("/login");
    }
  });
</script>

<svelte:head>
  <title>AuraAI - {tabs.find((t) => t.id === activeTab)?.label || "App"}</title>
</svelte:head>

<div class="min-h-screen bg-void-950 flex flex-col">
  <!-- App Header -->
  <header
    class="sticky top-0 z-40 bg-void-900/80 backdrop-blur-xl border-b border-void-800"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a href="/app/chat" class="flex items-center gap-2">
          <div
            class="w-9 h-9 rounded-xl bg-gradient-to-br from-cosmic-500 to-cosmic-600 flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <span class="text-lg font-bold text-white hidden sm:block">
            Aura<span class="text-cosmic-400">AI</span>
          </span>
        </a>

        <!-- Navigation Tabs -->
        <nav class="flex items-center gap-1">
          {#each tabs as tab}
            <a
              href="/app/{tab.id}"
              class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                {activeTab === tab.id
                ? 'text-white bg-void-700/80'
                : 'text-void-400 hover:text-void-200 hover:bg-void-800/50'}"
            >
              {#if tab.icon === "message-circle"}
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              {:else if tab.icon === "layout-dashboard"}
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              {:else if tab.icon === "compass"}
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 9l6 6M15 9l-6 6"
                  />
                </svg>
              {:else}
                <!-- fallback icon if needed -->
              {/if}
              <span class="hidden sm:block">{tab.label}</span>
            </a>
          {/each}
        </nav>

        <div class="flex items-center gap-4">
          <!-- Twin Completion Status -->
          <div
            class="hidden md:flex items-center gap-3 bg-void-800/50 px-3 py-1.5 rounded-full border border-void-700/50 hover:bg-void-800 transition-colors cursor-help"
            title="Interact with your twin to increase its knowledge"
          >
            <div class="text-xs text-void-300">Twin Completeness</div>
            <div class="flex items-center gap-2">
              <div class="w-20 h-1.5 bg-void-700 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-cosmic-500 to-purple-500 w-[15%] animate-pulse-slow"
                ></div>
              </div>
              <span class="text-xs font-medium text-white">15%</span>
            </div>
          </div>

          <!-- User menu -->
          <div class="flex items-center gap-3">
            <button
              class="p-2 rounded-lg text-void-400 hover:text-white hover:bg-void-800 transition-colors"
              title="Notifications"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            <div class="relative group">
              <button
                class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-void-800 transition-colors"
              >
                <Avatar
                  name={$currentUser?.name || ""}
                  size="sm"
                  status="online"
                />
              </button>

              <!-- Dropdown -->
              <div
                class="absolute right-0 top-full mt-2 w-48 bg-void-800 border border-void-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
              >
                <div class="p-3 border-b border-void-700">
                  <div class="font-medium text-white text-sm">
                    {$currentUser?.name}
                  </div>
                  <div class="text-xs text-void-400">{$currentUser?.email}</div>
                </div>
                <div class="p-2">
                  <a
                    href="/app/dashboard"
                    class="flex items-center gap-2 px-3 py-2 text-sm text-void-300 hover:text-white hover:bg-void-700 rounded-lg transition-colors"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </a>
                  <button
                    onclick={handleLogout}
                    class="w-full flex items-center gap-2 px-3 py-2 text-sm text-void-300 hover:text-white hover:bg-void-700 rounded-lg transition-colors"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Main content -->
  <main class="flex-1">
    {@render children()}
  </main>
</div>
