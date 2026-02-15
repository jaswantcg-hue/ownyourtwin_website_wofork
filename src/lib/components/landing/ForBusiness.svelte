<!--
  For Business Section
  Value proposition for businesses: ethical market intelligence
-->
<script lang="ts">
  const benefits = [
    {
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      title: "High-Fidelity Insights",
      description:
        'Access "Twin Responses" that reflect real human behavior without the cognitive bias of traditional surveys. Get the truth, not what people think you want to hear.',
    },
    {
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
      title: "Seamless Infrastructure",
      description:
        "Integrate via MCP Servers, REST APIs, or direct connections through Teams and Discord. Build on top of our intelligence layer effortlessly.",
    },
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Personalization at Scale",
      description:
        "Develop products based on actual consumer patterns rather than guesswork. Run 10,000 simulations in minutes, not months of user studies.",
    },
  ];
</script>

<section id="for-business" class="py-24 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-void-950"></div>
  <div
    class="absolute inset-0 bg-gradient-to-b from-void-900/30 to-transparent"
  ></div>

  <!-- Decorative elements -->
  <div
    class="absolute top-0 right-1/4 w-72 h-72 bg-ethereal-600/8 rounded-full blur-[100px]"
  ></div>
  <div
    class="absolute bottom-0 left-1/4 w-72 h-72 bg-cosmic-600/8 rounded-full blur-[100px]"
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <span class="text-sm text-ethereal-300 font-medium">For Businesses</span
        >
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        Real-Time Market Intelligence
      </h2>
      <p class="text-lg text-void-300 max-w-2xl mx-auto">
        Stop guessing what your customers want. Access ethical, consent-based
        consumer insights that are faster, cheaper, and more accurate than any
        survey.
      </p>
    </div>

    <!-- Benefits cards -->
    <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {#each benefits as benefit, index}
        <div
          class="group p-8 rounded-2xl bg-void-800/30 border border-ethereal-500/10 hover:border-ethereal-500/30 transition-all duration-300 hover:-translate-y-2 animate-fade-in"
          style="animation-delay: {index * 150}ms"
        >
          <!-- Icon -->
          <div
            class="w-14 h-14 rounded-2xl bg-gradient-to-br from-ethereal-500 to-ethereal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
          >
            <svg
              class="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d={benefit.icon}
              />
            </svg>
          </div>

          <h3 class="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
          <p class="text-void-300 leading-relaxed text-sm">
            {benefit.description}
          </p>
        </div>
      {/each}
    </div>

    <!-- Comparison strip -->
    <div
      class="mt-16 max-w-3xl mx-auto animate-fade-in"
      style="animation-delay: 450ms"
    >
      <div class="grid grid-cols-2 gap-4">
        <!-- Traditional -->
        <div class="p-6 rounded-2xl bg-void-800/30 border border-red-500/10">
          <h4
            class="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3"
          >
            Traditional Research
          </h4>
          <ul class="space-y-2">
            <li class="flex items-center gap-2 text-sm text-void-400">
              <svg
                class="w-4 h-4 text-red-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                /></svg
              >
              Weeks to collect data
            </li>
            <li class="flex items-center gap-2 text-sm text-void-400">
              <svg
                class="w-4 h-4 text-red-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                /></svg
              >
              Cognitive bias distorts results
            </li>
            <li class="flex items-center gap-2 text-sm text-void-400">
              <svg
                class="w-4 h-4 text-red-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                /></svg
              >
              $50K+ per study
            </li>
          </ul>
        </div>

        <!-- OwnYourTwin -->
        <div
          class="p-6 rounded-2xl bg-ethereal-500/5 border border-ethereal-500/20"
        >
          <h4
            class="text-sm font-semibold text-ethereal-400 uppercase tracking-wider mb-3"
          >
            With OwnYourTwin
          </h4>
          <ul class="space-y-2">
            <li class="flex items-center gap-2 text-sm text-void-300">
              <svg
                class="w-4 h-4 text-ethereal-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                /></svg
              >
              Results in minutes
            </li>
            <li class="flex items-center gap-2 text-sm text-void-300">
              <svg
                class="w-4 h-4 text-ethereal-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                /></svg
              >
              Behavioral truth, not stated intent
            </li>
            <li class="flex items-center gap-2 text-sm text-void-300">
              <svg
                class="w-4 h-4 text-ethereal-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                /></svg
              >
              10x more cost-effective
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
