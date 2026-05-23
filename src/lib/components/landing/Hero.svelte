<!--
  Hero Section — OwnYourTwin Redesign
  Editorial two-column: bold headline left, interactive data wheel right
-->
<script lang="ts">
  import DataWheel from "./DataWheel.svelte";

  interface Props {
    onDemoClick?: () => void;
  }

  let { onDemoClick }: Props = $props();

  let interestShown = $state(false);
  let isLoading = $state(false);

  async function handleInterestClick() {
    isLoading = true;
    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "hero_show_interest" }),
      });
      if (response.ok) interestShown = true;
    } catch {
      interestShown = true;
    } finally {
      isLoading = false;
      if (interestShown) onDemoClick?.();
    }
  }

  function scrollToHowItWorks() {
    const el = document.querySelector("#how-it-works");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
</script>

<section
  id="hero"
  style="
    min-height: 100vh;
    background-color: #f8f8f6;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: 64px;
  "
>
  <!-- Grain overlay -->
  <div class="hero-grain"></div>

  <!-- Left editorial rule -->
  <div style="
    position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: linear-gradient(to bottom, transparent, #e0e0e0 20%, #e0e0e0 80%, transparent);
  "></div>

  <div style="max-width:1200px; margin:0 auto; padding:80px 24px; width:100%; position:relative; z-index:1;">
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center;">

      <!-- LEFT: Text content -->
      <div class="animate-fade-in-up" style="padding-right:16px;">

        <!-- Overline -->
        <div style="margin-bottom:28px; display:flex; align-items:center; gap:12px;">
          <div style="width:28px; height:1px; background:#aaaaaa;"></div>
          <span class="section-label">The Data Sovereignty Platform</span>
        </div>

        <!-- H1 -->
        <h1 style="
          font-family:'Montserrat',sans-serif;
          font-weight:800;
          font-size:clamp(2.6rem, 5vw, 4.2rem);
          line-height:1.08;
          color:#111111;
          margin-bottom:24px;
          letter-spacing:-0.03em;
        ">
          Your data is<br/>
          worth billions.<br/>
          <span style="opacity:0.6;">You see none of it.</span>
        </h1>

        <!-- Terracotta divider -->
        <div style="width:56px; height:2px; background:#c4856a; margin-bottom:28px; border-radius:2px;"></div>

        <!-- Body -->
        <p style="
          font-family:'Lora',serif;
          font-style:italic;
          font-size:1.05rem;
          line-height:1.75;
          color:#555555;
          margin-bottom:40px;
          max-width:440px;
        ">
          OwnYourTwin creates an AI companion that learns who you are,
          represents you to the world on your terms, and
          <strong style="font-style:normal; color:#111111;">earns on your behalf</strong>,
          with your data never leaving your control.
        </p>

        <!-- CTAs -->
        <div style="display:flex; flex-wrap:wrap; gap:14px; margin-bottom:40px;">
          <button
            class="btn-clay"
            onclick={handleInterestClick}
            disabled={isLoading}
            style="font-size:1rem; padding:0.85rem 2rem;"
          >
            {#if isLoading}
              <svg style="width:18px;height:18px;animation:spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            {:else if interestShown}
              <svg style="width:18px;height:18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            {/if}
            {interestShown ? "You're on the list!" : "Show Interest"}
          </button>

          <button class="btn-outline" onclick={scrollToHowItWorks} style="font-size:1rem; padding:0.85rem 2rem;">
            <svg style="width:16px;height:16px;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
            Learn How
          </button>
        </div>

        <!-- Trust signals -->
        <div style="display:flex; flex-wrap:wrap; gap:20px; align-items:center;">
          {#each [
            { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Privacy by Design' },
            { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'GDPR Compliant' },
            { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: "You Earn, We Don't Sell" }
          ] as trust}
            <div style="display:flex; align-items:center; gap:6px;">
              <svg style="width:14px;height:14px;flex-shrink:0;" fill="none" stroke="#aaaaaa" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d={trust.icon}/>
              </svg>
              <span style="font-family:'Montserrat',sans-serif; font-size:0.75rem; font-weight:500; color:#aaaaaa; white-space:nowrap;">{trust.label}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- RIGHT: Interactive spinning data wheel -->
      <div style="display:flex; justify-content:center; align-items:center; height:520px; user-select:none;">
        <DataWheel />
      </div>

    </div>
  </div>
</section>

<style>
  .hero-grain {
    position: absolute; inset: 0; opacity: 0.025; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat; background-size: 200px 200px;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @media (max-width: 768px) {
    section > div > div {
      grid-template-columns: 1fr !important;
    }
    section > div > div > div:last-child {
      display: none !important;
    }
  }
</style>
