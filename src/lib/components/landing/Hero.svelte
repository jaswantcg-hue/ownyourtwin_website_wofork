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

  <div class="container mx-auto px-4 py-20 relative z-10">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <!-- Text content -->
      <div class="text-center lg:text-left animate-fade-in">
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
          class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        >
          <span class="text-white">Your Data.</span>
          <br />
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
          class="text-lg md:text-xl text-void-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
        >
          Every day, your data powers billion-dollar decisions, yet you see none
          none of the value. We're changing that. Create an AI-powered Digital
          Twin that <strong class="text-white">you own</strong>,
          <strong class="text-white">you control</strong>, and that
          <strong class="text-white">earns for you</strong>.
        </p>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <Button variant="primary" size="lg" onclick={onDemoClick}>
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
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            {/snippet}
            Request a Demo
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
          class="mt-12 flex items-center gap-6 justify-center lg:justify-start flex-wrap"
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

      <!-- Digital Twin Visualization -->
      <div
        class="relative h-[600px] lg:h-[700px] w-full animate-fade-in"
        style="animation-delay: 0.3s;"
      >
        <!-- Digital Twin with embedded HUD -->
        <DigitalTwin class="relative z-10 w-full h-full" />
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
