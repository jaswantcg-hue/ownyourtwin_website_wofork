<!--
  Stats Strip — OwnYourTwin Redesign
  3 key statistics on pure black background, terracotta underlines
-->

<section style="
  background-color: #111111;
  padding: 72px 0;
">
  <div style="max-width:1200px; margin:0 auto; padding:0 24px;">
    <div style="
      display:grid;
      grid-template-columns:1fr 1fr 1fr;
      gap:0;
    ">
      {#each [
        {
          num: '81%',
          label: 'of people feel they\'ve lost control over their personal data',
          source: 'Global Data Privacy Survey'
        },
        {
          num: '79%',
          label: 'would share their data if they received fair, transparent compensation',
          source: 'OwnYourTwin Research'
        },
        {
          num: '10×',
          label: 'faster consumer insights compared to traditional surveys and focus groups',
          source: 'Internal Benchmark'
        }
      ] as stat, i}
        <div
          class="animate-fade-in-up"
          style="
            padding:0 48px;
            border-right:{i < 2 ? '1px solid #2a2a2a' : 'none'};
            text-align:center;
          "
          style:animation-delay="{i * 100}ms"
        >
          <!-- Big number -->
          <div style="
            font-family:'Montserrat',sans-serif;
            font-weight:800;
            font-size:clamp(3rem, 5vw, 4.5rem);
            color:#ffffff;
            letter-spacing:-0.04em;
            line-height:1;
            margin-bottom:12px;
          ">{stat.num}</div>

          <!-- Terracotta underline -->
          <div style="
            width:36px; height:2px;
            background:#c4856a;
            margin:0 auto 16px;
            border-radius:2px;
          "></div>

          <!-- Description -->
          <p style="
            font-family:'Lora',serif;
            font-style:italic;
            font-size:0.9rem;
            line-height:1.65;
            color:#aaaaaa;
            margin-bottom:12px;
          ">{stat.label}</p>

          <!-- Source -->
          <span style="
            font-family:'Montserrat',sans-serif;
            font-size:0.65rem;
            font-weight:600;
            letter-spacing:0.12em;
            text-transform:uppercase;
            color:#555555;
          ">{stat.source}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  @media (max-width: 768px) {
    section > div > div {
      grid-template-columns: 1fr !important;
      gap: 0;
    }
    section > div > div > div {
      border-right: none !important;
      border-bottom: 1px solid #2a2a2a;
      padding: 40px 24px !important;
    }
    section > div > div > div:last-child {
      border-bottom: none !important;
    }
  }
</style>
