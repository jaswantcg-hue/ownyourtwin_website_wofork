<!--
  Hero Component
  Landing page hero section with headline, CTAs, and 3D brain animation
-->
<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '../common/Button.svelte';
  import BrainAnimation from './BrainAnimation.svelte';

  interface Props {
    /** Handler for opening waitlist modal */
    onWaitlistClick?: () => void;
  }

  let { onWaitlistClick }: Props = $props();

  // Navigation handlers
  function handleLogin() {
    goto('/login');
  }

  function handleCreateTwin() {
    goto('/create-twin');
  }
</script>

<section class="relative min-h-screen flex items-center overflow-hidden">
  <!-- Background gradient -->
  <div class="absolute inset-0 bg-gradient-neural" />

  <!-- Animated background particles -->
  <div class="absolute inset-0 opacity-30">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-600/20 rounded-full blur-[100px] animate-pulse-slow" />
    <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ethereal-600/20 rounded-full blur-[100px] animate-pulse-slow" style="animation-delay: 1s;" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cosmic-500/10 rounded-full blur-[150px]" />
  </div>

  <div class="container mx-auto px-4 py-20 relative z-10">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <!-- Text content -->
      <div class="text-center lg:text-left animate-fade-in">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosmic-500/10 border border-cosmic-500/30 mb-8">
          <span class="w-2 h-2 rounded-full bg-cosmic-400 animate-pulse" />
          <span class="text-sm text-cosmic-300 font-medium">Your Digital Self, Evolved</span>
        </div>

        <!-- Headline -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          <span class="text-white">Understand Your Mind</span>
          <br />
          <span class="bg-gradient-to-r from-cosmic-400 via-ethereal-400 to-cosmic-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            via Digital Twin
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-lg md:text-xl text-void-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
          Create an AI-powered reflection of yourself. Journal your thoughts, discover patterns, gain insights, and earn by sharing your perspective with the world.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Button
            variant="primary"
            size="lg"
            onclick={handleCreateTwin}
          >
            {#snippet icon()}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            {/snippet}
            Create My Twin
          </Button>

          <Button
            variant="outline"
            size="lg"
            onclick={handleLogin}
          >
            {#snippet icon()}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            {/snippet}
            Login
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onclick={onWaitlistClick}
          >
            Join Waitlist
          </Button>
        </div>

        <!-- Social proof -->
        <div class="mt-12 flex items-center gap-8 justify-center lg:justify-start">
          <div class="text-center">
            <div class="text-2xl font-bold text-white">12,500+</div>
            <div class="text-sm text-void-400">Active Users</div>
          </div>
          <div class="w-px h-12 bg-void-700" />
          <div class="text-center">
            <div class="text-2xl font-bold text-white">1.2M+</div>
            <div class="text-sm text-void-400">Insights Generated</div>
          </div>
          <div class="w-px h-12 bg-void-700" />
          <div class="text-center">
            <div class="text-2xl font-bold text-white">$850K+</div>
            <div class="text-sm text-void-400">Earned by Users</div>
          </div>
        </div>
      </div>

      <!-- 3D Brain Animation -->
      <div class="relative h-[500px] lg:h-[600px] animate-fade-in" style="animation-delay: 0.3s;">
        <!-- Glow effect behind the brain -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-80 h-80 bg-cosmic-500/20 rounded-full blur-[80px] animate-pulse-slow" />
        </div>

        <!-- Brain animation -->
        <BrainAnimation class="relative z-10" />

        <!-- Floating badges around the brain -->
        <div class="absolute top-1/4 left-0 px-3 py-2 bg-void-800/80 backdrop-blur-sm rounded-lg border border-void-600 animate-float">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-emerald-400" />
            <span class="text-sm text-void-200">Reflecting</span>
          </div>
        </div>

        <div class="absolute top-1/2 right-0 px-3 py-2 bg-void-800/80 backdrop-blur-sm rounded-lg border border-void-600 animate-float" style="animation-delay: 1s;">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-cosmic-400" />
            <span class="text-sm text-void-200">Learning</span>
          </div>
        </div>

        <div class="absolute bottom-1/4 left-1/4 px-3 py-2 bg-void-800/80 backdrop-blur-sm rounded-lg border border-void-600 animate-float" style="animation-delay: 2s;">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-ethereal-400" />
            <span class="text-sm text-void-200">Evolving</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
      <span class="text-sm text-void-400">Scroll to explore</span>
      <svg class="w-6 h-6 text-void-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </div>
</section>

<style>
  @keyframes gradient {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  .animate-gradient {
    animation: gradient 6s ease infinite;
  }
</style>
