<!--
  Avatar Component
  Displays user avatar with fallback to initials
-->
<script lang="ts">
  import { getInitials } from '$lib/utils';

  interface Props {
    /** Image source URL */
    src?: string;
    /** User name for initials fallback */
    name?: string;
    /** Alt text for image */
    alt?: string;
    /** Avatar size */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    /** Show status indicator */
    status?: 'online' | 'offline' | 'away' | 'busy' | null;
    /** Make it a ring/border style */
    ring?: boolean;
    /** Additional CSS classes */
    class?: string;
  }

  let {
    src,
    name = '',
    alt,
    size = 'md',
    status = null,
    ring = false,
    class: className = '',
  }: Props = $props();

  // Size classes
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-24 h-24 text-2xl',
  };

  // Status indicator classes
  const statusClasses = {
    online: 'bg-emerald-500',
    offline: 'bg-void-500',
    away: 'bg-amber-500',
    busy: 'bg-red-500',
  };

  // Status indicator size classes
  const statusSizeClasses = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
    '2xl': 'w-5 h-5',
  };

  // Compute initials
  const initials = $derived(getInitials(name));

  // Image load state
  let imageError = $state(false);

  function handleImageError() {
    imageError = true;
  }
</script>

<div class="relative inline-flex {className}">
  <div
    class="
      relative rounded-full overflow-hidden
      flex items-center justify-center
      bg-gradient-to-br from-cosmic-600 to-cosmic-800
      {sizeClasses[size]}
      {ring ? 'ring-2 ring-cosmic-500/50 ring-offset-2 ring-offset-void-900' : ''}
    "
  >
    {#if src && !imageError}
      <img
        {src}
        alt={alt || name || 'Avatar'}
        class="w-full h-full object-cover"
        onerror={handleImageError}
      />
    {:else}
      <span class="font-medium text-white select-none">
        {initials || '?'}
      </span>
    {/if}
  </div>

  <!-- Status indicator -->
  {#if status}
    <span
      class="
        absolute bottom-0 right-0
        rounded-full border-2 border-void-900
        {statusClasses[status]}
        {statusSizeClasses[size]}
      "
      aria-label="{status} status"
    ></span>
  {/if}
</div>
