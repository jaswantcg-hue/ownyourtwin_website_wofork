<!--
  Input Component
  A styled text input with label, error handling, and icons
-->
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** Input type */
    type?: 'text' | 'email' | 'password' | 'search' | 'number' | 'tel' | 'url';
    /** Input name attribute */
    name?: string;
    /** Input placeholder */
    placeholder?: string;
    /** Input value (bindable) */
    value?: string;
    /** Label text */
    label?: string;
    /** Error message */
    error?: string;
    /** Helper text below input */
    helper?: string;
    /** Disabled state */
    disabled?: boolean;
    /** Required field */
    required?: boolean;
    /** Autocomplete attribute */
    autocomplete?: string;
    /** Additional CSS classes */
    class?: string;
    /** Icon slot (left side) */
    icon?: Snippet;
    /** Input event handler */
    oninput?: (event: Event) => void;
    /** Change event handler */
    onchange?: (event: Event) => void;
    /** Focus event handler */
    onfocus?: (event: FocusEvent) => void;
    /** Blur event handler */
    onblur?: (event: FocusEvent) => void;
  }

  let {
    type = 'text',
    name,
    placeholder,
    value = $bindable(''),
    label,
    error,
    helper,
    disabled = false,
    required = false,
    autocomplete,
    class: className = '',
    icon,
    oninput,
    onchange,
    onfocus,
    onblur,
  }: Props = $props();

  // Generate unique ID for label association
  const inputId = `input-${Math.random().toString(36).slice(2, 9)}`;

  // Compute input classes
  const inputClasses = $derived(`
    w-full px-4 py-3 rounded-xl
    bg-void-800/50 border
    text-white placeholder-void-400
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:opacity-50 disabled:cursor-not-allowed
    ${icon ? 'pl-11' : ''}
    ${error
      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
      : 'border-void-600 focus:border-cosmic-500 focus:ring-cosmic-500/20'
    }
    ${className}
  `);
</script>

<div class="w-full">
  <!-- Label -->
  {#if label}
    <label
      for={inputId}
      class="block text-sm font-medium text-void-200 mb-2"
    >
      {label}
      {#if required}
        <span class="text-cosmic-400 ml-1">*</span>
      {/if}
    </label>
  {/if}

  <!-- Input wrapper -->
  <div class="relative">
    <!-- Icon -->
    {#if icon}
      <div class="absolute left-3 top-1/2 -translate-y-1/2 text-void-400 pointer-events-none">
        {@render icon()}
      </div>
    {/if}

    <!-- Input element -->
    <input
      id={inputId}
      {type}
      {name}
      {placeholder}
      {disabled}
      {required}
      autocomplete={autocomplete as 'on' | 'off' | undefined}
      bind:value
      {oninput}
      {onchange}
      {onfocus}
      {onblur}
      class={inputClasses}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
    />
  </div>

  <!-- Error message -->
  {#if error}
    <p id="{inputId}-error" class="mt-2 text-sm text-red-400 flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {error}
    </p>
  {:else if helper}
    <p id="{inputId}-helper" class="mt-2 text-sm text-void-400">
      {helper}
    </p>
  {/if}
</div>
