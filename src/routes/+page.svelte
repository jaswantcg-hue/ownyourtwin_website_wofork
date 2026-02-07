<script module lang="ts">
  // Feature data
  const features = [
    {
      title: "AI-Powered Journaling",
      description:
        "Chat with your digital twin for meaningful reflection and self-discovery through guided conversations.",
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
      gradient: "from-cosmic-500 to-cosmic-600",
    },
    {
      title: "Behavioral Insights",
      description:
        "Discover patterns in your emotions, decisions, and values through advanced AI analysis.",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
      gradient: "from-ethereal-500 to-ethereal-600",
    },
    {
      title: "Ethical Earnings",
      description:
        "Participate in research surveys and simulations with full transparency and fair compensation.",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      gradient: "from-aura-500 to-aura-600",
    },
    {
      title: "Focus Music",
      description:
        "Personalized audio tracks generated based on your cognitive patterns for better focus.",
      icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
      gradient: "from-neural-500 to-neural-600",
    },
    {
      title: "Cognitive Reframing",
      description:
        "Transform negative thought patterns into constructive perspectives with AI guidance.",
      icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
      gradient: "from-rose-500 to-rose-600",
    },
    {
      title: "Peer Matching",
      description:
        "Connect with like-minded individuals based on shared traits and interests.",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
      gradient: "from-violet-500 to-violet-600",
    },
  ];
</script>

<!--
  Landing Page
  Main entry point showcasing the digital twin platform
-->
<script lang="ts">
  import { Header, Footer } from "$lib/components/layout";
  import {
    Hero,
    HowItWorks,
    UserStories,
    WaitlistModal,
  } from "$lib/components/landing";

  // Waitlist modal state
  let showWaitlist = $state(false);

  function openWaitlist() {
    showWaitlist = true;
  }
</script>

<svelte:head>
  <title>AuraAI - Understand Your Mind via Digital Twin</title>
  <meta
    name="description"
    content="Create an AI-powered digital twin that reflects your behaviors, values, and patterns. Journal your thoughts, gain insights, and earn by sharing your perspective."
  />
</svelte:head>

<div class="min-h-screen bg-void-950">
  <!-- Header -->
  <Header transparent />

  <!-- Hero Section -->
  <Hero onWaitlistClick={openWaitlist} />

  <!-- How It Works Section -->
  <HowItWorks />

  <!-- User Stories Section -->
  <UserStories />

  <!-- Features Section -->
  <section class="py-24 relative overflow-hidden">
    <div class="absolute inset-0 bg-void-950"></div>
    <div
      class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-void-600 to-transparent"
    ></div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          More Than Just Journaling
        </h2>
        <p class="text-lg text-void-300 max-w-2xl mx-auto">
          Discover powerful features designed to help you understand yourself
          better
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <!-- Feature cards -->
        {#each features as feature, index}
          <div
            class="p-6 rounded-2xl bg-void-800/50 border border-void-700 hover:border-cosmic-500/50 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
            style="animation-delay: {index * 100}ms"
          >
            <div
              class="w-12 h-12 rounded-xl bg-gradient-to-br {feature.gradient} flex items-center justify-center mb-4"
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
                  d={feature.icon}
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p class="text-void-400 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-24 relative overflow-hidden">
    <div
      class="absolute inset-0 bg-gradient-to-b from-void-950 to-cosmic-950/20"
    ></div>
    <div class="absolute inset-0">
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cosmic-600/10 rounded-full blur-[150px]"
      ></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">
          Ready to Meet Your
          <span
            class="bg-gradient-to-r from-cosmic-400 to-ethereal-400 bg-clip-text text-transparent"
          >
            Digital Twin?
          </span>
        </h2>
        <p class="text-lg text-void-300 mb-8">
          Start your journey of self-discovery today. Create your digital twin
          in minutes and begin understanding yourself on a deeper level.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/create-twin"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 text-white font-medium rounded-xl transition-all duration-300 shadow-glow-sm hover:shadow-glow"
          >
            Create My Twin
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <button
            onclick={openWaitlist}
            class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-void-600 hover:border-cosmic-500 text-void-200 hover:text-white font-medium rounded-xl transition-all duration-300"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <Footer />
</div>

<!-- Waitlist Modal -->
<WaitlistModal bind:open={showWaitlist} />
