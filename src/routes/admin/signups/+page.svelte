<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  interface Props { data: PageData }
  let { data }: Props = $props();

  let search = $state('');

  const filtered = $derived(
    data.signups.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.phone ?? '').includes(search) ||
      (s.interests ?? '').toLowerCase().includes(search.toLowerCase())
    )
  );

  function fmt(iso: Date | string) {
    return new Date(iso).toLocaleString('en-IN', {
      dateStyle: 'medium', timeStyle: 'short'
    });
  }
</script>

<svelte:head>
  <title>Signups — Admin | OwnYourTwin</title>
</svelte:head>

<div style="min-height:100vh; background:#f8f8f6; font-family:'Montserrat',sans-serif;">

  <!-- Top bar -->
  <header style="
    background:#111111; color:#ffffff;
    padding:0 32px; height:60px;
    display:flex; align-items:center; justify-content:space-between;
  ">
    <div style="display:flex; align-items:center; gap:12px;">
      <svg width="22" height="22" fill="none" stroke="#c4856a" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944
             a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9
             c0 5.591 3.824 10.29 9 11.622
             5.176-1.332 9-6.03 9-11.622
             0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
      <span style="font-weight:800; font-size:1rem; letter-spacing:0.03em;">OwnYourTwin</span>
      <span style="color:#555555; font-size:0.8rem;">/ Admin</span>
    </div>
    <form method="POST" action="/admin?/logout" use:enhance>
      <button type="submit" style="
        background:transparent; border:1px solid #444444; color:#aaaaaa;
        padding:6px 16px; border-radius:7px; font-family:'Montserrat',sans-serif;
        font-size:0.8rem; cursor:pointer; transition:all 0.2s;
      "
      onmouseenter={(e) => { (e.currentTarget as HTMLElement).style.borderColor='#c4856a'; (e.currentTarget as HTMLElement).style.color='#c4856a'; }}
      onmouseleave={(e) => { (e.currentTarget as HTMLElement).style.borderColor='#444444'; (e.currentTarget as HTMLElement).style.color='#aaaaaa'; }}
      >Sign Out</button>
    </form>
  </header>

  <main style="max-width:1100px; margin:0 auto; padding:40px 24px;">

    <!-- Stats row -->
    <div style="display:flex; gap:16px; margin-bottom:32px; flex-wrap:wrap;">
      {#each [
        { label: 'Total Sign-ups', value: data.signups.length, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0' },
        { label: 'With Phone', value: data.signups.filter(s => s.phone).length, icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
        { label: 'With Interests', value: data.signups.filter(s => s.interests).length, icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
      ] as stat}
        <div style="
          flex:1; min-width:160px; background:#ffffff; border:1px solid #e0e0e0;
          border-radius:14px; padding:20px 24px;
          box-shadow:0 2px 8px rgba(0,0,0,0.04);
        ">
          <svg width="20" height="20" fill="none" stroke="#c4856a" stroke-width="1.8" viewBox="0 0 24 24" style="margin-bottom:10px;">
            <path stroke-linecap="round" stroke-linejoin="round" d={stat.icon}/>
          </svg>
          <div style="font-size:1.8rem; font-weight:800; color:#111111; line-height:1;">{stat.value}</div>
          <div style="font-size:0.78rem; color:#999999; margin-top:4px; font-weight:500;">{stat.label}</div>
        </div>
      {/each}
    </div>

    <!-- Search + table -->
    <div style="background:#ffffff; border:1px solid #e0e0e0; border-radius:16px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.05);">

      <!-- Table header row -->
      <div style="
        padding:20px 24px; border-bottom:1px solid #f0f0f0;
        display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;
      ">
        <h2 style="font-size:1.05rem; font-weight:800; color:#111111; margin:0;">
          Early Access Sign-ups
          <span style="font-size:0.78rem; font-weight:500; color:#aaaaaa; margin-left:8px;">{filtered.length} of {data.signups.length}</span>
        </h2>
        <!-- Search -->
        <input
          type="search"
          bind:value={search}
          placeholder="Search by name, email, phone…"
          style="
            padding:9px 14px; border-radius:9px; border:1px solid #e0e0e0;
            background:#f8f8f6; font-family:'Montserrat',sans-serif;
            font-size:0.85rem; color:#111111; outline:none;
            width:260px; transition:border-color 0.2s;
          "
          onfocus={(e) => (e.currentTarget as HTMLInputElement).style.borderColor='#c4856a'}
          onblur={(e)  => (e.currentTarget as HTMLInputElement).style.borderColor='#e0e0e0'}
        />
      </div>

      <!-- Table -->
      {#if filtered.length === 0}
        <div style="padding:48px; text-align:center; color:#aaaaaa; font-style:italic; font-family:'Lora',serif;">
          No sign-ups found.
        </div>
      {:else}
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:0.875rem;">
            <thead>
              <tr style="background:#f8f8f6;">
                {#each ['#', 'Name', 'Email', 'Phone', 'Interests', 'Signed Up'] as col}
                  <th style="
                    padding:12px 16px; text-align:left;
                    font-size:0.72rem; font-weight:700; color:#888888;
                    letter-spacing:0.07em; text-transform:uppercase;
                    border-bottom:1px solid #eeeeee; white-space:nowrap;
                  ">{col}</th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each filtered as signup, i}
                <tr style="border-bottom:1px solid #f4f4f4; transition:background 0.15s;"
                  onmouseenter={(e) => (e.currentTarget as HTMLElement).style.background='#fafaf8'}
                  onmouseleave={(e) => (e.currentTarget as HTMLElement).style.background='transparent'}
                >
                  <td style="padding:14px 16px; color:#cccccc; font-size:0.78rem;">{i + 1}</td>
                  <td style="padding:14px 16px; font-weight:600; color:#111111;">{signup.name}</td>
                  <td style="padding:14px 16px;">
                    <a href="mailto:{signup.email}" style="color:#c4856a; text-decoration:none;"
                       onmouseenter={(e) => (e.currentTarget as HTMLElement).style.textDecoration='underline'}
                       onmouseleave={(e) => (e.currentTarget as HTMLElement).style.textDecoration='none'}
                    >{signup.email}</a>
                  </td>
                  <td style="padding:14px 16px; color:#555555;">{signup.phone || '—'}</td>
                  <td style="padding:14px 16px; color:#777777; max-width:280px;">
                    {#if signup.interests}
                      <span title={signup.interests} style="
                        display:block; overflow:hidden; text-overflow:ellipsis;
                        white-space:nowrap; max-width:260px;
                      ">{signup.interests}</span>
                    {:else}
                      <span style="color:#cccccc;">—</span>
                    {/if}
                  </td>
                  <td style="padding:14px 16px; color:#999999; white-space:nowrap; font-size:0.82rem;">{fmt(signup.createdAt)}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>

  </main>
</div>
