<!--
  Hero Section — OwnYourTwin Redesign
  Editorial two-column: bold headline left, ghost figure right
-->
<script lang="ts">
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
    padding-top: 80px;
  "
>
  <!-- Subtle grain texture overlay -->
  <div class="hero-grain"></div>

  <!-- Vertical rule accent (far left, editorial) -->
  <div style="
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, transparent, #e0e0e0 20%, #e0e0e0 80%, transparent);
  "></div>

  <div style="max-width:1200px; margin:0 auto; padding:80px 24px; width:100%; position:relative; z-index:1;">
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center;">

      <!-- LEFT: Text content -->
      <div class="animate-fade-in-up" style="padding-right:32px;">

        <!-- Overline label -->
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
          <span style="color:#111111; opacity:0.75;">You see none of it.</span>
        </h1>

        <!-- Divider -->
        <div style="width:56px; height:2px; background:#c4856a; margin-bottom:28px; border-radius:2px;"></div>

        <!-- Body -->
        <p style="
          font-family:'Lora',serif;
          font-style:italic;
          font-size:1.1rem;
          line-height:1.75;
          color:#555555;
          margin-bottom:40px;
          max-width:440px;
        ">
          OwnYourTwin creates an AI companion that learns who you are, 
          represents you to the world on your terms, and <strong style="font-style:normal; color:#111111;">earns on your behalf</strong> — 
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
            { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'You Earn, We Don\'t Sell' }
          ] as trust}
            <div style="display:flex; align-items:center; gap:6px;">
              <svg style="width:14px;height:14px;color:#aaaaaa;flex-shrink:0;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d={trust.icon}/>
              </svg>
              <span style="font-family:'Montserrat',sans-serif; font-size:0.75rem; font-weight:500; color:#aaaaaa; white-space:nowrap;">{trust.label}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- RIGHT: Ghost figure -->
      <div style="display:flex; justify-content:center; align-items:center; position:relative; height:520px;">
        <!-- Soft circle backdrop -->
        <div style="
          position:absolute;
          width:400px; height:400px;
          border-radius:50%;
          background:radial-gradient(circle, #e8e8e8 0%, #f0f0f0 50%, transparent 75%);
          top:50%; left:50%;
          transform:translate(-50%,-50%);
        "></div>
        <!-- CSS-only abstract visual — no external image needed -->
        <div class="animate-ghost" style="position:relative; z-index:1; width:100%; max-width:440px;">
          <div style="
            width:100%; aspect-ratio:4/5;
            position:relative;
            display:flex; align-items:center; justify-content:center;
          ">
            <!-- Concentric rings -->
            <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;width:100%;height:100%;">
              <!-- Outer ring -->
              <circle cx="200" cy="240" r="185" fill="none" stroke="#e8e8e8" stroke-width="1"/>
              <!-- Mid ring -->
              <circle cx="200" cy="240" r="140" fill="none" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="6 8"/>
              <!-- Inner ring -->
              <circle cx="200" cy="240" r="95" fill="none" stroke="#d8d8d8" stroke-width="1"/>
              <!-- Center fill -->
              <circle cx="200" cy="240" r="52" fill="#f0f0f0"/>

              <!-- Floating data nodes around outer ring -->
              <circle cx="200" cy="55" r="5" fill="#c4856a"/>
              <circle cx="345" cy="150" r="4" fill="#aaaaaa"/>
              <circle cx="370" cy="305" r="5" fill="#c4856a" opacity="0.6"/>
              <circle cx="265" cy="415" r="3" fill="#aaaaaa"/>
              <circle cx="135" cy="415" r="5" fill="#c4856a" opacity="0.8"/>
              <circle cx="30" cy="305" r="4" fill="#aaaaaa"/>
              <circle cx="55" cy="150" r="5" fill="#c4856a" opacity="0.5"/>

              <!-- Connector lines from center to nodes -->
              <line x1="200" y1="240" x2="200" y2="60" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="3 5"/>
              <line x1="200" y1="240" x2="345" y2="155" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="3 5"/>
              <line x1="200" y1="240" x2="365" y2="305" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="3 5"/>
              <line x1="200" y1="240" x2="265" y2="410" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="3 5"/>
              <line x1="200" y1="240" x2="135" y2="410" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="3 5"/>
              <line x1="200" y1="240" x2="35" y2="305" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="3 5"/>
              <line x1="200" y1="240" x2="60" y2="155" stroke="#e0e0e0" stroke-width="1" stroke-dasharray="3 5"/>

              <!-- Central figure — abstract human shape -->
              <ellipse cx="200" cy="210" rx="22" ry="22" fill="#cccccc"/>
              <path d="M158 310 Q158 265 200 265 Q242 265 242 310" fill="#cccccc"/>

              <!-- Node labels -->
              <text x="200" y="42" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="600" fill="#c4856a" letter-spacing="1">EARN</text>
              <text x="360" y="145" text-anchor="start" font-family="Montserrat,sans-serif" font-size="9" font-weight="600" fill="#888888" letter-spacing="1">HEALTH</text>
              <text x="382" y="312" text-anchor="start" font-family="Montserrat,sans-serif" font-size="9" font-weight="600" fill="#c4856a" letter-spacing="1">CAREER</text>
              <text x="270" y="432" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="600" fill="#888888" letter-spacing="1">SOCIAL</text>
              <text x="128" y="432" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="9" font-weight="600" fill="#c4856a" letter-spacing="1">VALUES</text>
              <text x="22" y="312" text-anchor="end" font-family="Montserrat,sans-serif" font-size="9" font-weight="600" fill="#888888" letter-spacing="1">FINANCE</text>
              <text x="40" y="145" text-anchor="end" font-family="Montserrat,sans-serif" font-size="9" font-weight="600" fill="#c4856a" letter-spacing="1">PREFS</text>

              <!-- "YOU OWN THIS" center label -->
              <text x="200" y="333" text-anchor="middle" font-family="Montserrat,sans-serif" font-size="8" font-weight="700" fill="#888888" letter-spacing="2">YOUR TWIN</text>
            </svg>
          </div>
        </div>
        <!-- Floating annotation cards -->
        <div class="animate-float" style="
          position:absolute; top:18%; right:2%;
          background:#ffffff; border:1px solid #e0e0e0;
          border-radius:10px; padding:10px 14px;
          box-shadow:0 4px 16px rgba(0,0,0,0.07);
          animation-delay:0.5s;
        ">
          <div style="font-family:'Montserrat',sans-serif; font-size:0.65rem; font-weight:600; color:#aaaaaa; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:3px;">Your Twin earns</div>
          <div style="font-family:'Montserrat',sans-serif; font-size:1.1rem; font-weight:700; color:#111111;">+$24.80</div>
        </div>
        <div class="animate-float" style="
          position:absolute; bottom:20%; left:0%;
          background:#ffffff; border:1px solid #e0e0e0;
          border-radius:10px; padding:10px 14px;
          box-shadow:0 4px 16px rgba(0,0,0,0.07);
          animation-delay:1.2s;
        ">
          <div style="font-family:'Montserrat',sans-serif; font-size:0.65rem; font-weight:600; color:#aaaaaa; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:3px;">Data stays with</div>
          <div style="font-family:'Montserrat',sans-serif; font-size:0.9rem; font-weight:700; color:#111111;">Only You 🔒</div>
        </div>
      </div>

    </div>
  </div>
</section>

<style>
  .hero-grain {
    position: absolute;
    inset: 0;
    opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 200px 200px;
    pointer-events: none;
    z-index: 0;
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
