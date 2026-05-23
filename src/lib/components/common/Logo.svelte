<!--
  Logo — OwnYourTwin Redesign

-->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  interface Props {
    size?: "sm" | "md" | "lg" | "xl";
    showText?: boolean;
    class?: string;
    invertForDark?: boolean;
  }

  let {
    size = "md",
    showText = true,
    class: className = "",
    invertForDark = false,
  }: Props = $props();

  let isHovered = $state(false);
  let activeNodes = $state<number[]>([]);
  let interval: ReturnType<typeof setInterval>;

  onMount(() => {
    interval = setInterval(() => {
      activeNodes = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 12),
      );
    }, 900);
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });

  const sizeMap = {
    sm: { svg: 32, text: "1.1rem" },
    md: { svg: 40, text: "1.25rem" },
    lg: { svg: 56, text: "1.6rem" },
    xl: { svg: 80, text: "2.2rem" },
  };

  // Colours adapt: normal = black logo, invertForDark = white logo (used in footer)
  const primary = $derived(invertForDark ? "#ffffff" : "#111111");
  const secondary = "#888888";
  const accent = "#c4856a"; // clay — always visible
  const nodeActive = "#c4856a";
</script>

<div
  class="logo-wrap {className}"
  style="display:inline-flex; align-items:center; gap:10px; cursor:pointer;"
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  role="img"
  aria-label="OwnYourTwin"
>
  <!-- SVG mark -->
  <div
    style="width:{sizeMap[size].svg}px; height:{sizeMap[size]
      .svg}px; position:relative; flex-shrink:0;"
  >
    <svg
      viewBox="0 0 200 200"
      style="width:100%; height:100%; overflow:visible;"
    >
      <defs>
        <filter id="soft-{size}" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Outer orbit ring -->
      <circle
        cx="100"
        cy="100"
        r="78"
        fill="none"
        stroke={accent}
        stroke-width="1"
        stroke-dasharray="5 7"
        opacity="0.35"
        style="transition: opacity 0.4s;"
        style:opacity={isHovered ? "0.6" : "0.35"}
      />

      <!-- LEFT HALF — solid arc (the Human / sovereign mind) -->
      <path
        d="M100 22 C62 22, 32 57, 32 100 C32 143, 62 178, 100 178
           L100 158 C73 158, 52 132, 52 100 C52 68, 73 42, 100 42 Z"
        fill={primary}
        style="transition: transform 0.4s ease;"
        style:transform={isHovered ? "translateX(-3px)" : "translateX(0)"}
      />

      <!-- RIGHT HALF — dashed arc (the Digital Twin / neural mesh) -->
      <path
        d="M100 22 C138 22, 168 57, 168 100 C168 143, 138 178, 100 178"
        fill="none"
        stroke={accent}
        stroke-width="14"
        stroke-dasharray="6 6"
        stroke-linecap="round"
        style="transition: transform 0.4s ease, opacity 0.4s;"
        style:transform={isHovered ? "translateX(3px)" : "translateX(0)"}
        style:opacity={isHovered ? "1" : "0.75"}
      />

      <!-- Neural nodes on right arc -->
      {#each Array(8) as _, i}
        {@const angle = (i / 7) * Math.PI - Math.PI / 2}
        {@const r = 78}
        {@const cx = 100 + Math.cos(angle) * r}
        {@const cy = 100 + Math.sin(angle) * r}
        {@const isActive = activeNodes.includes(i)}
        {#if cx >= 100}
          <circle
            {cx}
            {cy}
            r={isActive ? 4 : 2}
            fill={isActive ? nodeActive : secondary}
            opacity={isActive ? 1 : 0.4}
            style="transition: all 0.3s ease;"
          />
        {/if}
      {/each}

      <!-- Central sync dot -->
      <circle
        cx="100"
        cy="100"
        r="8"
        fill={accent}
        opacity="0.9"
        style="transition: r 0.3s ease;"
        style:r={isHovered ? "10" : "8"}
      />
      <circle cx="100" cy="100" r="3" fill={primary} />
    </svg>
  </div>

  <!-- Wordmark -->
  {#if showText}
    <div
      style="display:flex; flex-direction:column; justify-content:center; line-height:1;"
    >
      <span
        style="
        font-family:'Montserrat',sans-serif;
        font-size:{sizeMap[size].text};
        font-weight:800;
        letter-spacing:-0.03em;
        color:{primary};
        white-space:nowrap;
      "
      >
        OWN<span style="font-weight:400; color:{secondary};">YOUR</span><span
          style="color:{accent};">TWIN</span
        >
      </span>
      {#if size === "lg" || size === "xl"}
        <span
          style="
          font-family:'Montserrat',sans-serif;
          font-size:0.58rem;
          font-weight:600;
          letter-spacing:0.2em;
          text-transform:uppercase;
          color:{secondary};
          margin-top:4px;
          opacity:0.7;
        ">Data Sovereignty Platform</span
        >
      {/if}
    </div>
  {/if}
</div>
