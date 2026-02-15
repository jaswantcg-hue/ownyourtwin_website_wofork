<!--
  AuraAI Landing Page
  Premium, trust-building landing page for Digital Twin concept validation
-->
<script lang="ts">
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import {
    Hero,
    HowItWorks,
    TrustSection,
    MarketResearch,
    ForIndividuals,
    ForBusiness,
    VideoSection,
    UserStories,
    BlogPreview,
    WaitlistModal,
  } from "$lib/components/landing";

  // Demo modal state
  let showDemoModal = $state(false);

  function openDemoModal() {
    showDemoModal = true;
  }
</script>

<svelte:head>
  <title>AuraAI — Own Your Data. Earn From It. | Digital Twin Platform</title>
  <meta
    name="description"
    content="Create an AI-powered Digital Twin that you own, you control, and that earns for you. Ethical consumer insights for businesses. Data sovereignty for individuals."
  />
</svelte:head>

<!-- Header with transparent mode for hero -->
<Header transparent={true} onDemoClick={openDemoModal} />

<!-- Main landing sections -->
<main>
  <!-- 1. Hero: Headline + DigitalTwin visualization -->
  <Hero onDemoClick={openDemoModal} />

  <!-- 2. How It Works: Connect → Twin Evolves → Earn -->
  <HowItWorks />

  <!-- 3. Trust Section: Data privacy pillars -->
  <TrustSection />

  <!-- 4. Market Research: Why businesses need data (the insight economy) -->
  <MarketResearch />

  <!-- 5. For Individuals: Value proposition for end users -->
  <ForIndividuals />

  <!-- 6. For Business: Value proposition for enterprises -->
  <ForBusiness />

  <!-- 7. Video Explainer -->
  <VideoSection />

  <!-- 8. Testimonials -->
  <UserStories onDemoClick={openDemoModal} />

  <!-- 9. Blog / Insights Preview -->
  <BlogPreview />
</main>

<!-- Footer with Demo CTA -->
<Footer onDemoClick={openDemoModal} />

<!-- Request a Demo Modal -->
<WaitlistModal bind:open={showDemoModal} />
