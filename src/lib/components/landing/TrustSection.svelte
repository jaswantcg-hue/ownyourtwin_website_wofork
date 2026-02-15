<!--
  Trust Section
  Showcases the 5 core data privacy and security pillars
-->
<script lang="ts">
  const trustPillars = [
    {
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
      title: "Privacy by Design",
      description:
        "Your data is encrypted at rest and in transit. We never access your raw data. Only your Twin does.",
      color: "from-cosmic-500 to-cosmic-600",
    },
    {
      icon: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
      title: "You Own Your Data",
      description:
        "Your Digital Twin belongs to you, not us, not advertisers. You hold the keys to your digital self.",
      color: "from-ethereal-500 to-ethereal-600",
    },
    {
      icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
      title: "Granular Control",
      description:
        "Choose exactly what your Twin shares. Toggle permissions per category, per request, per business.",
      color: "from-neural-500 to-neural-600",
    },
    {
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Fair Monetization",
      description:
        "When your Twin provides value to a business, you earn directly. Transparent, fair, and instant.",
      color: "from-aura-500 to-aura-600",
    },
    {
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "Enterprise-Grade Security",
      description:
        "SOC 2 compliant infrastructure with end-to-end encryption. Your digital identity is fortified.",
      color: "from-cosmic-600 to-ethereal-600",
    },
  ];
</script>

<section id="trust" class="py-24 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-void-950"></div>
  <div
    class="absolute inset-0 bg-gradient-to-b from-void-900/30 to-transparent"
  ></div>

  <!-- Decorative elements -->
  <div
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ethereal-600/5 rounded-full blur-[150px]"
  ></div>

  <div class="container mx-auto px-4 relative z-10">
    <!-- Section header -->
    <div class="text-center mb-16 animate-fade-in">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ethereal-500/10 border border-ethereal-500/30 mb-6"
      >
        <svg
          class="w-4 h-4 text-ethereal-400"
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
        <span class="text-sm text-ethereal-300 font-medium"
          >Your Data is Safe With Us</span
        >
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        Built on Trust, Not on Your Data
      </h2>
      <p class="text-lg text-void-300 max-w-2xl mx-auto">
        We don't sell your data. We don't scrape your profiles. We built an
        architecture where
        <strong class="text-white">you are always in control</strong>.
      </p>
    </div>

    <!-- Trust pillars -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {#each trustPillars as pillar, index}
        <div
          class="group p-6 rounded-2xl bg-void-800/40 border border-void-700/50 hover:border-ethereal-500/30 transition-all duration-300 hover:-translate-y-1 animate-fade-in {index >=
          3
            ? 'sm:col-span-1 lg:col-start-auto'
            : ''}"
          style="animation-delay: {index * 100}ms"
        >
          <!-- Icon -->
          <div
            class="w-12 h-12 rounded-xl bg-gradient-to-br {pillar.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d={pillar.icon}
              />
            </svg>
          </div>

          <h3 class="text-lg font-semibold text-white mb-2">{pillar.title}</h3>
          <p class="text-void-400 text-sm leading-relaxed">
            {pillar.description}
          </p>
        </div>
      {/each}
    </div>

    <!-- Bottom trust statement -->
    <div
      class="mt-12 text-center animate-fade-in"
      style="animation-delay: 500ms"
    >
      <p class="text-void-400 text-sm max-w-lg mx-auto">
        We believe the future of data is <strong class="text-void-200"
          >user-first</strong
        >. Your Twin is your representative in the digital economy, and it works
        for <em>you</em>.
      </p>
    </div>
  </div>
</section>
