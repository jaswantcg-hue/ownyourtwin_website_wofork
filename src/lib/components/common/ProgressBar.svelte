<!--
  Progress Bar Component
  Animated progress indicator with multiple variants
-->
<script lang="ts">
  interface Props {
    /** Progress value (0-100) */
    value?: number;
    /** Maximum value */
    max?: number;
    /** Show percentage label */
    showLabel?: boolean;
    /** Progress bar size */
    size?: 'sm' | 'md' | 'lg';
    /** Variant style */
    variant?: 'default' | 'gradient' | 'glow' | 'striped';
    /** Indeterminate/loading state */
    indeterminate?: boolean;
    /** Animate the progress */
    animated?: boolean;
    /** Label text (overrides percentage) */
    label?: string;
    /** Additional CSS classes */
    class?: string;
  }

  let {
    value = 0,
    max = 100,
    showLabel = false,
    size = 'md',
    variant = 'default',
    indeterminate = false,
    animated = true,
    label,
    class: className = '',
  }: Props = $props();

  // Calculate percentage
  const percentage = $derived(Math.min(Math.max((value / max) * 100, 0), 100));

  // Size classes
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  // Variant classes for the progress fill
  const variantClasses = {
    default: 'bg-cosmic-500',
    gradient: 'bg-gradient-to-r from-cosmic-600 via-cosmic-500 to-ethereal-500',
    glow: 'bg-cosmic-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]',
    striped: 'bg-cosmic-500 bg-stripes',
  };
</script>

<div class="w-full {className}">
  <!-- Label row -->
  {#if showLabel}
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm text-void-300">
        {label || 'Progress'}
      </span>
      {#if !indeterminate}
        <span class="text-sm font-medium text-cosmic-400">
          {Math.round(percentage)}%
        </span>
      {/if}
    </div>
  {/if}

  <!-- Progress bar container -->
  <div
    class="
      w-full rounded-full overflow-hidden
      bg-void-700/50 backdrop-blur-sm
      {sizeClasses[size]}
    "
    role="progressbar"
    aria-valuenow={indeterminate ? undefined : value}
    aria-valuemin={0}
    aria-valuemax={max}
  >
    <!-- Progress fill -->
    {#if indeterminate}
      <div
        class="
          h-full rounded-full
          {variantClasses[variant]}
          animate-indeterminate
        "
        style="width: 30%"
      ></div>
    {:else}
      <div
        class="
          h-full rounded-full
          {variantClasses[variant]}
          {animated ? 'transition-all duration-500 ease-out' : ''}
        "
        style="width: {percentage}%"
      ></div>
    {/if}
  </div>
</div>

<style>
  /* Striped pattern */
  .bg-stripes {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
    animation: stripes 1s linear infinite;
  }

  @keyframes stripes {
    from {
      background-position: 1rem 0;
    }
    to {
      background-position: 0 0;
    }
  }

  /* Indeterminate animation */
  @keyframes indeterminate {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(400%);
    }
  }

  .animate-indeterminate {
    animation: indeterminate 1.5s ease-in-out infinite;
  }
</style>
