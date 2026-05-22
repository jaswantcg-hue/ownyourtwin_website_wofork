<!--
  DataWheel — Interactive Spinning Data Sovereignty Wheel
  User drags to rotate like a steering wheel.
  The active node (pointed at by the fixed top arrow) updates the text below.
-->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  // ── Data nodes (6 total — no sensitive financial/health data) ─────────────
  const nodes = [
    {
      label: "EARN",
      headline: "You earn from your data.",
      sub: "When companies want insights, your Twin responds and you get paid directly.",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "EXPERTISE",
      headline: "Your expertise speaks for you.",
      sub: "Skills, knowledge, and professional experience shared on your terms. Your Twin represents your capabilities accurately.",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    },
    {
      label: "CAREER",
      headline: "Your career, your narrative.",
      sub: "Professional experience shared on your terms. No recruiter scraping. No leaks.",
      icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
    {
      label: "SOCIAL",
      headline: "Your social life is not a product.",
      sub: "Connections, communities, opinions - protected from surveillance capitalism.",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    },
    {
      label: "VALUES",
      headline: "Your values guide every response.",
      sub: "Ethics, beliefs, and principles. Your Twin reflects who you truly are.",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
    {
      label: "PREFS",
      headline: "Your preferences, never sold.",
      sub: "Tastes, hobbies, and lifestyle choices, not a commodity for advertisers.",
      icon: "M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.089 3.89 2.25 4.875 2.25h1.372c.516 0 1.021.128 1.47.365l1.426.712C9.485 3.524 10 4.33 10 5.215V6.75m0 0h1.5a3 3 0 013 3v.75m-4.5-3.75H9m-3.75 3.75h.008v.008H5.25v-.008zm3 0h.008v.008H8.25v-.008zm3 0h.008v.008h-.008v-.008z",
    },
  ];

  const N = nodes.length; // 6
  const RADIUS = 168;
  const CX = 250;
  const CY = 220;

  // ── Rotation state ────────────────────────────────────────────────────────
  let rotation = $state(0);
  let isDragging = $state(false);
  let dragStartAngle = 0;
  let rotationAtDragStart = 0;
  let activeIndex = $state(0);
  let isTransitioning = $state(false);
  let autoSpin: ReturnType<typeof setInterval>;

  // ── Geometry ──────────────────────────────────────────────────────────────
  // Node i's base angle (before rotation). i=0 starts at top (-90°).
  function getNodeAngle(i: number) {
    return (i / N) * 360 - 90;
  }

  // The rotation that places node i exactly at the top (-90° world angle):
  //   getNodeAngle(i) + rotation = -90  =>  rotation = -(i/N)*360
  function targetRotForIndex(i: number) {
    return -(i / N) * 360;
  }

  // Detect which node is currently closest to the top after a free drag.
  function updateActiveFromRotation(rot: number) {
    let best = 0;
    let bestDiff = Infinity;
    for (let i = 0; i < N; i++) {
      // World angle of node i in [0, 360)
      const worldAngle = ((getNodeAngle(i) + rot) % 360 + 360) % 360;
      // Top = 270° in 0-360 space (≡ -90°)
      let diff = Math.abs(worldAngle - 270);
      if (diff > 180) diff = 360 - diff;
      if (diff < bestDiff) { bestDiff = diff; best = i; }
    }
    activeIndex = best;
  }

  // Snap rotation so activeIndex is exactly at top, taking the shortest arc.
  function snapToNearest() {
    const target = targetRotForIndex(activeIndex);
    let adjusted = target;
    // Walk toward current rotation to find the nearest equivalent angle.
    while (adjusted - rotation > 180) adjusted -= 360;
    while (rotation - adjusted > 180) adjusted += 360;
    isTransitioning = true;
    rotation = adjusted;
    setTimeout(() => (isTransitioning = false), 450);
    startAutoSpin();
  }

  function startAutoSpin() {
    clearInterval(autoSpin);
    autoSpin = setInterval(() => {
      if (!isDragging) {
        const nextIndex = (activeIndex + 1) % N;
        const target = targetRotForIndex(nextIndex);
        let adjusted = target;
        while (adjusted - rotation > 180) adjusted -= 360;
        while (rotation - adjusted > 180) adjusted += 360;
        isTransitioning = true;
        rotation = adjusted;
        activeIndex = nextIndex;
        setTimeout(() => (isTransitioning = false), 600);
      }
    }, 3200);
  }

  // ── Pointer handling ──────────────────────────────────────────────────────
  let svgEl: SVGSVGElement;

  function getAngleFromEvent(e: PointerEvent) {
    const rect = svgEl.getBoundingClientRect();
    const svgCX = rect.left + rect.width / 2;
    const svgCY = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - svgCY, e.clientX - svgCX) * (180 / Math.PI);
  }

  function onPointerDown(e: PointerEvent) {
    isDragging = true;
    dragStartAngle = getAngleFromEvent(e);
    rotationAtDragStart = rotation;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    clearInterval(autoSpin);
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging) return;
    rotation = rotationAtDragStart + (getAngleFromEvent(e) - dragStartAngle);
    updateActiveFromRotation(rotation);
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    snapToNearest();
  }

  // ── Node screen position (for labels, which live outside the rotating group) ──
  function nodePos(i: number) {
    const rad = (getNodeAngle(i) + rotation) * (Math.PI / 180);
    return {
      x: CX + Math.cos(rad) * RADIUS,
      y: CY + Math.sin(rad) * RADIUS,
    };
  }

  onMount(() => {
    // Start with node 0 at top (rotation already = 0 = targetRotForIndex(0))
    startAutoSpin();
  });
  onDestroy(() => clearInterval(autoSpin));

  const cursorStyle = $derived(isDragging ? "grabbing" : "grab");
</script>

<div style="width:100%; max-width:420px; position:relative;">
  <!-- Hint -->
  <div style="
    text-align:center; margin-bottom:12px;
    font-family:'Montserrat',sans-serif; font-size:0.65rem;
    font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:#bbbbbb;
  ">
    ↻ Spin to explore your data
  </div>

  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <svg
    bind:this={svgEl}
    viewBox="0 0 500 440"
    style="width:100%; height:auto; cursor:{cursorStyle}; touch-action:none; display:block;"
    role="img"
    aria-label="Interactive data sovereignty wheel"
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    onpointerleave={onPointerUp}
  >
    <!-- Static inner rings -->
    <circle cx={CX} cy={CY} r="115" fill="none" stroke="#e8e8e8" stroke-width="1"/>
    <circle cx={CX} cy={CY} r="85"  fill="none" stroke="#eeeeee" stroke-width="1" stroke-dasharray="4 6"/>
    <circle cx={CX} cy={CY} r="58"  fill="#f3f3f3"/>

    <!-- Outer orbit ring — rotates with wheel -->
    <circle
      cx={CX} cy={CY} r={RADIUS}
      fill="none" stroke="#d8d8d8" stroke-width="1.5" stroke-dasharray="3 6"
      style="transform-origin:{CX}px {CY}px; transform:rotate({rotation}deg);
             transition:{isTransitioning ? 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)' : 'none'};"
    />

    <!-- Spokes + node circles — rotate with wheel -->
    <g style="transform-origin:{CX}px {CY}px; transform:rotate({rotation}deg);
               transition:{isTransitioning ? 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)' : 'none'};">
      {#each nodes as _node, i}
        {@const angleDeg = getNodeAngle(i)}
        {@const rad = angleDeg * Math.PI / 180}
        {@const nx = CX + Math.cos(rad) * RADIUS}
        {@const ny = CY + Math.sin(rad) * RADIUS}
        {@const isActive = i === activeIndex}

        <!-- Spoke -->
        <line
          x1={CX} y1={CY} x2={nx} y2={ny}
          stroke={isActive ? "#c4856a" : "#e0e0e0"}
          stroke-width={isActive ? "1.5" : "0.8"}
          stroke-dasharray="4 5"
          style="transition:stroke 0.4s, stroke-width 0.4s;"
        />

        <!-- Node dot -->
        <circle
          cx={nx} cy={ny} r={isActive ? 11 : 7}
          fill={isActive ? "#c4856a" : "#ffffff"}
          stroke={isActive ? "#c4856a" : "#cccccc"}
          stroke-width="1.5"
          style="transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1);
                 filter:{isActive ? 'drop-shadow(0 2px 8px rgba(196,133,106,0.4))' : 'none'};"
        />
      {/each}
    </g>

    <!-- Labels — outside the rotating group so they stay upright -->
    {#each nodes as node, i}
      {@const pos = nodePos(i)}
      {@const isActive = i === activeIndex}
      {@const lx = CX + (pos.x - CX) * 1.22}
      {@const ly = CY + (pos.y - CY) * 1.22 + 4}
      <text
        x={lx} y={ly}
        text-anchor="middle"
        font-family="Montserrat,sans-serif"
        font-size={isActive ? "9.5" : "8"}
        font-weight={isActive ? "700" : "600"}
        fill={isActive ? "#c4856a" : "#aaaaaa"}
        letter-spacing="1"
        style="transition:fill 0.4s, font-size 0.4s; pointer-events:none;"
      >{node.label}</text>
    {/each}

    <!-- Fixed top indicator arrow — always points to whichever node is at the top -->
    <polygon
      points="{CX-6},{CY - RADIUS - 18} {CX+6},{CY - RADIUS - 18} {CX},{CY - RADIUS - 8}"
      fill="#c4856a" opacity="0.85"
    />

    <!-- Central human figure -->
    <circle cx={CX} cy={CY - 16} r="16" fill="#cccccc"/>
    <path d="M{CX-22} {CY+44} Q{CX-22} {CY+8} {CX} {CY+8} Q{CX+22} {CY+8} {CX+22} {CY+44}" fill="#cccccc"/>

    <!-- YOU label -->
    <text x={CX} y={CY + 68}
      text-anchor="middle" font-family="Montserrat,sans-serif"
      font-size="7" font-weight="700" fill="#888888" letter-spacing="3"
    >YOU</text>

    <!-- Clay dot on head -->
    <circle cx={CX} cy={CY - 16} r="5" fill="#c4856a" opacity="0.85"/>
  </svg>

  <!-- Dynamic text below wheel -->
  <div style="margin-top:20px; text-align:center; min-height:80px; padding:0 8px;">
    <div style="
      font-family:'Montserrat',sans-serif; font-size:1rem; font-weight:700;
      color:#111111; margin-bottom:8px; line-height:1.3;
    ">{nodes[activeIndex].headline}</div>
    <p style="
      font-family:'Lora',serif; font-style:italic;
      font-size:0.85rem; color:#888888; line-height:1.6; margin:0;
    ">{nodes[activeIndex].sub}</p>
  </div>
</div>
