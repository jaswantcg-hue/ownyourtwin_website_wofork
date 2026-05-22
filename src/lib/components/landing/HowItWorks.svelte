<!--
  How It Works — OwnYourTwin Redesign
  Editorial 01/02/03 ghost-number layout with grey vertical rules
-->

<section id="how-it-works" style="
  background-color: #efefef;
  padding: 96px 0;
  position: relative;
">
  <div style="max-width:1200px; margin:0 auto; padding:0 24px;">

    <!-- Section label with horizontal rules -->
    <div style="display:flex; align-items:center; gap:20px; margin-bottom:64px;" class="animate-fade-in-up">
      <div style="flex:1; height:1px; background:#d0d0d0;"></div>
      <span class="section-label" style="white-space:nowrap;">How It Works</span>
      <div style="flex:1; height:1px; background:#d0d0d0;"></div>
    </div>

    <!-- 3 steps -->
    <div style="
      display:grid;
      grid-template-columns:1fr 1fr 1fr;
      gap:0;
      border:1px solid #d0d0d0;
      border-radius:12px;
      overflow:hidden;
      background:#ffffff;
    ">
      {#each [
        {
          num: '01',
          icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
          title: 'Connect',
          body: 'Link your social profiles or chat via WhatsApp and Telegram. No new app to learn. Your Twin meets you where you already are.',
          hint: 'WhatsApp · Telegram · Social'
        },
        {
          num: '02',
          icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
          title: 'Your Twin Evolves',
          body: 'AI builds a dynamic Digital Twin that learns your preferences, values, and behavior patterns over time, like a wise companion who truly knows you.',
          hint: 'Always learning · Always yours'
        },
        {
          num: '03',
          icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
          title: 'You Earn',
          body: 'When businesses want ethical consumer insights, your Twin responds on your behalf. You approve what gets shared, and receive direct payment.',
          hint: 'Consent-first · Direct payment'
        }
      ] as step, i}
        <div
          class="animate-fade-in-up step-card"
          style="
            padding:44px 36px 40px;
            position:relative;
            border-right:{i < 2 ? '1px solid #e0e0e0' : 'none'};
            transition:background 0.25s;
          "
          style:animation-delay="{i * 120}ms"
        >
          <!-- Ghost number -->
          <div style="
            position:absolute;
            top:28px; right:28px;
            font-family:'Montserrat',sans-serif;
            font-weight:800;
            font-size:5.5rem;
            line-height:1;
            color:#e8e8e8;
            letter-spacing:-0.04em;
            user-select:none;
            pointer-events:none;
          ">{step.num}</div>

          <!-- Icon circle -->
          <div style="
            width:44px; height:44px;
            border-radius:50%;
            background:#111111;
            display:flex; align-items:center; justify-content:center;
            margin-bottom:24px;
            position:relative; z-index:1;
          ">
            <svg width="20" height="20" fill="none" stroke="#ffffff" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d={step.icon}/>
            </svg>
          </div>

          <!-- Title -->
          <h3 style="
            font-family:'Montserrat',sans-serif;
            font-weight:700;
            font-size:1.2rem;
            color:#111111;
            margin-bottom:12px;
            letter-spacing:-0.01em;
          ">{step.title}</h3>

          <!-- Body -->
          <p style="
            font-family:'Lora',serif;
            font-size:0.95rem;
            line-height:1.7;
            color:#666666;
            margin-bottom:24px;
          ">{step.body}</p>

          <!-- Hint tag -->
          <div style="
            display:inline-block;
            padding:4px 12px;
            background:#f0f0f0;
            border-radius:9999px;
            font-family:'Montserrat',sans-serif;
            font-size:0.68rem;
            font-weight:600;
            letter-spacing:0.08em;
            color:#aaaaaa;
            text-transform:uppercase;
          ">{step.hint}</div>

          <!-- Bottom terracotta bar on hover -->
          <div class="step-bar" style="
            position:absolute;
            bottom:0; left:0; right:0;
            height:3px;
            background:#c4856a;
            opacity:0;
            transition:opacity 0.25s;
            border-radius:0 0 3px 3px;
          "></div>
        </div>
      {/each}
    </div>

  </div>
</section>

<style>
  .step-card:hover {
    background: #fafafa;
  }
  .step-card:hover .step-bar {
    opacity: 1;
  }

  @media (max-width: 768px) {
    section > div > div:nth-child(2) {
      grid-template-columns: 1fr !important;
    }
    section > div > div:nth-child(2) > div {
      border-right: none !important;
      border-bottom: 1px solid #e0e0e0;
    }
    section > div > div:nth-child(2) > div:last-child {
      border-bottom: none !important;
    }
  }
</style>
