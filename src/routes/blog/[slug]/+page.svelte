<script lang="ts">
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import WaitlistModal from "$lib/components/landing/WaitlistModal.svelte";
  import { onMount } from "svelte";

  interface Props {
    data: import("./$types").PageData;
  }

  let { data }: Props = $props();

  // Demo modal state (needed for Header/Footer compatibility)
  let showDemoModal = $state(false);

  function openDemoModal() {
    showDemoModal = true;
  }
</script>

<svelte:head>
  <title>{data.title} | OwnYourTwin Blog</title>
  <meta name="description" content={data.title} />
</svelte:head>

<Header onDemoClick={openDemoModal} />

<main class="pt-32 pb-24 min-h-screen relative overflow-hidden">
  <!-- Dynamic Background (reusing the app theme) -->

  <article class="relative z-10 container mx-auto px-4 max-w-5xl">
    <!-- Back Link -->
    <a
      href="/#blog"
      class="inline-flex items-center gap-2 text-void-400 hover:text-white transition-colors mb-8 group"
    >
      <svg
        class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back to Articles
    </a>

    <!-- Article Header -->
    <header class="mb-10 text-center max-w-4xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-500/10 border border-cosmic-500/20 mb-6"
      >
        <span class="text-sm text-cosmic-400 font-medium"
          >{data.category || "Blog"}</span
        >
      </div>
      <h1
        class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
      >
        {data.title}
      </h1>
      <div class="flex items-center justify-center gap-4 text-void-400 text-sm">
        <span>{data.readTime || "5 min read"}</span>
        <span>•</span>
        <span>{data.date || "February 24, 2025"}</span>
      </div>
    </header>

    <!-- Article Content -->
    <div
      class="prose prose-invert prose-xl max-w-none prose-p:text-void-200 prose-headings:text-white prose-a:text-cosmic-400 hover:prose-a:text-cosmic-300"
    >
      {@html data.content}
    </div>

    <!-- CTA Box -->
    <!-- <div
      class="mt-12 p-8 rounded-2xl bg-gradient-to-br from-cosmic-900/50 to-void-900/50 border border-cosmic-500/20 text-center max-w-3xl mx-auto"
    >
      <h3 class="text-2xl font-bold text-white mb-4">
        Ready to see the future of insights?
      </h3>
      <p class="text-void-300 mb-8 max-w-lg mx-auto text-lg">
        Stop relying on outdated surveys. Start getting truthful, behavioral
        intelligence with OwnYourTwin.
      </p>
      <button
        class="px-8 py-3 bg-cosmic-600 hover:bg-cosmic-500 text-white rounded-full font-medium transition-all shadow-glow hover:shadow-glow-lg text-lg"
        onclick={openDemoModal}
      >
        Sign Up for Early Access
      </button>
    </div> -->
  </article>
</main>

<Footer onDemoClick={openDemoModal} />

<WaitlistModal bind:open={showDemoModal} />

<style>
  /* Custom prose styling for premium feel */
  :global(.prose h1) {
    font-family: var(--font-display);
    font-weight: 800;
    margin-top: 4.5rem;
    margin-bottom: 2.5rem;
    font-size: 2.75rem;
    letter-spacing: -0.02em;
    color: white;
    line-height: 1.2;
  }

  :global(.prose h2) {
    font-family: var(--font-display);
    font-weight: 700;
    margin-top: 3.5rem;
    margin-bottom: 2rem;
    font-size: 2rem;
    letter-spacing: -0.01em;
    color: var(--color-void-100);
  }

  :global(.prose h3) {
    color: var(--color-void-100);
    font-family: var(--font-display);
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  :global(.prose p) {
    font-size: 1.25rem; /* 20px - matches text-xl */
    line-height: 1.7;
    margin-bottom: 1.5rem;
    color: var(--color-void-300);
  }

  :global(.prose strong) {
    color: white;
    font-weight: 600;
  }

  :global(.prose ul) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  :global(.prose li) {
    color: var(--color-void-300);
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
    line-height: 1.6;
  }

  :global(.prose a) {
    text-decoration: none;
    border-bottom: 1px solid var(--color-cosmic-500);
    transition: all 0.2s;
  }

  :global(.prose a:hover) {
    border-color: transparent;
  }

  :global(.prose blockquote) {
    border-left-color: var(--color-cosmic-500);
    background: rgba(99, 102, 241, 0.1);
    padding: 1.5rem;
    border-radius: 0 0.5rem 0.5rem 0;
    font-style: italic;
    color: var(--color-void-100);
    font-size: 1.35rem;
    line-height: 1.5;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  :global(.prose hr) {
    border-color: var(--color-void-800);
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
</style>
