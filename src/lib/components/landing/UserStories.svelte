<!--
  User Stories / Testimonials Component
  Reframed testimonials focusing on trust, data safety, and earning
-->
<script lang="ts">
  interface Props {
    /** Handler for opening demo request modal */
    onDemoClick?: () => void;
  }

  let { onDemoClick }: Props = $props();

  const testimonials = [
    {
      quote:
        "I finally feel like my data is working for me, not against me. The privacy controls are incredible — I choose exactly what gets shared.",
      name: "Sarah M.",
      role: "Early Adopter",
      avatar: "👩‍💻",
      highlight: "Privacy controls",
    },
    {
      quote:
        "What impressed me most was the transparency. I see every request, every earning, every byte of data my Twin shares. No surprises.",
      name: "David R.",
      role: "Beta Tester",
      avatar: "👨‍🔬",
      highlight: "Full transparency",
    },
    {
      quote:
        "As a business, the quality of insights from Digital Twins is miles ahead of traditional surveys. The data is genuine because users are actually engaged.",
      name: "Priya K.",
      role: "Product Manager",
      avatar: "👩‍💼",
      highlight: "Better insights",
    },
  ];
</script>

<section class="py-24 relative overflow-hidden">
  <!-- Background -->
  <div
    class="absolute inset-0 bg-gradient-to-b from-void-950 via-void-900 to-void-950"
  ></div>
  <div
    class="absolute top-1/2 left-0 w-96 h-96 bg-cosmic-600/5 rounded-full blur-[120px]"
  ></div>

  <div class="container mx-auto px-4 relative z-10">
    <!-- Section header -->
    <div class="text-center mb-16 animate-fade-in">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        What People Are Saying
      </h2>
      <p class="text-lg text-void-300 max-w-2xl mx-auto">
        Hear from those who have experienced the power of owning their digital
        identity.
      </p>
    </div>

    <!-- Testimonials grid -->
    <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
      {#each testimonials as testimonial, index}
        <div
          class="p-6 rounded-2xl bg-void-800/40 border border-void-700/50 hover:border-cosmic-500/20 transition-all duration-300 animate-fade-in"
          style="animation-delay: {index * 100}ms"
        >
          <!-- Quote icon -->
          <svg
            class="w-8 h-8 text-cosmic-500/30 mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
            />
          </svg>

          <p class="text-void-200 leading-relaxed mb-6 text-sm">
            "{testimonial.quote}"
          </p>

          <!-- Highlight badge -->
          <div
            class="inline-flex items-center px-2.5 py-1 rounded-full bg-cosmic-500/10 text-xs font-medium text-cosmic-300 mb-4"
          >
            {testimonial.highlight}
          </div>

          <!-- User info -->
          <div class="flex items-center gap-3 pt-4 border-t border-void-700/50">
            <div
              class="w-10 h-10 rounded-full bg-void-700 flex items-center justify-center text-xl"
            >
              {testimonial.avatar}
            </div>
            <div>
              <div class="text-sm font-medium text-white">
                {testimonial.name}
              </div>
              <div class="text-xs text-void-400">{testimonial.role}</div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- CTA below testimonials -->
    <div class="text-center animate-fade-in" style="animation-delay: 300ms">
      <button
        onclick={onDemoClick}
        class="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5"
      >
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
        Request a Demo
      </button>
    </div>
  </div>
</section>
