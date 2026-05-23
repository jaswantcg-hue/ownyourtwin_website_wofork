<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  interface Props { form: ActionData }
  let { form }: Props = $props();
  let loading = $state(false);
</script>

<svelte:head>
  <title>Admin Login — OwnYourTwin</title>
</svelte:head>

<div style="
  min-height:100vh; display:flex; align-items:center; justify-content:center;
  background:#f8f8f6; font-family:'Montserrat',sans-serif;
">
  <div style="
    width:100%; max-width:380px; background:#ffffff;
    border-radius:16px; border:1px solid #e0e0e0;
    box-shadow:0 8px 32px rgba(0,0,0,0.07); padding:40px 36px;
  ">
    <!-- Logo mark -->
    <div style="text-align:center; margin-bottom:28px;">
      <div style="
        width:52px; height:52px; border-radius:14px;
        background:#111111; display:inline-flex;
        align-items:center; justify-content:center; margin-bottom:16px;
      ">
        <svg width="26" height="26" fill="none" stroke="#ffffff" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944
               a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9
               c0 5.591 3.824 10.29 9 11.622
               5.176-1.332 9-6.03 9-11.622
               0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
      </div>
      <h1 style="font-size:1.3rem; font-weight:800; color:#111111; margin:0 0 4px;">Admin Portal</h1>
      <p style="font-size:0.82rem; color:#aaaaaa; margin:0; font-family:'Lora',serif; font-style:italic;">OwnYourTwin dashboard access</p>
    </div>

    {#if form?.error}
      <div style="
        background:#fff0ee; border:1px solid #f8c9c2; border-radius:8px;
        padding:10px 14px; margin-bottom:20px;
        font-size:0.85rem; color:#c0392b;
      ">{form.error}</div>
    {/if}

    <form method="POST" action="?/login" use:enhance={() => {
      loading = true;
      return async ({ update }) => { await update(); loading = false; };
    }}>
      <label style="display:block; margin-bottom:18px;">
        <span style="display:block; font-size:0.78rem; font-weight:600; color:#555555; margin-bottom:6px; letter-spacing:0.05em; text-transform:uppercase;">Password</span>
        <input
          type="password"
          name="password"
          required
          placeholder="Enter admin password"
          style="
            width:100%; padding:11px 14px; border-radius:9px;
            border:1px solid #e0e0e0; background:#f8f8f6;
            font-size:0.9rem; color:#111111; outline:none;
            box-sizing:border-box; transition:border-color 0.2s;
            font-family:'Montserrat',sans-serif;
          "
          onfocus={(e) => (e.currentTarget as HTMLInputElement).style.borderColor='#c4856a'}
          onblur={(e)  => (e.currentTarget as HTMLInputElement).style.borderColor='#e0e0e0'}
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        style="
          width:100%; padding:12px; border-radius:9px;
          background:#111111; color:#ffffff; border:none;
          font-family:'Montserrat',sans-serif; font-weight:700;
          font-size:0.9rem; cursor:pointer; transition:opacity 0.2s;
          opacity:{loading ? 0.6 : 1};
        "
      >{loading ? 'Signing in…' : 'Sign In'}</button>
    </form>
  </div>
</div>
