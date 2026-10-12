<!--
  Blog Preview / Insights & Resources Section
  4 article preview cards for the blog
-->
<script lang="ts">
  import { base } from "$app/paths";
  import type { BlogPost } from "$lib/server/posts";

  interface Props {
    posts?: BlogPost[];
  }

  let { posts = [] }: Props = $props();
</script>

<section id="insights" class="py-24 relative overflow-hidden">
  <!-- Background -->
  <div
    class="absolute inset-0 bg-gradient-to-b from-void-950 via-void-900 to-void-950"
  ></div>

  <!-- Decorative orbs -->
  <div
    class="absolute top-1/4 right-0 w-96 h-96 bg-cosmic-600/5 rounded-full blur-[120px]"
  ></div>
  <div
    class="absolute bottom-1/4 left-0 w-96 h-96 bg-ethereal-600/5 rounded-full blur-[120px]"
  ></div>

  <div class="container mx-auto px-4 relative z-10">
    <!-- Section header -->
    <div class="text-center mb-16 animate-fade-in">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aura-500/10 border border-aura-500/30 mb-6"
      >
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <span class="text-sm text-aura-300 font-medium"
          >Insights & Resources</span
        >
      </div>
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        Explore the Digital Twin Economy
      </h2>
      <p class="text-lg text-void-300 max-w-2xl mx-auto">
        Deep dives into data sovereignty, AI behavioral science, and the future
        where your digital twin works for you.
      </p>
    </div>

    <!-- Article cards grid -->
    <div class="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {#each posts as article, index}
        <!-- Card Container - conditionally render as 'a' or 'div' -->
        <svelte:element
          this={article.link ? "a" : "div"}
          href={article.link ? `${base}${article.link}` : undefined}
          class="group p-6 rounded-2xl bg-gradient-to-br {article.gradient} border {article.borderColor} transition-all duration-300 hover:-translate-y-1 block {article.link
            ? 'cursor-pointer'
            : ''} animate-fade-in"
          style="animation-delay: {index * 100}ms"
        >
          <!-- Category badge -->
          <div class="flex items-center justify-between mb-4">
            <span
              class="text-xs font-semibold px-2.5 py-1 rounded-full {article.categoryColor}"
            >
              {article.category}
            </span>
            <span class="text-xs text-void-500">{article.readTime}</span>
          </div>

          <!-- Icon -->
          <div
            class="w-10 h-10 rounded-lg bg-void-800/60 flex items-center justify-center mb-4"
          >
            <svg
              class="w-5 h-5 text-void-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d={article.icon}
              />
            </svg>
          </div>

          <!-- Title -->
          <h3
            class="text-lg font-semibold text-white mb-2 group-hover:text-cosmic-300 transition-colors"
          >
            {article.title}
          </h3>

          <!-- Excerpt -->
          <p class="text-void-400 text-sm leading-relaxed mb-4">
            {article.excerpt}
          </p>

          <!-- Read more link -->
          <div
            class="flex items-center gap-1 text-sm font-medium text-void-400 group-hover:text-cosmic-400 transition-colors"
          >
            <span>{article.link ? "Read Article" : "Coming Soon"}</span>
            <svg
              class="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
          </div>
        </svelte:element>
      {/each}
    </div>
  </div>
</section>
