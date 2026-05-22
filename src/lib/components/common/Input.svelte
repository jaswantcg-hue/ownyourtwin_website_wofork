<!--
  Input Component
  Light theme — Montserrat label, Lora input text, clay focus ring
-->
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    type?: 'text' | 'email' | 'password' | 'search' | 'number' | 'tel' | 'url';
    name?: string;
    placeholder?: string;
    value?: string;
    label?: string;
    error?: string;
    helper?: string;
    disabled?: boolean;
    required?: boolean;
    autocomplete?: string;
    class?: string;
    icon?: Snippet;
    oninput?: (event: Event) => void;
    onchange?: (event: Event) => void;
    onfocus?: (event: FocusEvent) => void;
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

  const inputId = `input-${Math.random().toString(36).slice(2, 9)}`;
</script>

<div style="width:100%;">
  {#if label}
    <label
      for={inputId}
      style="display:block; font-family:'Montserrat',sans-serif; font-size:0.82rem; font-weight:600; color:#555555; margin-bottom:8px;"
    >
      {label}
      {#if required}<span style="color:#c4856a; margin-left:2px;">*</span>{/if}
    </label>
  {/if}

  <div style="position:relative;">
    {#if icon}
      <div style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:#aaaaaa; pointer-events:none; display:flex; align-items:center;">
        {@render icon()}
      </div>
    {/if}

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
      style="
        width:100%;
        padding:12px 16px;
        padding-left:{icon ? '44px' : '16px'};
        border-radius:10px;
        border:1.5px solid {error ? '#f87171' : '#e0e0e0'};
        background:#f8f8f6;
        color:#111111;
        font-family:'Lora',serif;
        font-size:0.9rem;
        line-height:1.5;
        outline:none;
        transition:border-color 0.2s;
        box-sizing:border-box;
        opacity:{disabled ? '0.5' : '1'};
        cursor:{disabled ? 'not-allowed' : 'text'};
      "
      onfocus={(e) => {
        if (!error) (e.currentTarget as HTMLInputElement).style.borderColor = '#c4856a';
        onfocus?.(e);
      }}
      onblur={(e) => {
        if (!error) (e.currentTarget as HTMLInputElement).style.borderColor = '#e0e0e0';
        onblur?.(e);
      }}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
      class={className}
    />
  </div>

  {#if error}
    <p id="{inputId}-error" style="margin-top:6px; font-family:'Montserrat',sans-serif; font-size:0.78rem; color:#ef4444; display:flex; align-items:center; gap:4px;">
      <svg style="width:13px;height:13px;flex-shrink:0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      {error}
    </p>
  {:else if helper}
    <p id="{inputId}-helper" style="margin-top:6px; font-family:'Lora',serif; font-size:0.78rem; color:#aaaaaa;">{helper}</p>
  {/if}
</div>
