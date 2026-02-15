<!--
  Blog Preview / Insights & Resources Section
  4 article preview cards for the blog
-->
<script lang="ts">
  const articles = [
    {
      id: "death-of-survey",
      title: "The Death of the Survey",
      excerpt:
        "Why traditional market research fails, and how AI-driven behavioral twins provide a more truthful representation of what consumers actually want.",
      category: "Market Research",
      readTime: "6 min read",
      gradient: "from-red-500/10 to-red-600/5",
      borderColor: "border-red-500/15 hover:border-red-500/30",
      categoryColor: "text-red-400 bg-red-500/10",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    },
    {
      id: "data-sovereignty",
      title: "The Data Sovereignty Manifesto",
      excerpt:
        "A deep dive into data ownership, privacy laws, and the seismic shift toward a user-centric data economy where individuals hold the keys.",
      category: "Data Rights",
      readTime: "8 min read",
      gradient: "from-cosmic-500/10 to-cosmic-600/5",
      borderColor: "border-cosmic-500/15 hover:border-cosmic-500/30",
      categoryColor: "text-cosmic-400 bg-cosmic-500/10",
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    },
    {
      id: "ai-behavioral-modeling",
      title: "AI & Behavioral Modeling",
      excerpt:
        "How machine learning understands human motivation, from shopping patterns to cognitive reframing, and delivers personalized well-being services.",
      category: "AI Science",
      readTime: "7 min read",
      gradient: "from-ethereal-500/10 to-ethereal-600/5",
      borderColor: "border-ethereal-500/15 hover:border-ethereal-500/30",
      categoryColor: "text-ethereal-400 bg-ethereal-500/10",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    },
    {
      id: "future-twin-economy",
      title: "The Future of the Twin Economy",
      excerpt:
        "Predicting a world where digital twins handle our administrative, commercial, and social interactions, and what it means for you.",
      category: "Future",
      readTime: "5 min read",
      gradient: "from-aura-500/10 to-aura-600/5",
      borderColor: "border-aura-500/15 hover:border-aura-500/30",
      categoryColor: "text-aura-400 bg-aura-500/10",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
    },
  ];
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
      {#each articles as article, index}
        <div
          class="group p-6 rounded-2xl bg-gradient-to-br {article.gradient} border {article.borderColor} transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in"
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
            <span>Coming Soon</span>
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
        </div>
      {/each}
    </div>
  </div>
</section>
