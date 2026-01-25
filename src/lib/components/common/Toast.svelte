<!--
  Toast Notification Component
  Displays temporary notifications with different severity levels
-->
<script lang="ts">
  import { uiStore, activeToasts } from '$lib/stores';

  // Icon paths for each toast type
  const icons = {
    success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  };

  // Color classes for each toast type
  const colorClasses = {
    success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  };

  const iconColorClasses = {
    success: 'text-emerald-500',
    error: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-blue-500',
  };
</script>

<!-- Toast container - fixed position -->
<div
  class="fixed bottom-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none"
  aria-live="polite"
>
  {#each $activeToasts as toast (toast.id)}
    <div
      class="
        pointer-events-auto
        flex items-start gap-3 p-4 rounded-xl
        border backdrop-blur-sm
        shadow-lg shadow-void-950/50
        animate-slide-up
        min-w-[300px] max-w-[400px]
        {colorClasses[toast.type]}
      "
      role="alert"
    >
      <!-- Icon -->
      <svg
        class="w-5 h-5 flex-shrink-0 mt-0.5 {iconColorClasses[toast.type]}"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d={icons[toast.type]}
        />
      </svg>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <p class="font-medium text-white">{toast.title}</p>
        {#if toast.message}
          <p class="mt-1 text-sm opacity-80">{toast.message}</p>
        {/if}
      </div>

      <!-- Dismiss button -->
      {#if toast.dismissible}
        <button
          onclick={() => uiStore.dismissToast(toast.id)}
          class="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Dismiss notification"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      {/if}
    </div>
  {/each}
</div>

<style>
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }
</style>
