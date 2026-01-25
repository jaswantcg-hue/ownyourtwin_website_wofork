<!--
  Footer Component
  Site footer with links and branding
-->
<script lang="ts">
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'How it Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Data Policy', href: '/data-policy' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/auraai', icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
    { name: 'GitHub', href: 'https://github.com/auraai', icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/auraai', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
  ];
</script>

<footer class="bg-void-950 border-t border-void-800">
  <div class="container mx-auto px-4 py-16">
    <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
      <!-- Brand column -->
      <div class="lg:col-span-2">
        <a href="/" class="flex items-center gap-2 mb-4">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cosmic-500 to-cosmic-600 flex items-center justify-center">
            <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span class="text-xl font-bold text-white">
            Aura<span class="text-cosmic-400">AI</span>
          </span>
        </a>
        <p class="text-void-400 mb-6 max-w-sm">
          Your digital twin for self-understanding. Reflect, discover patterns, and earn by sharing your unique perspective.
        </p>
        <!-- Social links -->
        <div class="flex items-center gap-4">
          {#each socialLinks as social}
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-lg bg-void-800 flex items-center justify-center text-void-400 hover:text-white hover:bg-void-700 transition-colors"
              aria-label={social.name}
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d={social.icon} />
              </svg>
            </a>
          {/each}
        </div>
      </div>

      <!-- Product links -->
      <div>
        <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">
          Product
        </h3>
        <ul class="space-y-3">
          {#each footerLinks.product as link}
            <li>
              <a
                href={link.href}
                class="text-void-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Company links -->
      <div>
        <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">
          Company
        </h3>
        <ul class="space-y-3">
          {#each footerLinks.company as link}
            <li>
              <a
                href={link.href}
                class="text-void-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Legal links -->
      <div>
        <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">
          Legal
        </h3>
        <ul class="space-y-3">
          {#each footerLinks.legal as link}
            <li>
              <a
                href={link.href}
                class="text-void-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="mt-12 pt-8 border-t border-void-800 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-void-500 text-sm">
        &copy; {currentYear} AuraAI. All rights reserved.
      </p>
      <div class="flex items-center gap-6 text-sm text-void-500">
        <span class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500" />
          All systems operational
        </span>
      </div>
    </div>
  </div>
</footer>
