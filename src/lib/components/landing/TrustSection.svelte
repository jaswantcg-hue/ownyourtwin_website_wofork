<!--
  Trust Section — OwnYourTwin Redesign
  5 clean pillar cards on white, no glows
-->

<section id="trust" style="
  background-color: #ffffff;
  padding: 96px 0;
  position: relative;
">
  <div style="max-width:1200px; margin:0 auto; padding:0 24px;">

    <!-- Header -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; margin-bottom:64px;" class="animate-fade-in-up">
      <div>
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
          <div style="width:28px; height:1px; background:#e0e0e0;"></div>
          <span class="section-label">Why Trust Us</span>
        </div>
        <h2 style="
          font-family:'Montserrat',sans-serif;
          font-weight:800;
          font-size:clamp(1.8rem,3.5vw,2.8rem);
          color:#111111;
          letter-spacing:-0.02em;
          line-height:1.15;
        ">
          We built this on one<br/>
          principle: your data<br/>
          is <em style="font-style:italic; font-weight:700;">yours</em>. Full stop.
        </h2>
      </div>
      <div style="padding-top:12px;">
        <p style="
          font-family:'Lora',serif;
          font-size:1.05rem;
          line-height:1.75;
          color:#666666;
          margin-bottom:24px;
        ">
          We don't sell your data. We don't scrape your profiles. 
          We built an architecture where you are always in control.
          not just in theory, but by technical design.
        </p>
        <p style="
          font-family:'Lora',serif;
          font-style:italic;
          font-size:0.95rem;
          color:#aaaaaa;
          line-height:1.6;
          border-left:3px solid #c4856a;
          padding-left:16px;
        ">
          "Your Twin is your representative in the digital economy. 
          It works for <strong style="font-style:normal; color:#888888;">you</strong>, 
          not for us."
        </p>
      </div>
    </div>

    <!-- 5 pillar cards: 3 top + 2 bottom centered -->
    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; margin-bottom:16px;">
      {#each [
        {
          icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
          title: 'Privacy by Design',
          body: 'Your data is encrypted at rest and in transit. We never access your raw data. Only your Twin does, on your instruction.',
        },
        {
          icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2',
          title: 'You Own Your Data',
          body: 'Your Digital Twin belongs to you, not us, not advertisers. You hold the keys to your digital self, always.',
        },
        {
          icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
          title: 'Granular Control',
          body: 'Choose exactly what your Twin shares. Toggle permissions per category, per request, per business, at any time.',
        },
      ] as pillar, i}
        <div
          class="pillar-card animate-fade-in-up"
          style:animation-delay="{i * 80}ms"
          style="
            padding:32px 28px;
            border:1px solid #e0e0e0;
            border-radius:12px;
            background:#ffffff;
            transition:all 0.25s;
          "
        >
          <div style="
            width:40px; height:40px;
            border-radius:50%;
            background:#111111;
            display:flex; align-items:center; justify-content:center;
            margin-bottom:20px;
          ">
            <svg width="18" height="18" fill="none" stroke="#ffffff" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d={pillar.icon}/>
            </svg>
          </div>
          <h3 style="
            font-family:'Montserrat',sans-serif;
            font-weight:700;
            font-size:1rem;
            color:#111111;
            margin-bottom:10px;
            letter-spacing:-0.01em;
          ">{pillar.title}</h3>
          <p style="
            font-family:'Lora',serif;
            font-size:0.88rem;
            line-height:1.65;
            color:#888888;
          ">{pillar.body}</p>
        </div>
      {/each}
    </div>

    <!-- Bottom 2 cards centered -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; max-width:800px; margin:0 auto;">
      {#each [
        {
          icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
          title: 'Fair Monetization',
          body: 'When your Twin provides value to a business, you earn directly. Transparent, fair, and instant payments to your account.',
        },
        {
          icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
          title: 'Enterprise-Grade Security',
          body: 'SOC 2 compliant infrastructure with end-to-end encryption. Your digital identity is protected at every layer.',
        },
      ] as pillar, i}
        <div
          class="pillar-card animate-fade-in-up"
          style:animation-delay="{(i + 3) * 80}ms"
          style="
            padding:32px 28px;
            border:1px solid #e0e0e0;
            border-radius:12px;
            background:#ffffff;
            transition:all 0.25s;
          "
        >
          <div style="
            width:40px; height:40px;
            border-radius:50%;
            background:#111111;
            display:flex; align-items:center; justify-content:center;
            margin-bottom:20px;
          ">
            <svg width="18" height="18" fill="none" stroke="#ffffff" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d={pillar.icon}/>
            </svg>
          </div>
          <h3 style="
            font-family:'Montserrat',sans-serif;
            font-weight:700;
            font-size:1rem;
            color:#111111;
            margin-bottom:10px;
          ">{pillar.title}</h3>
          <p style="
            font-family:'Lora',serif;
            font-size:0.88rem;
            line-height:1.65;
            color:#888888;
          ">{pillar.body}</p>
        </div>
      {/each}
    </div>

  </div>
</section>

<style>
  .pillar-card:hover {
    border-color: #c4856a;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    section > div > div:nth-child(1) {
      grid-template-columns: 1fr !important;
    }
    section > div > div:nth-child(2),
    section > div > div:nth-child(3) {
      grid-template-columns: 1fr !important;
    }
  }
</style>
