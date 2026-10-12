<script lang="ts">
  import { base } from "$app/paths";
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

<main class="pt-32 pb-24 min-h-screen relative overflow-hidden bg-white text-stone-900">
  <!-- Dynamic Background (reusing the app theme) -->

  <article class="relative z-10 container mx-auto px-4 max-w-5xl">
    <!-- Back Link -->
    <a
      href={`${base}/#blog`}
      class="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 group"
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
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 mb-6"
      >
        <span class="text-sm text-stone-600 font-medium"
          >{data.category || "Blog"}</span
        >
      </div>
      <h1
        class="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-950 mb-6 leading-tight"
      >
        {data.title}
      </h1>
      <div class="flex items-center justify-center gap-4 text-stone-500 text-sm">
        <span>{data.readTime || "5 min read"}</span>
        <span>•</span>
        <span>{data.date || "February 24, 2025"}</span>
      </div>
    </header>

    <!-- Article Content -->
    <div
      class="prose prose-stone prose-xl max-w-none prose-p:text-stone-700 prose-headings:text-stone-950 prose-a:text-stone-900 hover:prose-a:text-black"
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
  /* Article prose — light monochrome theme matching app.css */

  :global(.prose h1) {
    font-family: "Montserrat", system-ui, sans-serif;
    font-weight: 800;
    margin-top: 4rem;
    margin-bottom: 1.5rem;
    font-size: 2.25rem;
    letter-spacing: -0.02em;
    color: #111111;
    line-height: 1.2;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #e0e0e0;
  }

  :global(.prose h2) {
    font-family: "Montserrat", system-ui, sans-serif;
    font-weight: 700;
    margin-top: 3rem;
    margin-bottom: 1.25rem;
    font-size: 1.6rem;
    letter-spacing: -0.02em;
    color: #1a1a1a;
  }

  :global(.prose h3) {
    font-family: "Montserrat", system-ui, sans-serif;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    color: #1a1a1a;
  }

  :global(.prose p) {
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: #555555;
  }

  :global(.prose strong) {
    font-weight: 700;
    color: #1a1a1a;
  }

  :global(.prose em) {
    font-style: italic;
    color: #555555;
  }

  :global(.prose ul),
  :global(.prose ol) {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    padding-left: 1.75rem;
  }

  :global(.prose ul) {
    list-style-type: disc;
  }

  :global(.prose ol) {
    list-style-type: decimal;
  }

  :global(.prose li) {
    color: #555555;
    margin-bottom: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.7;
  }

  :global(.prose li strong) {
    color: #1a1a1a;
  }

  :global(.prose a) {
    color: #c4856a;
    text-decoration: none;
    border-bottom: 1px solid rgba(196, 133, 106, 0.4);
    transition: border-color 0.2s, color 0.2s;
  }

  :global(.prose a:hover) {
    color: #b07258;
    border-color: #b07258;
  }

  :global(.prose blockquote) {
    border-left: 3px solid #c4856a;
    background: #f5ece7;
    padding: 1.25rem 1.5rem;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: #555555;
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 2rem 0;
  }

  :global(.prose hr) {
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 3rem 0;
  }

  :global(.prose code) {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.875rem;
    background: #f5f5f5;
    color: #1a1a1a;
    padding: 0.15em 0.4em;
    border-radius: 4px;
  }

  :global(.prose pre) {
    background: #1a1a1a;
    color: #f8f8f6;
    padding: 1.5rem;
    border-radius: 12px;
    overflow-x: auto;
    margin: 2rem 0;
  }

  :global(.prose pre code) {
    background: none;
    color: inherit;
    padding: 0;
    font-size: 0.9rem;
  }
</style>
