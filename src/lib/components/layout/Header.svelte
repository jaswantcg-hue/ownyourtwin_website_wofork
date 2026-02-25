<!--
  Header Component
  Main navigation header with in-page nav links, Login, and Sign Up for Early Access CTA
-->
<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { isAuthenticated, currentUser, authStore } from "$lib/stores/auth";
  import { uiStore } from "$lib/stores/ui";
  import Button from "../common/Button.svelte";
  import Avatar from "../common/Avatar.svelte";
  import Logo from "../common/Logo.svelte";

  interface Props {
    /** Transparent header (for landing page) */
    transparent?: boolean;
    /** Handler for opening demo request modal */
    onDemoClick?: () => void;
  }

  let { transparent = false, onDemoClick }: Props = $props();

  let showUserMenu = $state(false);
  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);

  // Navigation items for authenticated users
  const navItems = [
    { label: "Journal", href: "/app/chat", icon: "message-circle" },
    { label: "Dashboard", href: "/app/dashboard", icon: "layout-dashboard" },
    { label: "Explorer", href: "/app/explorer", icon: "compass" },
  ];

  // Landing page nav links (smooth scroll)
  const landingNavItems = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "For You", href: "#for-individuals" },
    { label: "For Business", href: "/forBusiness" },
    { label: "Blogs", href: "/blog" },
  ];

  // Handle logout
  async function handleLogout() {
    await authStore.logout();
    goto("/");
  }

  // Handle logo click - logout if authenticated
  async function handleLogoClick(e: Event) {
    e.preventDefault();
    if ($isAuthenticated) {
      await authStore.logout();
    }
    goto("/");
  }

  // Handle navigation click
  function handleNavClick(e: Event, href: string) {
    e.preventDefault();
    goto(href);
  }

  // Handle smooth scroll for landing page nav
  function handleSmoothScroll(e: Event, href: string) {
    e.preventDefault();
    mobileMenuOpen = false;
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Close menu on outside click
  function handleOutsideClick() {
    showUserMenu = false;
  }

  // Track scroll for header background
  function handleScroll() {
    scrolled = window.scrollY > 50;
  }
</script>

<svelte:window onclick={handleOutsideClick} onscroll={handleScroll} />

<header
  class="
    fixed top-0 left-0 right-0 z-50
    transition-all duration-300
    {transparent && !scrolled
    ? 'bg-transparent'
    : 'bg-void-900/90 backdrop-blur-xl border-b border-void-800'}
  "
>
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <a
        href="/"
        onclick={handleLogoClick}
        class="flex items-center gap-2 group"
      >
        <Logo size="md" />
      </a>

      <!-- Navigation -->
      {#if $isAuthenticated}
        <!-- Authenticated nav -->
        <nav class="hidden md:flex items-center gap-1">
          {#each navItems as item}
            <a
              href={item.href}
              onclick={(e) => handleNavClick(e, item.href)}
              class="
                px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                {$page.url.pathname === item.href
                ? 'text-white bg-void-700/80'
                : 'text-void-300 hover:text-white hover:bg-void-800/50'}
              "
            >
              {item.label}
            </a>
          {/each}
        </nav>

        <!-- User menu -->
        <div class="relative">
          <button
            class="flex items-center gap-3 p-2 rounded-xl hover:bg-void-800/50 transition-colors"
            onclick={(e) => {
              e.stopPropagation();
              showUserMenu = !showUserMenu;
            }}
          >
            <Avatar name={$currentUser?.name || ""} size="sm" status="online" />
            <span class="hidden md:block text-sm text-void-200">
              {$currentUser?.name || "User"}
            </span>
            <svg
              class="w-4 h-4 text-void-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <!-- Dropdown menu -->
          {#if showUserMenu}
            <div
              class="absolute right-0 mt-2 w-56 bg-void-800 border border-void-700 rounded-xl shadow-xl overflow-hidden animate-slide-down"
              role="menu"
              tabindex="-1"
              onkeydown={(e) => e.key === "Escape" && (showUserMenu = false)}
            >
              <div class="p-4 border-b border-void-700">
                <div class="font-medium text-white">{$currentUser?.name}</div>
                <div class="text-sm text-void-400">{$currentUser?.email}</div>
              </div>
              <div class="p-2">
                <a
                  href="/app/dashboard"
                  onclick={(e) => handleNavClick(e, "/app/dashboard")}
                  class="flex items-center gap-3 px-3 py-2 rounded-lg text-void-300 hover:text-white hover:bg-void-700 transition-colors"
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Account Settings
                </a>
                <button
                  class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-void-300 hover:text-white hover:bg-void-700 transition-colors"
                  onclick={handleLogout}
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
          {/if}
        </div>
      {:else}
        <!-- Public nav - Landing page links + Login + Sign Up for Early Access -->
        <nav class="hidden md:flex items-center gap-6">
          {#each landingNavItems as item}
            <a
              href={item.href}
              onclick={(e) => {
                if (item.href.startsWith("#")) {
                  handleSmoothScroll(e, item.href);
                } else {
                  handleNavClick(e, item.href);
                }
              }}
              class="text-sm text-void-300 hover:text-white transition-colors font-medium"
            >
              {item.label}
            </a>
          {/each}
        </nav>

        <div class="hidden md:flex items-center gap-3">
          <Button variant="ghost" href="/login">Login</Button>
          <Button variant="primary" onclick={onDemoClick}>
            Sign Up for Early Access
          </Button>
        </div>
      {/if}

      <!-- Mobile menu button -->
      <button
        class="md:hidden p-2 rounded-lg text-void-300 hover:text-white hover:bg-void-800"
        onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {#if mobileMenuOpen}
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          {:else}
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          {/if}
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    {#if mobileMenuOpen && !$isAuthenticated}
      <div class="md:hidden py-4 border-t border-void-800 animate-slide-down">
        <nav class="flex flex-col gap-2 mb-4">
          {#each landingNavItems as item}
            <a
              href={item.href}
              onclick={(e) => {
                if (item.href.startsWith("#")) {
                  handleSmoothScroll(e, item.href);
                } else {
                  mobileMenuOpen = false;
                  handleNavClick(e, item.href);
                }
              }}
              class="px-4 py-2 text-sm text-void-300 hover:text-white transition-colors font-medium rounded-lg hover:bg-void-800/50"
            >
              {item.label}
            </a>
          {/each}
        </nav>
        <div class="flex flex-col gap-2 px-4">
          <Button variant="ghost" href="/login">Login</Button>
          <Button variant="primary" onclick={onDemoClick}>
            Sign Up for Early Access
          </Button>
        </div>
      </div>
    {/if}
  </div>
</header>

<style>
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-down {
    animation: slideDown 0.2s ease-out;
  }
</style>
