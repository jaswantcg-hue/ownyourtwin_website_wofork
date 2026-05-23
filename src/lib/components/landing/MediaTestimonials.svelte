<!--
  Media & Testimonials — OwnYourTwin Redesign
  Clean full-width charcoal section: 3 quote cards in a proper grid
-->
<script lang="ts">
  interface Props {
    onDemoClick?: () => void;
  }
  let { onDemoClick }: Props = $props();

  const testimonials = [
    {
      quote: "I finally feel like my data is working for me, not against me. The privacy controls are incredible. I choose exactly what gets shared, and I see every penny earned.",
      name: "Sarah M.",
      role: "Early Adopter · Product Designer",
      initial: "S",
    },
    {
      quote: "What impressed me most was the transparency. I see every request, every earning, every byte of data my Twin shares. No surprises. No small print. Finally.",
      name: "David R.",
      role: "Beta Tester · Software Engineer",
      initial: "D",
    },
    {
      quote: "As a business, the quality of insights from Digital Twins is miles ahead of traditional surveys. The data is genuine because users are actually engaged and rewarded.",
      name: "Priya K.",
      role: "Product Manager · FinTech",
      initial: "P",
    },
  ];
</script>

<section style="
  background-color: #1a1a1a;
  padding: 96px 0;
  position: relative;
  overflow: hidden;
">
  <!-- Subtle texture -->
  <div style="
    position:absolute; inset:0;
    background:radial-gradient(ellipse at 50% 0%, rgba(196,133,106,0.04) 0%, transparent 60%);
    pointer-events:none;
  "></div>

  <div style="max-width:1200px; margin:0 auto; padding:0 24px; position:relative; z-index:1;">

    <!-- Section header -->
    <div style="text-align:center; margin-bottom:64px;" class="animate-fade-in-up">
      <div style="display:flex; align-items:center; justify-content:center; gap:20px; margin-bottom:20px;">
        <div style="flex:1; max-width:80px; height:1px; background:#2a2a2a;"></div>
        <span style="
          font-family:'Montserrat',sans-serif;
          font-size:0.68rem;
          font-weight:600;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:#555555;
        ">What People Are Saying</span>
        <div style="flex:1; max-width:80px; height:1px; background:#2a2a2a;"></div>
      </div>
      <h2 style="
        font-family:'Montserrat',sans-serif;
        font-weight:800;
        font-size:clamp(1.8rem,3.5vw,2.8rem);
        color:#ffffff;
        letter-spacing:-0.02em;
        line-height:1.15;
      ">Hear from our early adopters</h2>
    </div>

    <!-- 3 testimonial cards — clean full grid -->
    <div style="
      display:grid;
      grid-template-columns:1fr 1fr 1fr;
      gap:20px;
      margin-bottom:64px;
    ">
      {#each testimonials as t, i}
        <div
          class="testimonial-card animate-fade-in-up"
          style:animation-delay="{i * 120}ms"
          style="
            background:#222222;
            border:1px solid #2e2e2e;
            border-radius:16px;
            padding:36px 32px 32px;
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            min-height:260px;
            transition:border-color 0.25s, transform 0.25s;
          "
        >
          <!-- Big quote mark -->
          <div style="
            font-family:'Lora',serif;
            font-size:4rem;
            line-height:1;
            color:#2e2e2e;
            margin-bottom:8px;
            font-weight:400;
            user-select:none;
          ">"</div>

          <!-- Quote text -->
          <p style="
            font-family:'Lora',serif;
            font-style:italic;
            font-size:0.95rem;
            line-height:1.75;
            color:#cccccc;
            flex:1;
            margin-bottom:28px;
          ">{t.quote}</p>

          <!-- Divider -->
          <div style="width:32px; height:1px; background:#3a3a3a; margin-bottom:20px;"></div>

          <!-- Person -->
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="
              width:40px; height:40px;
              border-radius:50%;
              background:#333333;
              border:1px solid #3a3a3a;
              display:flex; align-items:center; justify-content:center;
              font-family:'Montserrat',sans-serif;
              font-weight:700;
              font-size:0.85rem;
              color:#aaaaaa;
              flex-shrink:0;
            ">{t.initial}</div>
            <div>
              <div style="
                font-family:'Montserrat',sans-serif;
                font-weight:700;
                font-size:0.9rem;
                color:#ffffff;
                letter-spacing:0.01em;
              ">{t.name}</div>
              <div style="
                font-family:'Lora',serif;
                font-size:0.78rem;
                color:#666666;
                line-height:1.4;
              ">{t.role}</div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- CTA row at the bottom -->
    <div style="text-align:center;" class="animate-fade-in-up">
      <p style="
        font-family:'Lora',serif;
        font-style:italic;
        font-size:1rem;
        color:#555555;
        margin-bottom:24px;
      ">
        Ready to take control of your data and start earning from it?
      </p>
      <button
        class="btn-clay"
        onclick={onDemoClick}
        style="font-size:1rem; padding:0.9rem 2.4rem;"
      >
        Sign Up for Early Access
      </button>
    </div>

  </div>
</section>

<style>
  .testimonial-card:hover {
    border-color: #c4856a;
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    section > div > div:nth-child(2) {
      grid-template-columns: 1fr !important;
    }
  }
</style>
