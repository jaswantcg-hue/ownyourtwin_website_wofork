<!--
  DataWheel — Interactive Spinning Data Sovereignty Wheel
  User drags to rotate like a steering wheel.
  The active top node changes the center message — "You control your X data".
-->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  // ── Data nodes ───────────────────────────────────────────────────────────────
  const nodes = [
    {
      label: "EARN",
      headline: "You earn from your data.",
      sub: "When companies want insights, your Twin responds and you get paid directly.",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "EXPERT",
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
      label: "FINANCE",
      headline: "Your finances stay yours.",
      sub: "Spending patterns and financial behaviour, shared only with your explicit consent.",
      icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    },
    {
      label: "PREFS",
      headline: "Your preferences, never sold.",
      sub: "Tastes, hobbies, and lifestyle choices, not a commodity for advertisers.",
      icon: "M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.089 3.89 2.25 4.875 2.25h1.372c.516 0 1.021.128 1.47.365l1.426.712C9.485 3.524 10 4.33 10 5.215V6.75m0 0h1.5a3 3 0 013 3v.75m-4.5-3.75H9m-3.75 3.75h.008v.008H5.25v-.008zm3 0h.008v.008H8.25v-.008zm3 0h.008v.008h-.008v-.008z",
    },
  ];

  const N = nodes.length;
  const RADIUS = 168;
  const CX = 250;   // shifted right to centre in wider viewBox
  const CY = 220;   // shifted down to centre in taller viewBox

  // ── Rotation state ────────────────────────────────────────────────────────────
  let rotation = $state(0);         // current wheel angle in degrees
  let isDragging = $state(false);
  let dragStartAngle = 0;
  let rotationAtDragStart = 0;
  let activeIndex = $state(0);      // which node is at top
  let isTransitioning = $state(false);
  let autoSpin: ReturnType<typeof setInterval>;

  // ── Derive active index from rotation ────────────────────────────────────────
  function getNodeAngle(i: number) {
    // nodes evenly spaced, starting at top (−90°)
    return (i / N) * 360 - 90;
  }

  function updateActiveFromRotation(rot: number) {
    // Which node is closest to the top (−90° = 270° in positive terms)?
    let best = 0;
    let bestDiff = Infinity;
    for (let i = 0; i < N; i++) {
      const nodeAngle = ((getNodeAngle(i) + rot) % 360 + 360) % 360;
      // Top = 270° in 0-360 space (since -90° = 270°)
      let diff = Math.abs(nodeAngle - 270);
      if (diff > 180) diff = 360 - diff;
      if (diff < bestDiff) { bestDiff = diff; best = i; }
    }
    activeIndex = best;
  }

  // ── Pointer math helpers ──────────────────────────────────────────────────────
  let svgEl: SVGSVGElement;

  function getAngleFromEvent(e: PointerEvent | TouchEvent) {
    const rect = svgEl.getBoundingClientRect();
    let clientX: number, clientY: number;
    if (e instanceof TouchEvent) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    // centre of SVG in client coords
    const svgCX = rect.left + rect.width / 2;
    const svgCY = rect.top + rect.height / 2;
    return Math.atan2(clientY - svgCY, clientX - svgCX) * (180 / Math.PI);
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
    const delta = getAngleFromEvent(e) - dragStartAngle;
    rotation = rotationAtDragStart + delta;
    updateActiveFromRotation(rotation);
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    snapToNearest();
  }

  function snapToNearest() {
    // Snap so the active node lands exactly at top
    const targetNodeBaseAngle = getNodeAngle(activeIndex); // e.g. −90 for index 0
    // We want: targetNodeBaseAngle + rotation ≡ 270° (top in 0-360)
    // => rotation = 270 - targetNodeBaseAngle  (mod 360, adjusted for shortest path)
    let targetRot = 270 - (targetNodeBaseAngle + 90); // simplified
    // Keep it close to current rotation to avoid big jumps
    while (targetRot - rotation > 180) targetRot -= 360;
    while (rotation - targetRot > 180) targetRot += 360;
    rotation = targetRot;
    isTransitioning = true;
    setTimeout(() => (isTransitioning = false), 450);
    startAutoSpin();
  }

  function startAutoSpin() {
    clearInterval(autoSpin);
    autoSpin = setInterval(() => {
      if (!isDragging) {
        const nextIndex = (activeIndex + 1) % N;
        const targetNodeBaseAngle = getNodeAngle(nextIndex);
        let targetRot = 270 - (targetNodeBaseAngle + 90);
        while (targetRot - rotation > 180) targetRot -= 360;
        while (rotation - targetRot > 180) targetRot += 360;
        isTransitioning = true;
        rotation = targetRot;
        activeIndex = nextIndex;
        setTimeout(() => (isTransitioning = false), 600);
      }
    }, 3200);
  }

  onMount(() => {
    updateActiveFromRotation(rotation);
    startAutoSpin();
  });
  onDestroy(() => clearInterval(autoSpin));

  // ── Node positions ────────────────────────────────────────────────────────────
  function nodePos(i: number) {
    const angleDeg = getNodeAngle(i) + rotation;
    const rad = angleDeg * (Math.PI / 180);
    return {
      x: CX + Math.cos(rad) * RADIUS,
      y: CY + Math.sin(rad) * RADIUS,
    };
  }

  // Hint for cursor
  const cursorStyle = $derived(isDragging ? "grabbing" : "grab");
</script>

<div style="width:100%; max-width:420px; position:relative;">
  <!-- Hint label -->
  <div style="
    text-align:center;
    margin-bottom:12px;
    font-family:'Montserrat',sans-serif;
    font-size:0.65rem;
    font-weight:600;
    letter-spacing:0.18em;
    text-transform:uppercase;
    color:#bbbbbb;
  ">
    ↻ Spin to explore your data
  </div>

  <!-- SVG wheel -->
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
    <circle cx={CX} cy={CY} r="85" fill="none" stroke="#eeeeee" stroke-width="1" stroke-dasharray="4 6"/>
    <circle cx={CX} cy={CY} r="58" fill="#f3f3f3"/>

    <!-- Outer orbit ring (rotates with wheel) -->
    <circle
      cx={CX} cy={CY} r={RADIUS}
      fill="none"
      stroke="#d8d8d8"
      stroke-width="1.5"
      stroke-dasharray="3 6"
      style="transform-origin:{CX}px {CY}px; transform:rotate({rotation}deg); transition:{isTransitioning ? 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)' : 'none'};"
    />

    <!-- Spokes + nodes (rotate with wheel) -->
    <g style="transform-origin:{CX}px {CY}px; transform:rotate({rotation}deg); transition:{isTransitioning ? 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)' : 'none'};">
      {#each nodes as node, i}
        {@const angleDeg = getNodeAngle(i)}
        {@const rad = angleDeg * Math.PI / 180}
        {@const nx = CX + Math.cos(rad) * RADIUS}
        {@const ny = CY + Math.sin(rad) * RADIUS}
        {@const isActive = i === activeIndex}

        <!-- Spoke line -->
        <line
          x1={CX} y1={CY}
          x2={nx} y2={ny}
          stroke={isActive ? "#c4856a" : "#e0e0e0"}
          stroke-width={isActive ? "1.5" : "0.8"}
          stroke-dasharray="4 5"
          style="transition: stroke 0.4s, stroke-width 0.4s;"
        />

        <!-- Node circle -->
        <circle
          cx={nx} cy={ny} r={isActive ? 11 : 7}
          fill={isActive ? "#c4856a" : "#ffffff"}
          stroke={isActive ? "#c4856a" : "#cccccc"}
          stroke-width="1.5"
          style="transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1); filter:{isActive ? 'drop-shadow(0 2px 8px rgba(196,133,106,0.4))' : 'none'};"
        />
      {/each}
    </g>

    <!-- Node labels (positioned outside ring, counter-rotate to stay readable) -->
    {#each nodes as node, i}
      {@const pos = nodePos(i)}
      {@const isActive = i === activeIndex}
      <!-- Push label further out along the spoke direction -->
      {@const lx = CX + (pos.x - CX) * 1.22}
      {@const ly = CY + (pos.y - CY) * 1.22 + 4}
      <text
        x={lx}
        y={ly}
        text-anchor="middle"
        font-family="Montserrat,sans-serif"
        font-size={isActive ? "10" : "8.5"}
        font-weight={isActive ? "700" : "600"}
        fill={isActive ? "#c4856a" : "#aaaaaa"}
        letter-spacing="1.5"
        style="transition: fill 0.4s, font-size 0.4s; pointer-events:none;"
      >{node.label}</text>
    {/each}

    <!-- Top indicator marker (fixed, doesn't rotate) -->
    <polygon
      points="{CX-6},{CY - RADIUS - 18} {CX+6},{CY - RADIUS - 18} {CX},{CY - RADIUS - 8}"
      fill="#c4856a"
      opacity="0.8"
    />

    <!-- Central human figure (static) -->
    <!-- Head -->
    <circle cx={CX} cy={CY - 16} r="16" fill="#cccccc"/>
    <!-- Body -->
    <path d="M{CX-22} {CY+44} Q{CX-22} {CY+8} {CX} {CY+8} Q{CX+22} {CY+8} {CX+22} {CY+44}" fill="#cccccc"/>

    <!-- "YOU" label in center -->
    <text
      x={CX} y={CY + 68}
      text-anchor="middle"
      font-family="Montserrat,sans-serif"
      font-size="7"
      font-weight="700"
      fill="#888888"
      letter-spacing="3"
    >YOU</text>

    <!-- Active indicator dot in center -->
    <circle cx={CX} cy={CY - 16} r="5" fill="#c4856a" opacity="0.85"/>
  </svg>

  <!-- Dynamic text block below wheel -->
  <div style="
    margin-top:20px;
    text-align:center;
    min-height:80px;
    padding:0 8px;
  ">
    <div style="
      font-family:'Montserrat',sans-serif;
      font-size:1rem;
      font-weight:700;
      color:#111111;
      margin-bottom:8px;
      line-height:1.3;
      transition:opacity 0.3s;
    ">{nodes[activeIndex].headline}</div>
    <p style="
      font-family:'Lora',serif;
      font-style:italic;
      font-size:0.85rem;
      color:#888888;
      line-height:1.6;
      margin:0;
      transition:opacity 0.3s;
    ">{nodes[activeIndex].sub}</p>
  </div>
</div>
