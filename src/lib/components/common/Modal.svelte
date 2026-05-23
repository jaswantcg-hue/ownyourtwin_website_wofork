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
    class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
    style="background:rgba(0,0,0,0.5); backdrop-filter:blur(6px);"
    onclick={handleBackdropClick}
  >
    <!-- Modal content -->
    <div
      class="relative w-full {sizeClasses[size]} max-h-[90vh] animate-scale-in overflow-hidden {className}"
      style="background:#ffffff; border:1px solid #e0e0e0; border-radius:18px; box-shadow:0 24px 64px rgba(0,0,0,0.15);"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <!-- Header -->
      {#if title || showClose}
        <div style="display:flex; align-items:center; justify-content:space-between; padding:20px 24px; border-bottom:1px solid #f0f0f0;">
          {#if title}
            <h2 id="modal-title" style="font-family:'Montserrat',sans-serif; font-size:1.15rem; font-weight:700; color:#111111; margin:0;">
              {title}
            </h2>
          {:else}
            <div></div>
          {/if}
          {#if showClose}
            <button
              onclick={handleClose}
              style="width:32px; height:32px; border-radius:8px; border:none; background:transparent; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s;"
              onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background='#f0f0f0'}
              onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background='transparent'}
              aria-label="Close modal"
            >
              <svg style="width:18px;height:18px;" fill="none" stroke="#888888" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
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
        <div style="padding:16px 24px; border-top:1px solid #f0f0f0; background:#fafafa;">
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
