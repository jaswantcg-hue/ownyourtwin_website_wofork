<!--
  Tabs Component
  Navigation tabs with animated indicator and content panels
-->
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface TabItem {
    id: string;
    label: string;
    icon?: string;
    badge?: string | number;
    disabled?: boolean;
  }

  interface Props {
    /** Tab items configuration */
    tabs: TabItem[];
    /** Currently active tab ID */
    activeTab?: string;
    /** Tab style variant */
    variant?: 'default' | 'pills' | 'underline';
    /** Full width tabs */
    fullWidth?: boolean;
    /** Additional CSS classes */
    class?: string;
    /** Tab change handler */
    onchange?: (tabId: string) => void;
    /** Tab content snippets (keyed by tab ID) */
    children?: Snippet<[string]>;
  }

  let {
    tabs,
    activeTab = $bindable(tabs[0]?.id || ''),
    variant = 'default',
    fullWidth = false,
    class: className = '',
    onchange,
    children,
  }: Props = $props();

  // Handle tab selection
  function selectTab(tabId: string) {
    if (tabs.find(t => t.id === tabId)?.disabled) return;
    activeTab = tabId;
    onchange?.(tabId);
  }

  // Variant classes for tab buttons
  const getTabClasses = (tab: TabItem) => {
    const isActive = tab.id === activeTab;
    const isDisabled = tab.disabled;

    const baseClasses = `
      relative flex items-center gap-2 px-4 py-2.5
      font-medium transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-cosmic-500/50
      ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${fullWidth ? 'flex-1 justify-center' : ''}
    `;

    const variantStyles = {
      default: isActive
        ? 'text-white bg-void-700/80 rounded-lg'
        : 'text-void-400 hover:text-void-200 hover:bg-void-800/50 rounded-lg',
      pills: isActive
        ? 'text-white bg-cosmic-600 rounded-full shadow-glow-sm'
        : 'text-void-400 hover:text-white hover:bg-void-800 rounded-full',
      underline: isActive
        ? 'text-cosmic-400 border-b-2 border-cosmic-500'
        : 'text-void-400 hover:text-void-200 border-b-2 border-transparent',
    };

    return `${baseClasses} ${variantStyles[variant]}`;
  };
</script>

<div class={className}>
  <!-- Tab list -->
  <div
    class="
      flex {fullWidth ? '' : 'gap-1'}
      {variant === 'underline' ? 'border-b border-void-700' : 'p-1 bg-void-800/50 rounded-xl'}
    "
    role="tablist"
    aria-label="Tabs"
  >
    {#each tabs as tab (tab.id)}
      <button
        role="tab"
        aria-selected={tab.id === activeTab}
        aria-controls="panel-{tab.id}"
        id="tab-{tab.id}"
        tabindex={tab.id === activeTab ? 0 : -1}
        disabled={tab.disabled}
        class={getTabClasses(tab)}
        onclick={() => selectTab(tab.id)}
      >
        <!-- Icon placeholder - would use actual icon component -->
        {#if tab.icon}
          <span class="w-5 h-5 flex items-center justify-center opacity-70">
            <!-- Icon SVG based on tab.icon -->
            {#if tab.icon === 'message-circle'}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            {:else if tab.icon === 'layout-dashboard'}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            {:else if tab.icon === 'compass'}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9l6 6M15 9l-6 6" />
              </svg>
            {/if}
          </span>
        {/if}

        <span>{tab.label}</span>

        <!-- Badge -->
        {#if tab.badge !== undefined}
          <span class="
            ml-1 px-2 py-0.5 text-xs font-medium rounded-full
            bg-cosmic-500/20 text-cosmic-400
          ">
            {tab.badge}
          </span>
        {/if}
      </button>
    {/each}
  </div>

  <!-- Tab panels -->
  {#if children}
    <div class="mt-4">
      {#each tabs as tab (tab.id)}
        <div
          id="panel-{tab.id}"
          role="tabpanel"
          aria-labelledby="tab-{tab.id}"
          hidden={tab.id !== activeTab}
          class={tab.id === activeTab ? 'animate-fade-in' : ''}
        >
          {#if tab.id === activeTab}
            {@render children(tab.id)}
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.2s ease-out;
  }
</style>
