<!--
  Video Section
  Explainer video placeholder with compelling copy
-->

<section class="py-24 relative overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-void-950"></div>
  <div
    class="absolute inset-0 bg-gradient-to-b from-void-900/20 to-transparent"
  ></div>

  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Section header -->
      <div class="mb-12 animate-fade-in">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          See How Digital Twins Are
          <span
            class="bg-gradient-to-r from-cosmic-400 to-ethereal-400 bg-clip-text text-transparent"
            >Reshaping the Data Economy</span
          >
        </h2>
        <p class="text-lg text-void-300 max-w-2xl mx-auto">
          Watch how your Digital Twin works, from connecting your data to
          earning from your insights.
        </p>
      </div>

      <!-- Video Section -->
      <div
        class="relative aspect-video bg-void-800/50 rounded-2xl border border-void-700/50 overflow-hidden group cursor-pointer animate-fade-in"
        style="animation-delay: 200ms"
      >
        <video
          id="explainer-video"
          autoplay
          loop
          muted
          playsinline
          preload="auto"
          class="w-full h-full object-cover"
          poster="/video-poster.jpg"
          controls
        >
          <source src="/OwnYourTwin.mp4" type="video/mp4" />
          <track kind="captions" />
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Caption -->
      <p
        class="mt-6 text-sm text-void-500 animate-fade-in"
        style="animation-delay: 300ms"
      >
        Watch our vision for the Digital Twin economy.
      </p>
    </div>
  </div>
</section>
