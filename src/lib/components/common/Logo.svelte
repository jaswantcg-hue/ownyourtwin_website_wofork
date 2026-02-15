<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  interface Props {
    size?: "sm" | "md" | "lg" | "xl";
    showText?: boolean;
    class?: string;
  }

  let { size = "md", showText = true, class: className = "" }: Props = $props();

  let isHovered = $state(false);
  let activeNodes = $state<number[]>([]);
  let interval: ReturnType<typeof setInterval>;

  const theme = {
    bg: "#05070a", // This might need adjustment if used on light bg, but keeping consistent with request
    human: "#6366f1", // Aura Blue
    twin: "#4ade80", // Aura Green
    cyan: "#22d3ee",
    white: "#ffffff",
  };

  onMount(() => {
    interval = setInterval(() => {
      const nodes = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * 12),
      );
      activeNodes = nodes;
    }, 800);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl",
  };
</script>

<div
  class="flex items-center gap-3 group cursor-pointer {className}"
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  role="button"
  tabindex="0"
>
  <!-- Main Logo Container -->
  <div class="relative {sizeClasses[size]}">
    <!-- Background Neural Glow -->
    <div
      class="absolute inset-0 bg-indigo-500/10 blur-[20px] rounded-full transition-opacity duration-1000 {isHovered
        ? 'opacity-100'
        : 'opacity-40'}"
    ></div>

    <svg
      viewBox="0 0 200 200"
      class="w-full h-full relative z-10 overflow-visible"
    >
      <defs>
        <filter id="neon-{size}" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <linearGradient
          id="brainGrad-{size}"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stop-color={theme.human} />
          <stop offset="100%" stop-color={theme.cyan} />
        </linearGradient>
      </defs>

      <!-- LEFT HALF: THE SOVEREIGN MIND (Solid/Structural) -->
      <path
        d="M100 35 
           C70 35, 40 60, 40 100 
           C40 140, 70 165, 100 165
           L100 145
           C80 145, 60 125, 60 100
           C60 75, 80 55, 100 55
           Z"
        fill="url(#brainGrad-{size})"
        class="transition-all duration-700"
        style:filter={isHovered ? `url(#neon-${size})` : "none"}
        style:opacity={0.9}
        style:transform={isHovered ? "translateX(-5px)" : "none"}
      />

      <!-- RIGHT HALF: THE DIGITAL TWIN (Neural Mesh/Nodes) -->
      <g
        class="transition-all duration-700"
        style:transform={isHovered ? "translateX(5px)" : "none"}
      >
        <!-- Mesh Connections -->
        <path
          d="M100 35 C140 35, 170 60, 170 100 C170 140, 140 165, 100 165"
          stroke={theme.twin}
          stroke-width="1.5"
          stroke-dasharray="4 4"
          fill="none"
          class="opacity-30"
        />

        <!-- Neural Nodes (Strategic Processing Points) -->
        {#each Array(12) as _, i}
          {@const angle = (i / 11) * Math.PI - Math.PI / 2}
          {@const r = 65}
          {@const cx = 100 + Math.cos(angle) * r}
          {@const cy = 100 + Math.sin(angle) * r}
          {@const isActive = activeNodes.includes(i)}
          <g>
            <!-- Connection Line to Core -->
            <line
              x1="100"
              y1="100"
              x2={cx}
              y2={cy}
              stroke={theme.twin}
              stroke-width="0.5"
              class="transition-opacity duration-500 {isActive
                ? 'opacity-40'
                : 'opacity-10'}"
            />
            <!-- The Node -->
            <circle
              {cx}
              {cy}
              r={isActive ? 3 : 1.5}
              fill={isActive ? theme.white : theme.twin}
              style:filter={isActive ? `url(#neon-${size})` : "none"}
              class="transition-all duration-300"
            />
          </g>
        {/each}
      </g>

      <!-- CENTRAL SYNC CORE -->
      <circle
        cx="100"
        cy="100"
        r="15"
        fill={theme.bg}
        stroke={theme.white}
        stroke-width="1"
      />
      <circle
        cx="100"
        cy="100"
        r="6"
        fill={theme.white}
        class="animate-pulse"
        style:filter={`url(#neon-${size})`}
      />
    </svg>
  </div>

  <!-- Typography -->
  {#if showText}
    <div class="flex flex-col justify-center">
      <h1
        class="{textSizes[
          size
        ]} font-bold tracking-tighter text-white leading-none"
      >
        OWN<span class="text-slate-500 font-light">YOUR</span><span
          class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
          >TWIN</span
        >
      </h1>
      {#if size === "xl" || size === "lg"}
        <div class="mt-1 flex items-center gap-2">
          <div class="h-[1px] w-4 bg-indigo-500/20"></div>
          <span
            class="text-[0.6rem] font-medium tracking-[0.2em] text-slate-500 uppercase leading-none"
          >
            The <span class="text-emerald-500/80">Neural</span> Income Protocol
          </span>
          <div class="h-[1px] w-4 bg-emerald-500/20"></div>
        </div>
      {/if}
    </div>
  {/if}
</div>
