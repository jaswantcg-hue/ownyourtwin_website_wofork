<!--
  User Stories Component
  Testimonials and success stories from users
-->
<script lang="ts">
  import { userStories } from '$lib/data';
  import { formatCurrency } from '$lib/utils';
  import Card from '../common/Card.svelte';
  import Avatar from '../common/Avatar.svelte';
</script>

<section class="py-24 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-gradient-to-b from-void-950 via-void-900 to-void-950" />

  <!-- Decorative orbs -->
  <div class="absolute top-1/4 right-0 w-96 h-96 bg-cosmic-600/5 rounded-full blur-[120px]" />
  <div class="absolute bottom-1/4 left-0 w-96 h-96 bg-ethereal-600/5 rounded-full blur-[120px]" />

  <div class="container mx-auto px-4 relative z-10">
    <!-- Section header -->
    <div class="text-center mb-16 animate-fade-in">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        Stories of Transformation
      </h2>
      <p class="text-lg text-void-300 max-w-2xl mx-auto">
        Discover how our users are gaining insights and earning through their digital twins
      </p>
    </div>

    <!-- Testimonials grid -->
    <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {#each userStories as story, index}
        <div
          class="animate-fade-in"
          style="animation-delay: {index * 100}ms"
        >
          <Card variant="glass" padding="lg" hoverable>
            <!-- Quote -->
            <div class="relative mb-6">
              <!-- Quote icon -->
              <svg class="absolute -top-2 -left-2 w-8 h-8 text-cosmic-500/30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p class="text-void-200 leading-relaxed pl-6 italic">
                "{story.quote}"
              </p>
            </div>

            <!-- User info -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <Avatar
                  name={story.name}
                  size="md"
                  ring
                />
                <div>
                  <div class="font-medium text-white">{story.name}</div>
                  <div class="text-sm text-void-400">{story.role}</div>
                </div>
              </div>

              <!-- Earnings badge -->
              <div class="flex flex-col items-end">
                <div class="text-sm text-void-400">Earned</div>
                <div class="text-lg font-semibold text-emerald-400">
                  {formatCurrency(story.earnings)}
                </div>
              </div>
            </div>

            <!-- Rating -->
            <div class="mt-4 pt-4 border-t border-void-700/50 flex items-center gap-1">
              {#each Array(5) as _, i}
                <svg
                  class="w-4 h-4 {i < story.rating ? 'text-aura-400' : 'text-void-600'}"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              {/each}
            </div>
          </Card>
        </div>
      {/each}
    </div>

    <!-- CTA -->
    <div class="mt-16 text-center animate-fade-in" style="animation-delay: 400ms">
      <a
        href="/create-twin"
        class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cosmic-600 to-cosmic-500 hover:from-cosmic-500 hover:to-cosmic-400 text-white font-medium rounded-xl transition-all duration-300 shadow-glow-sm hover:shadow-glow hover:-translate-y-1"
      >
        Start Your Story
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  </div>
</section>
