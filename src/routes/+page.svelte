<!--
  OwnYourTwin Landing Page
  Premium, trust-building landing page for Digital Twin concept validation
-->
<script lang="ts">
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import {
    Hero,
    HowItWorks,
    TrustSection,
    ForIndividuals,
    MediaTestimonials,
    WaitlistModal,
    ContactPanel,
  } from "$lib/components/landing";

  // Demo modal state
  let showDemoModal = $state(false);

  function openDemoModal() {
    showDemoModal = true;
  }

  interface Props {
    data: import("./$types").PageData;
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title
    >OwnYourTwin - Own Your Data. Earn From It. | Digital Twin Platform</title
  >
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

  <!-- 5. For Individuals: Value proposition for end users -->
  <ForIndividuals />

  <!-- 7. Media & Testimonials -->
  <MediaTestimonials onDemoClick={openDemoModal} />
</main>

<!-- Footer with Demo CTA -->
<Footer onDemoClick={openDemoModal} />

<!-- Hover Contact Panel -->
<ContactPanel />

<!-- Sign Up for Early Access Modal -->
<WaitlistModal bind:open={showDemoModal} />
