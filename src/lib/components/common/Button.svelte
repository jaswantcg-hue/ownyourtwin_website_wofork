<!--
  Button Component
  A versatile button with multiple variants, sizes, and states
  Supports icons, loading states, and full customization
-->
<script lang="ts">
  import { goto } from '$app/navigation';
  import type { Snippet } from 'svelte';

  // Props
  interface Props {
    /** Button variant style */
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
    /** Button size */
    size?: 'sm' | 'md' | 'lg';
    /** Full width button */
    fullWidth?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Loading state - shows spinner */
    loading?: boolean;
    /** Button type attribute */
    type?: 'button' | 'submit' | 'reset';
    /** Optional href to make button a link */
    href?: string;
    /** Additional CSS classes */
    class?: string;
    /** Click handler */
    onclick?: (event: MouseEvent) => void;
    /** Button content */
    children?: Snippet;
    /** Icon slot (left side) */
    icon?: Snippet;
  }

  let {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    loading = false,
    type = 'button',
    href,
    class: className = '',
    onclick,
    children,
    icon,
  }: Props = $props();

  // Compute button classes based on props
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-xl
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-void-950
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-cosmic-600 to-cosmic-500
      hover:from-cosmic-500 hover:to-cosmic-400
      text-white shadow-glow-sm hover:shadow-glow
      focus:ring-cosmic-500
    `,
    secondary: `
      bg-void-800 hover:bg-void-700
      text-white border border-void-600
      focus:ring-void-500
    `,
    ghost: `
      bg-transparent hover:bg-void-800/50
      text-void-200 hover:text-white
      focus:ring-void-500
    `,
    danger: `
      bg-red-600 hover:bg-red-500
      text-white
      focus:ring-red-500
    `,
    outline: `
      bg-transparent border-2 border-cosmic-500
      text-cosmic-400 hover:bg-cosmic-500/10
      hover:text-cosmic-300
      focus:ring-cosmic-500
    `,
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  };

  let computedClasses = $derived(
    `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`
  );

  // Handle navigation for href links
  function handleNavigation(e: MouseEvent) {
    e.preventDefault();
    if (href && !loading && !disabled) {
      goto(href);
    }
  }
</script>

{#if href && !disabled}
  <a
    {href}
    class={computedClasses}
    class:pointer-events-none={loading}
    onclick={handleNavigation}
  >
    {#if loading}
      <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {:else if icon}
      {@render icon()}
    {/if}
    {#if children}
      {@render children()}
    {/if}
  </a>
{:else}
  <button
    {type}
    disabled={disabled || loading}
    class={computedClasses}
    onclick={onclick}
  >
    {#if loading}
      <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {:else if icon}
      {@render icon()}
    {/if}
    {#if children}
      {@render children()}
    {/if}
  </button>
{/if}
