<!--
  OwnYourTwin Landing Page
  Monochrome editorial redesign — Montserrat + Lora
-->
<script lang="ts">
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import {
    Hero,
    ProblemSection,
    HowItWorks,
    StatsStrip,
    TrustSection,
    ForIndividuals,
    MediaTestimonials,
    WaitlistModal,
    ContactPanel,
  } from "$lib/components/landing";

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
  <title>OwnYourTwin — Own Your Data. Earn From It.</title>
  <meta
    name="description"
    content="Create an AI-powered Digital Twin that you own, you control, and that earns for you. Ethical consumer insights for businesses. Data sovereignty for individuals."
  />
</svelte:head>

<!-- Header -->
<Header transparent={true} onDemoClick={openDemoModal} />

<!-- Main landing sections -->
<main>
  <!-- 1. Hero: Editorial headline + ghost figure -->
  <Hero onDemoClick={openDemoModal} />

  <!-- 2. Problem: Old World vs New World comparison -->
  <ProblemSection />

  <!-- 3. How It Works: 01/02/03 editorial steps -->
  <HowItWorks />

  <!-- 4. Stats Strip: Key numbers on black -->
  <StatsStrip />

  <!-- 5. Trust Section: 5 privacy pillars -->
  <TrustSection />

  <!-- 6. For Individuals: Benefits + contained video -->
  <ForIndividuals />

  <!-- 7. Testimonials: 3 clean quote cards on charcoal -->
  <MediaTestimonials onDemoClick={openDemoModal} />
</main>

<!-- Footer with CTA strip -->
<Footer onDemoClick={openDemoModal} />

<!-- Contact Panel -->
<ContactPanel />

<!-- Early Access Modal -->
<WaitlistModal bind:open={showDemoModal} />
