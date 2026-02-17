<!--
  How It Works Component
  Displays the three-step process: Connect, Twin Evolves, Earn
-->
<script lang="ts">
  import { HOW_IT_WORKS } from "$lib/constants";

  // Icons for each step
  const iconPaths: Record<string, string> = {
    "message-circle":
      "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    users:
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    coins:
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  };
</script>

<section id="how-it-works" class="py-16 md:py-24 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-void-950"></div>
  <div
    class="absolute inset-0 bg-gradient-to-b from-void-900/50 to-transparent"
  ></div>

  <!-- Decorative elements -->
  <div
    class="absolute top-0 left-1/4 w-72 h-72 bg-cosmic-600/8 rounded-full blur-[100px]"
  ></div>
  <div
    class="absolute bottom-0 right-1/4 w-72 h-72 bg-ethereal-600/8 rounded-full blur-[100px]"
  ></div>

  <div class="container mx-auto px-4 relative z-10">
    <!-- Section header -->
    <div class="text-center mb-12 md:mb-16 animate-fade-in">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
        How It Works
      </h2>
      <p class="text-base sm:text-lg text-void-300 max-w-2xl mx-auto">
        Three simple steps to create your Digital Twin and start owning the
        value of your data.
      </p>
    </div>

    <!-- Steps -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
      {#each HOW_IT_WORKS as step, index}
        <div
          class="relative group animate-fade-in"
          style="animation-delay: {index * 150}ms"
        >
          <!-- Connection line (between cards) -->
          {#if index < HOW_IT_WORKS.length - 1}
            <div
              class="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-void-600 to-transparent z-0"
            ></div>
          {/if}

          <!-- Card -->
          <div
            class="relative bg-void-800/50 backdrop-blur-sm rounded-2xl p-8 border border-void-700 hover:border-cosmic-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow"
          >
            <!-- Step number -->
            <div
              class="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-br {step.color} flex items-center justify-center text-white font-bold text-sm shadow-lg"
            >
              {index + 1}
            </div>

            <!-- Icon -->
            <div
              class="w-16 h-16 rounded-2xl bg-gradient-to-br {step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d={iconPaths[step.icon]}
                />
              </svg>
            </div>

            <!-- Content -->
            <h3 class="text-xl font-semibold text-white mb-3">
              {step.title}
            </h3>
            <p class="text-void-300 leading-relaxed">
              {step.description}
            </p>

            <!-- Hover accent -->
            <div
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r {step.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
