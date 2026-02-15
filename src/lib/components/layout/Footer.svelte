<!--
  Footer Component
  Updated with data sovereignty branding, trust statement, and Demo CTA
-->
<script lang="ts">
  import { APP_CONFIG } from "$lib/constants";

  interface Props {
    /** Handler for opening demo request modal */
    onDemoClick?: () => void;
  }

  let { onDemoClick }: Props = $props();

  const currentYear = new Date().getFullYear();

  // Footer navigation
  const footerLinks = {
    product: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "For Individuals", href: "#for-individuals" },
      { label: "For Businesses", href: "#for-business" },
      { label: "Insights", href: "#insights" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#insights" },
      { label: "Contact", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Data Rights", href: "#" },
    ],
  };

  // Social links
  const socials = [
    {
      label: "LinkedIn",
      href: "#",
      icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z",
    },
    {
      label: "Twitter/X",
      href: "#",
      icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    {
      label: "GitHub",
      href: "#",
      icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
    },
  ];

  function handleSmoothScroll(e: Event, href: string) {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
</script>

<footer class="relative bg-void-950 border-t border-void-800">
  <!-- Top CTA strip -->
  <div class="border-b border-void-800">
    <div class="container mx-auto px-4 py-12">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 class="text-xl font-bold text-white mb-1">
            Ready to take control of your data?
          </h3>
          <p class="text-void-400">
            See how Digital Twins can work for you — request a live demo.
          </p>
        </div>
        <button
          onclick={onDemoClick}
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow whitespace-nowrap"
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
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          Request a Demo
        </button>
      </div>
    </div>
  </div>

  <!-- Main footer content -->
  <div class="container mx-auto px-4 py-12">
    <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
      <!-- Brand column -->
      <div class="col-span-2">
        <div class="flex items-center gap-2 mb-4">
          <div
            class="w-8 h-8 rounded-lg bg-gradient-to-br from-cosmic-500 to-cosmic-600 flex items-center justify-center"
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
          <span class="text-lg font-bold text-white">
            Aura<span class="text-cosmic-400">AI</span>
          </span>
        </div>
        <p class="text-void-400 text-sm mb-4 max-w-xs leading-relaxed">
          {APP_CONFIG.tagline} Create an AI-powered Digital Twin that gives you control
          of your data and earns you value.
        </p>
        <!-- Trust statement -->
        <div class="flex items-center gap-2 text-xs text-void-500 mb-6">
          <svg
            class="w-3.5 h-3.5 text-ethereal-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>Your data is never sold. Ever.</span>
        </div>
        <!-- Social links -->
        <div class="flex gap-3">
          {#each socials as social}
            <a
              href={social.href}
              class="w-9 h-9 rounded-lg bg-void-800 hover:bg-void-700 flex items-center justify-center text-void-400 hover:text-white transition-all duration-200"
              aria-label={social.label}
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.icon} />
              </svg>
            </a>
          {/each}
        </div>
      </div>

      <!-- Product links -->
      <div>
        <h4
          class="text-sm font-semibold text-white mb-4 uppercase tracking-wider"
        >
          Product
        </h4>
        <ul class="space-y-2">
          {#each footerLinks.product as link}
            <li>
              <a
                href={link.href}
                onclick={(e) => handleSmoothScroll(e, link.href)}
                class="text-sm text-void-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Company links -->
      <div>
        <h4
          class="text-sm font-semibold text-white mb-4 uppercase tracking-wider"
        >
          Company
        </h4>
        <ul class="space-y-2">
          {#each footerLinks.company as link}
            <li>
              <a
                href={link.href}
                onclick={(e) => handleSmoothScroll(e, link.href)}
                class="text-sm text-void-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Legal links -->
      <div>
        <h4
          class="text-sm font-semibold text-white mb-4 uppercase tracking-wider"
        >
          Legal
        </h4>
        <ul class="space-y-2">
          {#each footerLinks.legal as link}
            <li>
              <a
                href={link.href}
                class="text-sm text-void-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <!-- Bottom bar -->
  <div class="border-t border-void-800">
    <div
      class="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <p class="text-xs text-void-500">
        © {currentYear}
        {APP_CONFIG.name}. All rights reserved. Your data is encrypted,
        protected, and always yours.
      </p>
      <p class="text-xs text-void-500">
        <a href="#" class="hover:text-white transition-colors">Privacy</a> ·
        <a href="#" class="hover:text-white transition-colors">Terms</a> ·
        <a href="#" class="hover:text-white transition-colors">Cookies</a>
      </p>
    </div>
  </div>
</footer>
