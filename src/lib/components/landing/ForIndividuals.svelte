<!--
  For Individuals Section
  Value proposition for end users — data sovereignty and passive income
-->
<script lang="ts">
  const benefits = [
    {
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
      title: "Chat in Your Comfort Zone",
      description:
        "Connect through WhatsApp, Telegram, or our platform. No new apps to learn — your Twin meets you where you already are.",
      accent: "cosmic",
    },
    {
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      title: "Your 24/7 AI Companion",
      description:
        "Your Twin learns your values, preferences, and patterns. It helps with journaling, reflection, and even cognitive reframing — like a wise friend who truly understands you.",
      accent: "ethereal",
    },
    {
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Earn Passively",
      description:
        "When businesses want insights, your Twin responds on your behalf. You approve what gets shared, and you earn credits transferable to your bank account.",
      accent: "aura",
    },
  ];

  const accentColors: Record<string, string> = {
    cosmic: "from-cosmic-500 to-cosmic-600",
    ethereal: "from-ethereal-500 to-ethereal-600",
    aura: "from-aura-500 to-aura-600",
  };

  const accentBorders: Record<string, string> = {
    cosmic: "hover:border-cosmic-500/30",
    ethereal: "hover:border-ethereal-500/30",
    aura: "hover:border-aura-500/30",
  };
</script>

<section id="for-individuals" class="py-24 relative overflow-hidden">
  <!-- Background -->
  <div
    class="absolute inset-0 bg-gradient-to-b from-void-950 via-void-900 to-void-950"
  ></div>

  <!-- Decorative orbs -->
  <div
    class="absolute top-1/4 left-0 w-96 h-96 bg-cosmic-600/5 rounded-full blur-[120px]"
  ></div>
  <div
    class="absolute bottom-1/4 right-0 w-96 h-96 bg-ethereal-600/5 rounded-full blur-[120px]"
  ></div>

  <div class="container mx-auto px-4 relative z-10">
    <!-- Section header -->
    <div class="text-center mb-16 animate-fade-in">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-500/10 border border-cosmic-500/30 mb-6"
      >
        <svg
          class="w-4 h-4 text-cosmic-400"
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
        <span class="text-sm text-cosmic-300 font-medium">For Individuals</span>
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        Your Digital Companion
      </h2>
      <p class="text-lg text-void-300 max-w-2xl mx-auto">
        Connect once, benefit forever. Your Twin works for you around the clock
        — no effort required after setup.
      </p>
    </div>

    <!-- Benefits cards -->
    <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {#each benefits as benefit, index}
        <div
          class="group relative p-8 rounded-2xl bg-void-800/40 border border-void-700/50 {accentBorders[
            benefit.accent
          ]} transition-all duration-300 hover:-translate-y-2 animate-fade-in"
          style="animation-delay: {index * 150}ms"
        >
          <!-- Step number indicator -->
          <div
            class="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br {accentColors[
              benefit.accent
            ]} flex items-center justify-center text-white text-xs font-bold shadow-lg"
          >
            {index + 1}
          </div>

          <!-- Icon -->
          <div
            class="w-14 h-14 rounded-2xl bg-gradient-to-br {accentColors[
              benefit.accent
            ]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
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

    <!-- Reassurance message -->
    <div
      class="mt-12 text-center animate-fade-in"
      style="animation-delay: 450ms"
    >
      <div
        class="inline-flex items-center gap-3 px-6 py-3 bg-void-800/50 backdrop-blur-sm rounded-full border border-void-700"
      >
        <svg
          class="w-5 h-5 text-ethereal-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span class="text-void-300 text-sm">
          You <strong class="text-white">always approve</strong> what your Twin shares.
          Nothing happens without your consent.
        </span>
      </div>
    </div>
  </div>
</section>
