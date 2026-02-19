<!--
  Digital Twin Component
  Enhanced information flow visualization: Social Data → Twin → Monetization
  Features animated SVG flow paths and neural brain visualization
-->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  interface Props {
    class?: string;
  }

  let { class: className = "" }: Props = $props();

  let containerRef: HTMLDivElement;
  let canvasRef: HTMLCanvasElement;
  let svgRef: SVGSVGElement;
  let animationId: number;
  let brainPoints: Array<{
    x: number;
    y: number;
    origX: number;
    origY: number;
    alpha: number;
    size: number;
    pulseSpeed: number;
  }> = [];
  let frame = 0;
  let width = 0;
  let height = 0;
  let earnings = $state(1250.78);

  // Element refs for flow connections
  let neuralInRef: HTMLDivElement;
  let neuralOutRef: HTMLDivElement;
  let humanOriginRef: HTMLDivElement;
  let socialNodesRef: HTMLDivElement;
  let strategyCardsRef: HTMLDivElement;

  function generateBrain() {
    brainPoints = [];
    const cx = width / 2;
    const cy = height / 2;
    const rx = 120;
    const ry = 90;

    for (let i = 0; i < 300; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random());
      let px = Math.cos(angle) * r * rx;
      let py = Math.sin(angle) * r * ry;
      // Create brain-like indent
      if (Math.abs(px) < 20) py *= 0.85;

      brainPoints.push({
        x: cx + px,
        y: cy + py,
        origX: cx + px,
        origY: cy + py,
        alpha: 0.15 + Math.random() * 0.4,
        size: 0.8 + Math.random() * 1.0,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }
  }

  function drawFlows() {
    if (!svgRef || !containerRef) return;

    const svgRect = containerRef.getBoundingClientRect();

    // Get element positions
    const neuralIn = neuralInRef?.getBoundingClientRect();
    const neuralOut = neuralOutRef?.getBoundingClientRect();
    const humanOrigin = humanOriginRef?.getBoundingClientRect();
    const socialNodes = socialNodesRef?.querySelectorAll(".social-node");
    const strategyCards = strategyCardsRef?.querySelectorAll(".strategy-card");

    if (!neuralIn || !neuralOut) return;

    // Clear existing paths
    svgRef.innerHTML = `
            <defs>
                <linearGradient id="grad-direct" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(99, 102, 241, 0.8)" />
                    <stop offset="100%" stop-color="rgba(99, 102, 241, 0.1)" />
                </linearGradient>
                <linearGradient id="grad-social" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(99, 102, 241, 0.25)" />
                    <stop offset="100%" stop-color="rgba(99, 102, 241, 0.03)" />
                </linearGradient>
                <linearGradient id="grad-out" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgba(45, 212, 191, 0.05)" />
                    <stop offset="100%" stop-color="rgba(45, 212, 191, 0.4)" />
                </linearGradient>
            </defs>
        `;

    const biX = neuralIn.left - svgRect.left + neuralIn.width / 2;
    const biY = neuralIn.top - svgRect.top + neuralIn.height / 2;
    const boX = neuralOut.left - svgRect.left + neuralOut.width / 2;
    const boY = neuralOut.top - svgRect.top + neuralOut.height / 2;

    // 1. Human Direct to Brain (Active Feedback - prominent)
    if (humanOrigin) {
      const huX = humanOrigin.left - svgRect.left + humanOrigin.width;
      const huY = humanOrigin.top - svgRect.top + humanOrigin.height / 2;
      const dHumanDirect = `M ${huX} ${huY} C ${huX + (biX - huX) * 0.5} ${huY}, ${huX + (biX - huX) * 0.5} ${biY}, ${biX} ${biY}`;

      const directPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      directPath.setAttribute("d", dHumanDirect);
      directPath.setAttribute("class", "flow-line");
      directPath.setAttribute("stroke", "url(#grad-direct)");
      directPath.setAttribute("stroke-width", "2");
      svgRef.appendChild(directPath);
      addPulse(dHumanDirect, "#a78bfa", 3.5);
    }

    // 2. Social Nodes to Brain (Passive Background)
    socialNodes?.forEach((node) => {
      const r = node.getBoundingClientRect();
      const nx = r.left - svgRect.left + r.width;
      const ny = r.top - svgRect.top + r.height / 2;
      const d = `M ${nx} ${ny} C ${nx + (biX - nx) * 0.6} ${ny}, ${nx + (biX - nx) * 0.6} ${biY}, ${biX} ${biY}`;

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", d);
      path.setAttribute("class", "flow-line");
      path.setAttribute("stroke", "url(#grad-social)");
      path.setAttribute("stroke-width", "1");
      svgRef.appendChild(path);
      addPulse(d, "rgba(99, 102, 241, 0.4)", 5 + Math.random() * 2);
    });

    // 3. Brain to Strategy Cards (Output Processing)
    strategyCards?.forEach((card) => {
      const r = card.getBoundingClientRect();
      const nx = r.left - svgRect.left;
      const ny = r.top - svgRect.top + r.height / 2;
      const d = `M ${boX} ${boY} C ${boX + (nx - boX) * 0.5} ${boY}, ${boX + (nx - boX) * 0.5} ${ny}, ${nx} ${ny}`;

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", d);
      path.setAttribute("class", "flow-line");
      path.setAttribute("stroke", "url(#grad-out)");
      path.setAttribute("stroke-width", "1.5");
      svgRef.appendChild(path);
      addPulse(d, "#2dd4bf", 4 + Math.random() * 2);
    });
  }

  function addPulse(d: string, color: string, duration: number) {
    if (!svgRef) return;

    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    circle.setAttribute("r", "2");
    circle.setAttribute("fill", color);
    circle.style.filter = `drop-shadow(0 0 4px ${color})`;

    const anim = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animateMotion",
    );
    anim.setAttribute("dur", `${duration}s`);
    anim.setAttribute("repeatCount", "indefinite");
    anim.setAttribute("path", d);

    circle.appendChild(anim);
    svgRef.appendChild(circle);
  }

  function init() {
    if (!canvasRef) return;

    width = canvasRef.width = canvasRef.offsetWidth;
    height = canvasRef.height = canvasRef.offsetHeight;

    generateBrain();

    // Delay flow drawing to ensure elements are positioned
    setTimeout(drawFlows, 100);
  }

  function draw() {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    frame++;

    // Draw neural connections
    ctx.beginPath();
    ctx.lineWidth = 0.4;
    for (let i = 0; i < brainPoints.length; i += 5) {
      for (let j = i + 1; j < brainPoints.length; j += 15) {
        const dx = brainPoints[i].x - brainPoints[j].x;
        const dy = brainPoints[i].y - brainPoints[j].y;
        const dist = dx * dx + dy * dy;
        if (dist < 1200) {
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 1200)})`;
          ctx.moveTo(brainPoints[i].x, brainPoints[i].y);
          ctx.lineTo(brainPoints[j].x, brainPoints[j].y);
        }
      }
    }
    ctx.stroke();

    // Draw and animate brain points
    brainPoints.forEach((p, i) => {
      const offset = Math.sin(frame * p.pulseSpeed + i) * 1.5;
      p.x = p.origX + offset;
      p.y = p.origY + Math.cos(frame * p.pulseSpeed + i) * 1.2;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;

      // Random sparkle effect
      if (Math.random() > 0.994) {
        ctx.fillStyle = "#fff";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#a78bfa";
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    animationId = requestAnimationFrame(draw);
  }

  function handleResize() {
    init();
  }

  onMount(() => {
    init();
    draw();

    const earningsInterval = setInterval(() => {
      earnings += Math.random() * 0.1;
    }, 1800);

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      clearInterval(earningsInterval);
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  });

  onDestroy(() => {
    if (animationId) cancelAnimationFrame(animationId);
  });
</script>

<div
  bind:this={containerRef}
  class="relative w-full h-full p-0 overflow-hidden {className}"
>
  <!-- Global Flow SVG -->
  <svg
    bind:this={svgRef}
    class="absolute inset-0 w-full h-full pointer-events-none z-0"
  ></svg>

  <div class="relative z-10 h-full flex">
    <!-- LEFT: Feedback Loop - Human Direct + Social Sources -->
    <div
      bind:this={socialNodesRef}
      class="w-1/4 p-8 flex flex-col justify-center gap-4 border-r border-cosmic-500/10"
    >
      <div class="mb-2">
        <h3
          class="text-[10px] tracking-[0.4em] uppercase text-cosmic-400 font-bold"
        >
          Feedback Loop
        </h3>
        <div class="h-[1px] w-12 bg-cosmic-500/40 mt-1"></div>
      </div>

      <!-- Social Nodes (Passive Ingestion) -->
      <div class="grid grid-cols-3 gap-3 mb-4 opacity-60">
        {#each [{ id: "fb", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }, { id: "ig", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }, { id: "x", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }] as item}
          <div class="social-node" data-id={item.id}>
            <svg
              class="w-4 h-4 text-cosmic-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d={item.path} />
            </svg>
          </div>
        {/each}
      </div>

      <!-- Human Origin: Direct Link to Twin -->
      <div bind:this={humanOriginRef} class="human-node">
        <div class="pulse-ring"></div>
        <div class="pulse-ring" style="animation-delay: 1.5s;"></div>
        <div class="flex items-center gap-3 mb-2 relative z-10">
          <div
            class="w-9 h-9 rounded-full bg-cosmic-500/20 flex items-center justify-center border border-cosmic-400/50"
          >
            <svg
              class="w-4 h-4 text-cosmic-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <p
              class="text-[9px] font-bold text-cosmic-400 uppercase tracking-widest"
            >
              Active Human
            </p>
            <p class="text-[7px] text-ethereal-400 uppercase font-mono">
              Status: Direct Uplink
            </p>
          </div>
        </div>
        <div class="space-y-1 mt-2 relative z-10">
          <div
            class="flex justify-between text-[7px] text-void-400 uppercase tracking-tight"
          >
            <span>Direct Cognitive Response</span>
            <span class="text-cosmic-400 font-bold">12ms Latency</span>
          </div>
          <div class="h-0.5 w-full bg-void-700 rounded-full overflow-hidden">
            <div
              class="h-full bg-cosmic-400 w-full animate-pulse shadow-glow-sm"
            ></div>
          </div>
          <p class="text-[7px] text-void-400 italic mt-1 leading-tight">
            "Supplying definitive answers and intent vectors directly to the
            Twin Core."
          </p>
        </div>
      </div>

      <!-- Interface Integrity -->
      <div class="stat-card mt-2">
        <p
          class="text-[8px] text-void-500 uppercase font-bold tracking-widest mb-2"
        >
          Interface Integrity
        </p>
        <div class="h-1.5 w-full bg-void-800 rounded-full overflow-hidden">
          <div class="h-full bg-ethereal-500 w-[98%]"></div>
        </div>
      </div>
    </div>

    <!-- CENTER: Neural Brain + Earnings -->
    <div class="w-1/2 relative flex flex-col items-center justify-center pt-8">
      <!-- Neural glow background -->
      <div class="neural-glow"></div>

      <!-- Neural input/output points -->
      <div bind:this={neuralInRef} class="neural-port left-12"></div>
      <div bind:this={neuralOutRef} class="neural-port right-12"></div>

      <!-- Brain Canvas -->
      <canvas bind:this={canvasRef} class="w-full h-2/3 z-10"></canvas>

      <!-- Earnings Display -->
      <div class="z-20 mt-[-40px] flex flex-col items-center">
        <div class="earnings-display mb-6">
          <p
            class="text-[9px] text-ethereal-400/70 uppercase font-bold tracking-[0.3em] mb-1 text-center"
          >
            Cumulative Neural Income
          </p>
          <div class="flex items-baseline justify-center gap-1">
            <span class="text-xs text-ethereal-400/50 font-mono">$</span>
            <h2 class="text-3xl font-mono font-bold text-ethereal-400">
              {earnings.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
        </div>

        <div class="text-center">
          <p
            class="text-[9px] tracking-[0.5em] text-cosmic-400 uppercase font-semibold"
          >
            Human Digital Twin
          </p>
          <p class="text-[7px] text-void-500 uppercase mt-1">
            Cognitive Synchronization Active
          </p>
        </div>
      </div>
    </div>

    <!-- RIGHT: Strategic Processing -->
    <div
      bind:this={strategyCardsRef}
      class="w-1/4 p-8 flex flex-col justify-center gap-4 border-l border-ethereal-500/10"
    >
      <div class="mb-2 text-right">
        <h3
          class="text-[10px] tracking-[0.4em] uppercase text-ethereal-400 font-bold"
        >
          Strategic Processing
        </h3>
        <div class="h-[1px] w-12 bg-ethereal-500/40 mt-1 ml-auto"></div>
      </div>

      <div class="strategy-card">
        <div class="scanning-line"></div>
        <div class="flex items-start justify-between relative z-10">
          <div>
            <p
              class="text-[10px] font-bold text-ethereal-400 uppercase tracking-wider mb-1"
            >
              Market Research
            </p>
            <p class="text-[8px] text-void-400 leading-tight">
              Analyzing trend vectors & global sentiment metrics.
            </p>
          </div>
          <svg
            class="w-4 h-4 text-ethereal-400/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </div>

      <div class="strategy-card">
        <div class="flex items-start justify-between">
          <div>
            <p
              class="text-[10px] font-bold text-ethereal-400 uppercase tracking-wider mb-1"
            >
              Scenario Simulation
            </p>
            <p class="text-[8px] text-void-400 leading-tight">
              Running 10k Monte Carlo path optimizations.
            </p>
          </div>
          <svg
            class="w-4 h-4 text-ethereal-400/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        </div>
      </div>

      <div class="strategy-card">
        <div class="flex items-start justify-between">
          <div>
            <p
              class="text-[10px] font-bold text-ethereal-400 uppercase tracking-wider mb-1"
            >
              Brainstorming
            </p>
            <p class="text-[8px] text-void-400 leading-tight">
              Neural associative mapping for new IP concepts.
            </p>
          </div>
          <svg
            class="w-4 h-4 text-ethereal-400/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2"
          >
            <path
              d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"
            />
            <path d="M9 18h6" />
            <path d="M10 22h4" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  :global(.flow-line) {
    fill: none;
    stroke-dasharray: 5, 5;
    animation: flow-move 30s linear infinite;
  }

  @keyframes flow-move {
    to {
      stroke-dashoffset: -200;
    }
  }

  .social-node {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(99, 102, 241, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
  }

  .social-node:hover {
    border-color: rgba(99, 102, 241, 0.5);
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
    transform: scale(1.05);
  }

  .human-node {
    background: linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.08),
      rgba(99, 102, 241, 0.03)
    );
    border: 1px solid rgba(99, 102, 241, 0.25);
    border-radius: 1rem;
    padding: 1rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.1);
  }

  .pulse-ring {
    position: absolute;
    inset: 0;
    border: 1px solid rgba(99, 102, 241, 0.4);
    border-radius: inherit;
    animation: ring-pulse 4s cubic-bezier(0.24, 0, 0.38, 1) infinite;
    opacity: 0;
  }

  @keyframes ring-pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }

  .stat-card {
    background: rgba(15, 23, 42, 0.5);
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .neural-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
    filter: blur(60px);
    background: radial-gradient(
      circle,
      rgba(99, 102, 241, 0.12) 0%,
      transparent 70%
    );
    animation: neural-pulse 6s ease-in-out infinite;
  }

  @keyframes neural-pulse {
    0%,
    100% {
      opacity: 0.4;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      opacity: 0.7;
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  .neural-port {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 1px solid rgba(99, 102, 241, 0.2);
    background: rgba(99, 102, 241, 0.05);
  }

  .neural-port.left-12 {
    left: 3rem;
  }

  .neural-port.right-12 {
    right: 3rem;
  }

  .strategy-card {
    background: rgba(45, 212, 191, 0.03);
    border: 1px solid rgba(45, 212, 191, 0.15);
    border-radius: 1rem;
    padding: 1rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .strategy-card:hover {
    border-color: rgba(45, 212, 191, 0.4);
    background: rgba(45, 212, 191, 0.06);
    transform: translateX(-5px);
  }

  .scanning-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(45, 212, 191, 0.6),
      transparent
    );
    animation: scan 3s linear infinite;
  }

  @keyframes scan {
    0% {
      top: 0%;
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      top: 100%;
      opacity: 0;
    }
  }

  .earnings-display {
    background: rgba(45, 212, 191, 0.05);
    border: 1px solid rgba(45, 212, 191, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 1.5rem;
    padding: 1rem 2rem;
    box-shadow: 0 0 30px rgba(45, 212, 191, 0.08);
  }

  canvas {
    filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.15));
  }

  /* App color integration */
  .text-cosmic-400 {
    color: #a78bfa;
  }

  .text-ethereal-400 {
    color: #2dd4bf;
  }

  .text-void-400 {
    color: #94a3b8;
  }

  .text-void-500 {
    color: #64748b;
  }

  .bg-cosmic-500\/20 {
    background-color: rgba(99, 102, 241, 0.2);
  }

  .border-cosmic-400\/50 {
    border-color: rgba(129, 140, 248, 0.5);
  }

  .border-cosmic-500\/10 {
    border-color: rgba(99, 102, 241, 0.1);
  }

  .border-ethereal-500\/10 {
    border-color: rgba(20, 184, 166, 0.1);
  }

  .bg-void-700 {
    background-color: #334155;
  }

  .bg-void-800 {
    background-color: #1e293b;
  }

  .bg-ethereal-500 {
    background-color: #14b8a6;
  }

  .bg-cosmic-400 {
    background-color: #a78bfa;
  }

  .shadow-glow-sm {
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
  }
</style>
