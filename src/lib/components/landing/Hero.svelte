<!--
  Hero Component
  Landing page hero section with data sovereignty headline, CTAs, and Digital Twin visualization
-->
<script lang="ts">
  import Button from "../common/Button.svelte";
  import DigitalTwin from "./DigitalTwin.svelte";

  interface Props {
    /** Handler for opening demo request modal */
    onDemoClick?: () => void;
  }

  let { onDemoClick }: Props = $props();

  // Smooth scroll to How It Works section
  function scrollToHowItWorks() {
    const el = document.querySelector("#how-it-works");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  let interestShown = $state(false);
  let isLoading = $state(false);

  async function handleInterestClick() {
    isLoading = true;
    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "hero_show_interest" }),
      });
      if (response.ok) {
        interestShown = true;
      }
    } catch (error) {
      console.error("Failed to log interest:", error);
    } finally {
      isLoading = false;
    }
  }
</script>

<section class="relative min-h-screen flex items-center overflow-hidden">
  <!-- Background gradient -->
  <div class="absolute inset-0 bg-gradient-neural"></div>

  <!-- Ambient gradient orbs -->
  <div class="absolute inset-0 opacity-30">
    <div
      class="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-600/20 rounded-full blur-[100px] animate-pulse-slow"
    ></div>
    <div
      class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ethereal-600/15 rounded-full blur-[100px] animate-pulse-slow"
      style="animation-delay: 1s;"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cosmic-500/10 rounded-full blur-[150px]"
    ></div>
  </div>

  <div class="container mx-auto px-4 py-12 md:py-20 relative z-10">
    <div class="flex flex-col items-center gap-12 lg:gap-16">
      <!-- Digital Twin Visualization (Now first and zoomed) -->
      <div
        class="relative h-[400px] sm:h-[500px] md:h-[650px] lg:h-[850px] w-full animate-fade-in transform scale-105 lg:scale-110"
        style="animation-delay: 0.3s;"
      >
        <!-- Digital Twin with embedded HUD -->
        <DigitalTwin class="relative z-10 w-full h-full" />
      </div>

      <!-- Text content (Now second and centered) -->
      <div class="text-center animate-fade-in max-w-4xl mx-auto">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosmic-500/10 border border-cosmic-500/30 mb-8"
        >
          <span class="w-2 h-2 rounded-full bg-ethereal-400 animate-pulse"
          ></span>
          <span class="text-sm text-cosmic-300 font-medium"
            >The Future of Data Ownership</span
          >
        </div>

        <!-- Headline -->
        <h1
          class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-8 leading-tight"
        >
          <span class="text-white">Your Data.</span>
          <br class="sm:hidden" />
          <span class="text-white">Your Value.</span>
          <br />
          <span
            class="bg-gradient-to-r from-cosmic-400 via-ethereal-400 to-cosmic-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]"
          >
            Your Digital Twin.
          </span>
        </h1>

        <!-- Subtitle - trust-building copy -->
        <p
          class="text-base sm:text-lg md:text-xl text-void-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Every day, your data powers billion-dollar decisions, yet you see none
          none of the value. We're changing that. Create an AI-powered Digital
          Twin that <strong class="text-white">you own</strong>,
          <strong class="text-white">you control</strong>, and that
          <strong class="text-white">earns for you</strong>.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            onclick={handleInterestClick}
            disabled={interestShown || isLoading}
          >
            {#snippet icon()}
              {#if interestShown}
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              {:else if isLoading}
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              {:else}
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              {/if}
            {/snippet}
            {interestShown ? "Thanks for your interest!" : "Show Interest"}
          </Button>

          <Button variant="outline" size="lg" onclick={scrollToHowItWorks}>
            {#snippet icon()}
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
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            {/snippet}
            See How It Works
          </Button>
        </div>

        <!-- Trust signals -->
        <div
          class="mt-12 sm:mt-16 flex items-center gap-3 sm:gap-6 justify-center flex-wrap text-xs sm:text-sm"
        >
          <div class="flex items-center gap-2 text-sm text-void-400">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Privacy by Design</span>
          </div>
          <div class="w-px h-6 bg-void-700"></div>
          <div class="flex items-center gap-2 text-sm text-void-400">
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
            <span>GDPR Compliant</span>
          </div>
          <div class="w-px h-6 bg-void-700"></div>
          <div class="flex items-center gap-2 text-sm text-void-400">
            <svg
              class="w-4 h-4 text-aura-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>You Earn, We Don't Sell</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
    >
      <span class="text-sm text-void-400">Scroll to explore</span>
      <svg
        class="w-6 h-6 text-void-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  </div>
</section>

<style>
  @keyframes gradient {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .animate-gradient {
    animation: gradient 6s ease infinite;
  }
</style>
