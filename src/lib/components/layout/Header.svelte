<!--
  Header Component — OwnYourTwin Redesign
  Monochrome editorial: transparent over hero, white on scroll
-->
<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { isAuthenticated, currentUser, authStore } from "$lib/stores/auth";
  import Avatar from "../common/Avatar.svelte";
  import Logo from "../common/Logo.svelte";

  interface Props {
    transparent?: boolean;
    onDemoClick?: () => void;
  }

  let { transparent = false, onDemoClick }: Props = $props();

  let showUserMenu = $state(false);
  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);

  const withBase = (path: string) => `${base}${path}`;

  const navItems = [
    { label: "Journal", href: withBase("/app/chat") },
    { label: "Dashboard", href: withBase("/app/dashboard") },
    { label: "Explorer", href: withBase("/app/explorer") },
  ];

  const landingNavItems = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "For You", href: "#for-individuals" },
    { label: "For Business", href: withBase("/forBusiness") },
    { label: "Blog", href: withBase("/blog") },
  ];

  async function handleLogout() {
    await authStore.logout();
    goto(withBase("/"));
  }

  async function handleLogoClick(e: Event) {
    e.preventDefault();
    if ($isAuthenticated) await authStore.logout();
    goto(withBase("/"));
  }

  function handleNavClick(e: Event, href: string) {
    e.preventDefault();
    goto(href);
  }

  function handleSmoothScroll(e: Event, href: string) {
    mobileMenuOpen = false;
    if ($page.url.pathname === withBase("/")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      e.preventDefault();
      goto(withBase("/" + href));
    }
  }

  function handleOutsideClick() {
    showUserMenu = false;
  }

  function handleScroll() {
    scrolled = window.scrollY > 40;
  }
</script>

<svelte:window onclick={handleOutsideClick} onscroll={handleScroll} />

<header
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
  style="
    background-color: {transparent && !scrolled ? 'transparent' : 'rgba(255,255,255,0.97)'};
    backdrop-filter: {scrolled ? 'blur(12px)' : 'none'};
    border-bottom: {scrolled ? '1px solid #e0e0e0' : '1px solid transparent'};
  "
>
  <div style="max-width:1200px; margin:0 auto; padding:0 24px;">
    <div style="display:flex; align-items:center; justify-content:space-between; height:64px;">

      <!-- Logo -->
      <a href={withBase("/")} onclick={handleLogoClick} style="display:flex; align-items:center; gap:8px; text-decoration:none;">
        <Logo size="md" />
      </a>

      <!-- Nav -->
      {#if $isAuthenticated}
        <nav style="display:flex; align-items:center; gap:4px;">
          {#each navItems as item}
            <a
              href={item.href}
              onclick={(e) => handleNavClick(e, item.href)}
              style="
                padding:8px 16px;
                border-radius:9999px;
                font-family:'Montserrat',sans-serif;
                font-size:0.875rem;
                font-weight:500;
                text-decoration:none;
                transition:all 0.2s;
                color:{$page.url.pathname === item.href ? '#111111' : '#888888'};
                background:{$page.url.pathname === item.href ? '#efefef' : 'transparent'};
              "
            >{item.label}</a>
          {/each}
        </nav>
        <!-- User menu -->
        <div style="position:relative;">
          <button
            style="display:flex; align-items:center; gap:10px; padding:8px 12px; border-radius:9999px; border:none; background:transparent; cursor:pointer; transition:background 0.2s;"
            onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background = '#f0f0f0'}
            onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            onclick={(e) => { e.stopPropagation(); showUserMenu = !showUserMenu; }}
          >
            <Avatar name={$currentUser?.name || ""} size="sm" status="online" />
            <span style="font-family:'Montserrat',sans-serif; font-size:0.875rem; font-weight:500; color:#555555;">{$currentUser?.name || "User"}</span>
          </button>
          {#if showUserMenu}
            <div
              class="animate-slide-down"
              role="menu"
              tabindex="-1"
              onkeydown={(e) => e.key === "Escape" && (showUserMenu = false)}
              style="position:absolute; right:0; top:calc(100% + 8px); width:220px; background:#ffffff; border:1px solid #e0e0e0; border-radius:12px; box-shadow:0 8px 32px rgba(0,0,0,0.1); overflow:hidden;"
            >
              <div style="padding:16px; border-bottom:1px solid #f0f0f0;">
                <div style="font-family:'Montserrat',sans-serif; font-weight:600; font-size:0.9rem; color:#111111;">{$currentUser?.name}</div>
                <div style="font-family:'Lora',serif; font-size:0.8rem; color:#aaaaaa;">{$currentUser?.email}</div>
              </div>
              <div style="padding:8px;">
                <a
                  href={withBase("/app/dashboard")}
                  onclick={(e) => handleNavClick(e, withBase("/app/dashboard"))}
                  style="display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:8px; font-family:'Montserrat',sans-serif; font-size:0.875rem; color:#555555; text-decoration:none; transition:all 0.2s;"
                  onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background='#f8f8f6'; (e.currentTarget as HTMLElement).style.color='#111111'; }}
                  onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.color='#555555'; }}
                >Account Settings</a>
                <button
                  onclick={handleLogout}
                  style="width:100%; display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:8px; font-family:'Montserrat',sans-serif; font-size:0.875rem; color:#555555; background:none; border:none; cursor:pointer; transition:all 0.2s; text-align:left;"
                  onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.background='#f8f8f6'; (e.currentTarget as HTMLElement).style.color='#111111'; }}
                  onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.color='#555555'; }}
                >Sign Out</button>
              </div>
            </div>
          {/if}
        </div>

      {:else}
        <!-- Public nav -->
        <nav class="hidden md:flex" style="align-items:center; gap:8px;">
          {#each landingNavItems as item}
            <a
              href={item.href}
              onclick={(e) => {
                if (item.href.startsWith("#")) handleSmoothScroll(e, item.href);
                else handleNavClick(e, item.href);
              }}
              style="padding:8px 14px; font-family:'Montserrat',sans-serif; font-size:0.875rem; font-weight:500; color:#888888; text-decoration:none; border-radius:9999px; transition:all 0.2s;"
              onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.color='#111111'; }}
              onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.color='#888888'; }}
            >{item.label}</a>
          {/each}
        </nav>

        <div class="hidden md:flex" style="align-items:center; gap:10px;">

          <button class="btn-clay" onclick={onDemoClick}>
            Get Early Access
          </button>
        </div>
      {/if}

      <!-- Mobile hamburger -->
      <button
        class="md:hidden"
        style="padding:8px; border:none; background:transparent; cursor:pointer; border-radius:8px;"
        onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg width="22" height="22" fill="none" stroke="#555555" stroke-width="2" viewBox="0 0 24 24">
          {#if mobileMenuOpen}
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          {/if}
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    {#if mobileMenuOpen && !$isAuthenticated}
      <div
        class="md:hidden animate-slide-down"
        style="padding:16px 0 24px; border-top:1px solid #e0e0e0;"
      >
        <nav style="display:flex; flex-direction:column; gap:4px; margin-bottom:16px;">
          {#each landingNavItems as item}
            <a
              href={item.href}
              onclick={(e) => {
                if (item.href.startsWith("#")) handleSmoothScroll(e, item.href);
                else { mobileMenuOpen = false; handleNavClick(e, item.href); }
              }}
              style="padding:10px 12px; font-family:'Montserrat',sans-serif; font-size:0.9rem; font-weight:500; color:#555555; text-decoration:none; border-radius:8px; transition:background 0.2s;"
              onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background='#f8f8f6'}
              onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background='transparent'}
            >{item.label}</a>
          {/each}
        </nav>
        <div style="display:flex; flex-direction:column; gap:10px;">

          <button class="btn-clay" onclick={onDemoClick} style="width:100%;">Get Early Access</button>
        </div>
      </div>
    {/if}
  </div>
</header>
