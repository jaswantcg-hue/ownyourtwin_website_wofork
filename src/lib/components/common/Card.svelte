<!--
  Card Component
  A flexible container with various styles and hover effects
-->
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Card variant style */
    variant?: 'default' | 'elevated' | 'glass' | 'glow' | 'outline';
    /** Enable hover effect */
    hoverable?: boolean;
    /** Padding size */
    padding?: 'none' | 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    class?: string;
    /** Click handler */
    onclick?: (event: MouseEvent) => void;
    /** Card content */
    children?: Snippet;
    /** Header slot */
    header?: Snippet;
    /** Footer slot */
    footer?: Snippet;
  }

  let {
    variant = 'default',
    hoverable = false,
    padding = 'md',
    class: className = '',
    onclick,
    children,
    header,
    footer,
  }: Props = $props();

  // Base classes
  const baseClasses = 'rounded-2xl transition-all duration-300';

  // Variant classes
  const variantClasses = {
    default: 'bg-void-800/80 border border-void-700',
    elevated: 'bg-void-800 shadow-xl shadow-void-950/50',
    glass: 'bg-void-800/40 backdrop-blur-xl border border-void-600/30',
    glow: 'bg-void-800/80 border border-cosmic-500/30 shadow-glow-sm',
    outline: 'bg-transparent border-2 border-void-600',
  };

  // Hover classes
  const hoverClasses = hoverable
    ? 'cursor-pointer hover:border-cosmic-500/50 hover:shadow-glow hover:-translate-y-1'
    : '';

  // Padding classes
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  let computedClasses = $derived(
    `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`
  );
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  class={computedClasses}
  onclick={onclick}
  role={onclick ? 'button' : undefined}
  tabindex={onclick ? 0 : undefined}
>
  <!-- Header -->
  {#if header}
    <div class="px-6 py-4 border-b border-void-700/50">
      {@render header()}
    </div>
  {/if}

  <!-- Content -->
  <div class={paddingClasses[padding]}>
    {#if children}
      {@render children()}
    {/if}
  </div>

  <!-- Footer -->
  {#if footer}
    <div class="px-6 py-4 border-t border-void-700/50 bg-void-800/50 rounded-b-2xl">
      {@render footer()}
    </div>
  {/if}
</div>
