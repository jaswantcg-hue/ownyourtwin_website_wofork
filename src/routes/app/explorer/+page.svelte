<!--
  Explorer Page
  Services like focus music, peer matching, cognitive reframing, etc.
-->
<script lang="ts">
  import { Card, Button, Modal } from '$lib/components/common';
  import {
    explorerServices,
    focusTracks,
    peerMatches,
    cognitiveDistortions,
    serviceCategories,
  } from '$lib/data';
  import { formatDuration } from '$lib/utils';

  // Active service modal
  let activeService = $state<string | null>(null);
  let showReframingModal = $state(false);

  // Reframing state
  let reframingThought = $state('');
  let reframingStep = $state(1);
  let detectedDistortions = $state<typeof cognitiveDistortions>([]);
  let reframedThoughts = $state<string[]>([]);

  // Service icons
  const iconPaths: Record<string, string> = {
    headphones: 'M3 18v-6a9 9 0 0118 0v6M3 18a3 3 0 003 3h0a3 3 0 003-3v-2a3 3 0 00-3-3h0a3 3 0 00-3 3v2zm18 0a3 3 0 01-3 3h0a3 3 0 01-3-3v-2a3 3 0 013-3h0a3 3 0 013 3v2z',
    users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    'refresh-cw': 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    'edit-3': 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    'bar-chart-2': 'M18 20V10M12 20V4M6 20v-6',
    'book-open': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  };

  // Start reframing session
  function startReframing() {
    showReframingModal = true;
    reframingStep = 1;
    reframingThought = '';
    detectedDistortions = [];
    reframedThoughts = [];
  }

  // Process thought for distortions
  async function analyzeThought() {
    if (!reframingThought.trim()) return;

    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock detected distortions
    detectedDistortions = cognitiveDistortions.slice(0, 2);
    reframingStep = 2;
  }

  // Generate reframed thoughts
  async function generateReframes() {
    await new Promise(resolve => setTimeout(resolve, 1500));

    reframedThoughts = [
      "This situation is challenging, but it's an opportunity for growth.",
      "I may not have all the answers yet, but I'm learning.",
      "My feelings are valid, and this difficulty is temporary.",
    ];
    reframingStep = 3;
  }

  // Playing track state
  let playingTrackId = $state<string | null>(null);

  function togglePlay(trackId: string) {
    playingTrackId = playingTrackId === trackId ? null : trackId;
  }
</script>

<svelte:head>
  <title>Explorer - AuraAI</title>
</svelte:head>

<div class="container mx-auto px-4 py-6 max-w-7xl">
  <!-- Header -->
  <div class="mb-8">
    <h1 class="text-2xl font-bold text-white">Twin Explorer</h1>
    <p class="text-void-400 mt-1">Discover services powered by your digital twin</p>
  </div>

  <!-- Services grid -->
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
    {#each explorerServices as service}
      <Card variant="default" padding="none" hoverable>
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center"
              style="background: linear-gradient(135deg, {serviceCategories[service.category as keyof typeof serviceCategories].color})"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={iconPaths[service.icon] || ''} />
              </svg>
            </div>
            {#if service.isPremium}
              <span class="px-2 py-1 text-xs font-medium bg-aura-500/20 text-aura-400 rounded-full">Premium</span>
            {/if}
          </div>

          <h3 class="text-lg font-semibold text-white mb-2">{service.name}</h3>
          <p class="text-sm text-void-400 mb-4">{service.description}</p>

          <ul class="space-y-1.5 mb-4">
            {#each service.features.slice(0, 3) as feature}
              <li class="flex items-center gap-2 text-sm text-void-300">
                <svg class="w-4 h-4 text-cosmic-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            {/each}
          </ul>
        </div>

        <div class="px-6 py-4 bg-void-800/30 border-t border-void-700">
          {#if service.id === 'service_reframing'}
            <Button variant="primary" fullWidth onclick={startReframing}>
              Start Session
            </Button>
          {:else if service.id === 'service_focus_music'}
            <Button variant="primary" fullWidth onclick={() => activeService = 'music'}>
              Open Player
            </Button>
          {:else if service.id === 'service_peer_match'}
            <Button variant="primary" fullWidth onclick={() => activeService = 'peers'}>
              View Matches
            </Button>
          {:else}
            <Button variant="secondary" fullWidth>
              Coming Soon
            </Button>
          {/if}
        </div>
      </Card>
    {/each}
  </div>

  <!-- Focus Music Section -->
  {#if activeService === 'music'}
    <section class="mb-12 animate-fade-in">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-white">Focus Music</h2>
        <button
          class="text-sm text-void-400 hover:text-white"
          onclick={() => activeService = null}
        >
          Close
        </button>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {#each focusTracks as track}
          <Card variant="default" padding="none" hoverable>
            <div class="aspect-square bg-gradient-to-br from-cosmic-600/30 to-ethereal-600/30 flex items-center justify-center relative group">
              <svg class="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>

              <!-- Play button overlay -->
              <button
                class="absolute inset-0 flex items-center justify-center bg-void-950/50 opacity-0 group-hover:opacity-100 transition-opacity"
                onclick={() => togglePlay(track.id)}
              >
                {#if playingTrackId === track.id}
                  <div class="w-14 h-14 rounded-full bg-cosmic-500 flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  </div>
                {:else}
                  <div class="w-14 h-14 rounded-full bg-cosmic-500 flex items-center justify-center">
                    <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                {/if}
              </button>

              {#if track.isPersonalized}
                <span class="absolute top-2 right-2 px-2 py-0.5 text-xs bg-cosmic-500/80 text-white rounded-full">
                  Personalized
                </span>
              {/if}
            </div>
            <div class="p-3">
              <div class="font-medium text-white text-sm truncate">{track.title}</div>
              <div class="flex items-center justify-between mt-1">
                <span class="text-xs text-void-400 capitalize">{track.type}</span>
                <span class="text-xs text-void-400">{formatDuration(track.duration)}</span>
              </div>
            </div>
          </Card>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Peer Matches Section -->
  {#if activeService === 'peers'}
    <section class="mb-12 animate-fade-in">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-semibold text-white">Peer Matches</h2>
        <button
          class="text-sm text-void-400 hover:text-white"
          onclick={() => activeService = null}
        >
          Close
        </button>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        {#each peerMatches as match}
          <Card variant="default" padding="lg">
            <div class="flex items-start gap-4">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-cosmic-500 to-ethereal-500 flex items-center justify-center text-white text-xl font-bold">
                {match.matchScore}%
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="font-medium text-white">Anonymous Match #{match.id.slice(-4)}</h3>
                  <span class="text-xs px-2 py-1 rounded-full
                    {match.connectionStatus === 'connected' ? 'bg-emerald-500/20 text-emerald-400' :
                     match.connectionStatus === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                     'bg-void-700 text-void-300'}">
                    {match.connectionStatus}
                  </span>
                </div>

                <div class="mt-3">
                  <div class="text-xs text-void-400 mb-1">Common Traits</div>
                  <div class="flex flex-wrap gap-1">
                    {#each match.commonTraits as trait}
                      <span class="px-2 py-0.5 text-xs bg-cosmic-500/20 text-cosmic-400 rounded">{trait}</span>
                    {/each}
                  </div>
                </div>

                <div class="mt-3">
                  <div class="text-xs text-void-400 mb-1">Shared Interests</div>
                  <div class="flex flex-wrap gap-1">
                    {#each match.commonInterests as interest}
                      <span class="px-2 py-0.5 text-xs bg-void-700 text-void-300 rounded">{interest}</span>
                    {/each}
                  </div>
                </div>

                <div class="mt-4">
                  {#if match.connectionStatus === 'suggested'}
                    <Button variant="primary" size="sm">Connect</Button>
                  {:else if match.connectionStatus === 'connected'}
                    <Button variant="secondary" size="sm">Message</Button>
                  {/if}
                </div>
              </div>
            </div>
          </Card>
        {/each}
      </div>
    </section>
  {/if}
</div>

<!-- Cognitive Reframing Modal -->
<Modal bind:open={showReframingModal} title="Cognitive Reframing" size="lg">
  <div class="space-y-6">
    {#if reframingStep === 1}
      <!-- Step 1: Enter thought -->
      <div class="animate-fade-in">
        <p class="text-void-300 mb-4">
          Share a negative thought or belief that's been troubling you. We'll help you identify cognitive distortions and find healthier perspectives.
        </p>
        <textarea
          bind:value={reframingThought}
          placeholder="Example: I'll never be good enough at my job..."
          rows="4"
          class="w-full px-4 py-3 bg-void-800 border border-void-700 rounded-xl text-white placeholder-void-500 resize-none focus:outline-none focus:border-cosmic-500"
        ></textarea>
        <div class="flex justify-end mt-4">
          <Button variant="primary" onclick={analyzeThought} disabled={!reframingThought.trim()}>
            Analyze Thought
          </Button>
        </div>
      </div>

    {:else if reframingStep === 2}
      <!-- Step 2: Show distortions -->
      <div class="animate-fade-in">
        <div class="p-4 bg-void-800/50 rounded-xl mb-4">
          <div class="text-sm text-void-400 mb-2">Your thought:</div>
          <p class="text-white italic">"{reframingThought}"</p>
        </div>

        <h4 class="text-lg font-medium text-white mb-3">Detected Cognitive Distortions</h4>
        <div class="space-y-3">
          {#each detectedDistortions as distortion}
            <div class="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <div class="font-medium text-amber-400 mb-1">{distortion.type}</div>
              <p class="text-sm text-void-300">{distortion.description}</p>
              <p class="text-sm text-void-400 mt-2 italic">"{distortion.example}"</p>
            </div>
          {/each}
        </div>

        <div class="flex justify-end mt-4">
          <Button variant="primary" onclick={generateReframes}>
            Generate Reframes
          </Button>
        </div>
      </div>

    {:else if reframingStep === 3}
      <!-- Step 3: Show reframed thoughts -->
      <div class="animate-fade-in">
        <h4 class="text-lg font-medium text-white mb-3">Alternative Perspectives</h4>
        <p class="text-void-400 mb-4">Choose a reframed thought that resonates with you:</p>

        <div class="space-y-3">
          {#each reframedThoughts as thought, i}
            <button
              class="w-full p-4 bg-void-800/50 hover:bg-cosmic-500/10 border border-void-700 hover:border-cosmic-500/30 rounded-xl text-left transition-all"
            >
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-cosmic-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-sm text-cosmic-400">{i + 1}</span>
                </div>
                <p class="text-void-200">{thought}</p>
              </div>
            </button>
          {/each}
        </div>

        <div class="flex justify-between mt-6">
          <Button variant="ghost" onclick={() => reframingStep = 1}>
            Try Another Thought
          </Button>
          <Button variant="primary" onclick={() => showReframingModal = false}>
            Save & Close
          </Button>
        </div>
      </div>
    {/if}
  </div>
</Modal>
