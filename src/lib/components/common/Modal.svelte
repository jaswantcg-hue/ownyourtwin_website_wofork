<!--
  Modal Component
  A dialog overlay with customizable content, animations, and close behavior
-->
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Whether modal is open */
    open?: boolean;
    /** Modal title */
    title?: string;
    /** Modal size */
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    /** Show close button */
    showClose?: boolean;
    /** Close on backdrop click */
    closeOnBackdrop?: boolean;
    /** Close on escape key */
    closeOnEscape?: boolean;
    /** Additional CSS classes for content */
    class?: string;
    /** Close handler */
    onclose?: () => void;
    /** Modal content */
    children?: Snippet;
    /** Footer slot */
    footer?: Snippet;
  }

  let {
    open = $bindable(false),
    title,
    size = 'md',
    showClose = true,
    closeOnBackdrop = true,
    closeOnEscape = true,
    class: className = '',
    onclose,
    children,
    footer,
  }: Props = $props();

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-4xl',
  };

  // Close modal handler
  function handleClose() {
    open = false;
    onclose?.();
  }

  // Handle backdrop click
  function handleBackdropClick(event: MouseEvent) {
    if (closeOnBackdrop && event.target === event.currentTarget) {
      handleClose();
    }
  }

  // Handle escape key
  function handleKeydown(event: KeyboardEvent) {
    if (closeOnEscape && event.key === 'Escape' && open) {
      handleClose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4
           bg-void-950/80 backdrop-blur-sm
           animate-fade-in"
    onclick={handleBackdropClick}
  >
    <!-- Modal content -->
    <div
      class="relative w-full {sizeClasses[size]} max-h-[90vh]
             bg-void-900 border border-void-700
             rounded-2xl shadow-2xl shadow-void-950
             animate-scale-in overflow-hidden
             {className}"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <!-- Header -->
      {#if title || showClose}
        <div class="flex items-center justify-between px-6 py-4 border-b border-void-700">
          {#if title}
            <h2 id="modal-title" class="text-xl font-semibold text-white">
              {title}
            </h2>
          {:else}
            <div></div>
          {/if}

          {#if showClose}
            <button
              onclick={handleClose}
              class="p-2 rounded-lg text-void-400 hover:text-white
                     hover:bg-void-700 transition-colors"
              aria-label="Close modal"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          {/if}
        </div>
      {/if}

      <!-- Body -->
      <div class="px-6 py-6 overflow-y-auto max-h-[calc(90vh-180px)]">
        {#if children}
          {@render children()}
        {/if}
      </div>

      <!-- Footer -->
      {#if footer}
        <div class="px-6 py-4 border-t border-void-700 bg-void-800/50">
          {@render footer()}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.2s ease-out;
  }

  .animate-scale-in {
    animation: scaleIn 0.2s ease-out;
  }
</style>
