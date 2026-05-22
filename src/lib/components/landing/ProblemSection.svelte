<!--
  Problem Section — OwnYourTwin Redesign
  Old World vs New World editorial comparison
-->

<section
  style="
  background-color: #ffffff;
  padding: 96px 0;
  position: relative;
  overflow: hidden;
"
>
  <div style="max-width:1200px; margin:0 auto; padding:0 24px;">
    <!-- Section header -->
    <div
      style="text-align:center; margin-bottom:64px;"
      class="animate-fade-in-up"
    >
      <div
        style="display:flex; align-items:center; justify-content:center; gap:16px; margin-bottom:20px;"
      >
        <div
          style="flex:1; max-width:80px; height:1px; background:#e0e0e0;"
        ></div>
        <span class="section-label">The Problem We're Solving</span>
        <div
          style="flex:1; max-width:80px; height:1px; background:#e0e0e0;"
        ></div>
      </div>
      <h2
        style="
        font-family:'Montserrat',sans-serif;
        font-weight:800;
        font-size:clamp(2rem,4vw,3rem);
        color:#111111;
        letter-spacing:-0.02em;
        margin-bottom:16px;
      "
      >
        The data economy is broken.
      </h2>
      <p
        style="font-family:'Lora',serif; font-style:italic; font-size:1.1rem; color:#888888; max-width:560px; margin:0 auto; line-height:1.7;"
      >
        You generate the data. Platforms extract the value. You get nothing.
        <br />It's time for that to change.
      </p>
    </div>

    <!-- Two-column comparison -->
    <div
      style="display:grid; grid-template-columns:1fr 1fr; gap:0; border:1px solid #e0e0e0; border-radius:16px; overflow:hidden;"
    >
      <!-- Left: Old World -->
      <div
        style="
        background:#f8f8f6;
        padding:48px 44px;
        border-right:1px solid #e0e0e0;
        position:relative;
      "
      >
        <div
          style="
          position:absolute;
          top:28px; left:44px;
          font-family:'Montserrat',sans-serif;
          font-size:0.65rem;
          font-weight:700;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:#aaaaaa;
        "
        >
          The Old World
        </div>

        <div
          style="
          margin-top:40px;
          font-family:'Montserrat',sans-serif;
          font-weight:800;
          font-size:1.4rem;
          color:#555555;
          margin-bottom:32px;
          line-height:1.2;
          letter-spacing:-0.02em;
        "
        >
          Surveillance Capitalism
        </div>

        {#each [{ stat: "81%", desc: "of users feel they've lost control over their data" }, { stat: "$50K+", desc: "cost of a single traditional focus group" }, { stat: "0%", desc: "share of profits you receive from your own data" }] as item}
          <div
            style="display:flex; align-items:flex-start; gap:16px; margin-bottom:24px;"
          >
            <div
              style="
              width:32px; height:32px; flex-shrink:0;
              border-radius:50%;
              background:#e0e0e0;
              display:flex; align-items:center; justify-content:center;
            "
            >
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="#aaaaaa"
                stroke-width="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <div
                style="font-family:'Montserrat',sans-serif; font-weight:700; font-size:1.1rem; color:#888888;"
              >
                {item.stat}
              </div>
              <div
                style="font-family:'Lora',serif; font-size:0.9rem; color:#aaaaaa; line-height:1.5;"
              >
                {item.desc}
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Right: New World -->
      <div
        style="
        background:#ffffff;
        padding:48px 44px;
        position:relative;
      "
      >
        <div
          style="
          position:absolute;
          top:28px; left:44px;
          font-family:'Montserrat',sans-serif;
          font-size:0.65rem;
          font-weight:700;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:#c4856a;
        "
        >
          The OwnYourTwin Way
        </div>

        <div
          style="
          margin-top:40px;
          font-family:'Montserrat',sans-serif;
          font-weight:800;
          font-size:1.4rem;
          color:#111111;
          margin-bottom:32px;
          line-height:1.2;
          letter-spacing:-0.02em;
        "
        >
          The Digital Twin Marketplace
        </div>

        {#each [{ stat: "Real-time", desc: "insights delivered in minutes, not months" }, { stat: "10× cheaper", desc: "than traditional surveys or focus groups" }, { stat: "You keep share", desc: "of the value your data generates" }] as item}
          <div
            style="display:flex; align-items:flex-start; gap:16px; margin-bottom:24px;"
          >
            <div
              style="
              width:32px; height:32px; flex-shrink:0;
              border-radius:50%;
              background:#c4856a;
              display:flex; align-items:center; justify-content:center;
            "
            >
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="#ffffff"
                stroke-width="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <div
                style="font-family:'Montserrat',sans-serif; font-weight:700; font-size:1.1rem; color:#111111;"
              >
                {item.stat}
              </div>
              <div
                style="font-family:'Lora',serif; font-size:0.9rem; color:#888888; line-height:1.5;"
              >
                {item.desc}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Bottom tagline -->
    <div style="text-align:center; margin-top:48px;" class="animate-fade-in-up">
      <p
        style="
        font-family:'Lora',serif;
        font-style:italic;
        font-size:1.15rem;
        color:#888888;
        letter-spacing:0.01em;
      "
      >
        "Data is labor. And labor deserves fair wages."
      </p>
    </div>
  </div>
</section>

<style>
  @media (max-width: 768px) {
    section > div > div:nth-child(2) {
      grid-template-columns: 1fr !important;
    }
    section > div > div:nth-child(2) > div:first-child {
      border-right: none !important;
      border-bottom: 1px solid #e0e0e0;
    }
  }
</style>
