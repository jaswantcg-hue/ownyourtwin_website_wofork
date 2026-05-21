<!--
  For Individuals Section — OwnYourTwin Redesign
  Off-white background, benefit cards, contained video player
-->

<section id="for-individuals" style="
  background-color: #f8f8f6;
  padding: 96px 0;
  position: relative;
">
  <div style="max-width:1200px; margin:0 auto; padding:0 24px;">

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:start;">

      <!-- LEFT: text + benefit cards -->
      <div>
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;" class="animate-fade-in-up">
          <div style="width:28px; height:1px; background:#c4856a;"></div>
          <span class="section-label" style="color:#c4856a;">For Individuals</span>
        </div>

        <h2 style="
          font-family:'Montserrat',sans-serif;
          font-weight:800;
          font-size:clamp(1.8rem,3.5vw,2.8rem);
          color:#111111;
          letter-spacing:-0.02em;
          line-height:1.15;
          margin-bottom:20px;
        " class="animate-fade-in-up">
          Your Digital Companion.<br/>
          Always on. Always yours.
        </h2>

        <p style="
          font-family:'Lora',serif;
          font-style:italic;
          font-size:1.05rem;
          line-height:1.75;
          color:#666666;
          margin-bottom:48px;
        " class="animate-fade-in-up">
          Connect once, benefit forever. Your Twin works for you around the clock 
          — no effort required after setup. You stay in control at every step.
        </p>

        <!-- Benefit cards stacked -->
        {#each [
          {
            icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
            title: 'Chat in Your Comfort Zone',
            body: 'Connect through WhatsApp or Telegram. No new apps to learn — your Twin meets you where you already spend your time.',
          },
          {
            icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
            title: 'Your 24/7 AI Companion',
            body: 'Your Twin learns your values and preferences. It helps with journaling, reflection, and cognitive reframing — like a wise friend who truly knows you.',
          },
          {
            icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            title: 'Earn Passively',
            body: 'When businesses want insights, your Twin responds on your behalf. You approve what gets shared and earn credits transferable to your bank account.',
          },
        ] as benefit, i}
          <div
            class="benefit-card animate-fade-in-up"
            style:animation-delay="{i * 100}ms"
            style="
              display:flex;
              gap:20px;
              align-items:flex-start;
              padding:24px 24px 24px 20px;
              border-radius:12px;
              border:1px solid #e8e8e8;
              background:#ffffff;
              margin-bottom:12px;
              border-left:3px solid transparent;
              transition:all 0.25s;
            "
          >
            <div style="
              width:38px; height:38px;
              flex-shrink:0;
              border-radius:50%;
              background:#f0f0f0;
              display:flex; align-items:center; justify-content:center;
              transition:background 0.25s;
            " class="benefit-icon">
              <svg width="17" height="17" fill="none" stroke="#555555" stroke-width="1.8" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d={benefit.icon}/>
              </svg>
            </div>
            <div>
              <h3 style="
                font-family:'Montserrat',sans-serif;
                font-weight:700;
                font-size:0.95rem;
                color:#111111;
                margin-bottom:6px;
              ">{benefit.title}</h3>
              <p style="
                font-family:'Lora',serif;
                font-size:0.88rem;
                line-height:1.65;
                color:#888888;
              ">{benefit.body}</p>
            </div>
          </div>
        {/each}

        <!-- Consent note -->
        <div style="
          margin-top:24px;
          display:flex;
          align-items:center;
          gap:10px;
          padding:14px 18px;
          background:#ffffff;
          border:1px solid #e0e0e0;
          border-radius:9999px;
        " class="animate-fade-in-up">
          <svg width="15" height="15" fill="none" stroke="#c4856a" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          <span style="font-family:'Montserrat',sans-serif; font-size:0.78rem; font-weight:500; color:#888888;">
            You <strong style="color:#111111; font-weight:700;">always approve</strong> what your Twin shares. Nothing happens without your consent.
          </span>
        </div>
      </div>

      <!-- RIGHT: Video player -->
      <div class="animate-fade-in-up" style="animation-delay:200ms;">
        <div style="
          background:#111111;
          border-radius:16px;
          padding:20px;
          box-shadow:0 16px 48px rgba(0,0,0,0.15);
          position:sticky;
          top:96px;
        ">
          <!-- Chat label -->
          <div style="
            display:flex;
            align-items:center;
            gap:8px;
            margin-bottom:14px;
            padding:0 4px;
          ">
            <div style="width:8px; height:8px; border-radius:50%; background:#c4856a;"></div>
            <span style="font-family:'Montserrat',sans-serif; font-size:0.7rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#aaaaaa;">Your Twin · Live</span>
            <div style="margin-left:auto; display:flex; gap:5px; align-items:center;">
              <div style="width:10px;height:10px;border-radius:50%;background:#3a3a3a;"></div>
              <div style="width:10px;height:10px;border-radius:50%;background:#3a3a3a;"></div>
              <div style="width:10px;height:10px;border-radius:50%;background:#3a3a3a;"></div>
            </div>
          </div>

          <!-- Chat window -->
          <div style="
            background:#0d0d0d;
            border-radius:10px;
            padding:20px;
            min-height:320px;
            display:flex;
            flex-direction:column;
            gap:14px;
          ">
            <!-- Business request -->
            <div style="display:flex; justify-content:flex-start; gap:10px; align-items:flex-start;">
              <div style="
                width:28px;height:28px;flex-shrink:0;
                border-radius:50%;background:#222222;
                display:flex;align-items:center;justify-content:center;
                font-family:'Montserrat',sans-serif;font-size:0.6rem;font-weight:700;color:#555555;
              ">BIZ</div>
              <div style="
                background:#1e1e1e;
                border:1px solid #2a2a2a;
                border-radius:0 10px 10px 10px;
                padding:10px 14px;
                max-width:80%;
              ">
                <p style="font-family:'Lora',serif;font-style:italic;font-size:0.8rem;color:#888888;margin:0;line-height:1.5;">
                  We'd like to understand your preference on sustainable travel for our Q3 report.
                </p>
              </div>
            </div>

            <!-- Twin response -->
            <div style="display:flex; justify-content:flex-end; gap:10px; align-items:flex-start;">
              <div style="
                background:#c4856a;
                border-radius:10px 0 10px 10px;
                padding:10px 14px;
                max-width:80%;
              ">
                <p style="font-family:'Lora',serif;font-style:italic;font-size:0.8rem;color:#ffffff;margin:0 0 6px;line-height:1.5;">
                  Based on [User]'s preferences: prioritizes eco-certified accommodation, avoids single-use plastics, and prefers train over short-haul flights.
                </p>
                <span style="font-family:'Montserrat',sans-serif;font-size:0.65rem;font-weight:600;color:rgba(255,255,255,0.6);letter-spacing:0.08em;">YOUR TWIN · RESPONDING ON YOUR BEHALF</span>
              </div>
              <div style="
                width:28px;height:28px;flex-shrink:0;
                border-radius:50%;background:#c4856a;
                display:flex;align-items:center;justify-content:center;
                font-family:'Montserrat',sans-serif;font-size:0.6rem;font-weight:700;color:#ffffff;
              ">YOU</div>
            </div>

            <!-- Earning notification -->
            <div style="
              background:#1a1a1a;
              border:1px solid #2e2e2e;
              border-left:3px solid #c4856a;
              border-radius:8px;
              padding:10px 14px;
              display:flex;
              align-items:center;
              gap:10px;
            ">
              <svg width="14" height="14" fill="none" stroke="#c4856a" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <span style="font-family:'Montserrat',sans-serif;font-size:0.75rem;font-weight:700;color:#ffffff;">+$3.20 earned</span>
                <span style="font-family:'Lora',serif;font-size:0.72rem;color:#555555;margin-left:6px;font-style:italic;">Credited to your account</span>
              </div>
            </div>

            <!-- Typing indicator -->
            <div style="display:flex; align-items:center; gap:6px; padding:0 4px;">
              <div style="width:6px;height:6px;border-radius:50%;background:#444444;animation:ghostPulse 1.4s infinite;"></div>
              <div style="width:6px;height:6px;border-radius:50%;background:#444444;animation:ghostPulse 1.4s 0.2s infinite;"></div>
              <div style="width:6px;height:6px;border-radius:50%;background:#444444;animation:ghostPulse 1.4s 0.4s infinite;"></div>
              <span style="font-family:'Montserrat',sans-serif;font-size:0.68rem;color:#444444;margin-left:4px;">Awaiting next request...</span>
            </div>
          </div>

          <!-- Caption -->
          <div style="margin-top:14px; padding:0 4px;">
            <p style="font-family:'Lora',serif; font-style:italic; font-size:0.8rem; color:#666666; line-height:1.5; margin:0;">
              Your Twin responds to businesses on your behalf — and you earn directly. 
              You see every interaction, every penny.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<style>
  .benefit-card:hover {
    border-left-color: #c4856a;
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  }
  .benefit-card:hover .benefit-icon {
    background: #c4856a;
  }
  .benefit-card:hover .benefit-icon svg {
    stroke: #ffffff;
  }

  @media (max-width: 768px) {
    section > div > div {
      grid-template-columns: 1fr !important;
      gap: 40px !important;
    }
    section > div > div > div:last-child > div {
      position: static !important;
    }
  }
</style>
