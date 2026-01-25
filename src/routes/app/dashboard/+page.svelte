<!--
  Dashboard Page
  Twin insights, earnings, activity logs, and settings
-->
<script lang="ts">
  import { twinStore, hasTwin } from '$lib/stores/twin';
  import { formatCurrency, formatDate, formatPercentage } from '$lib/utils';
  import { Card, Button, ProgressBar, Avatar } from '$lib/components/common';
  import {
    personalityTraitsData,
    topicInterests,
    coreValues,
    emotionTrendData,
  } from '$lib/data';

  // Get twin data
  let twin = $derived($twinStore.twin);
  let activities = $derived($twinStore.activities);
  let earnings = $derived($twinStore.earnings);

  // Privacy toggle
  let isPublic = $state(true);

  function togglePrivacy() {
    isPublic = !isPublic;
    twinStore.togglePrivacy(isPublic);
  }
</script>

<svelte:head>
  <title>Dashboard - AuraAI</title>
</svelte:head>

<div class="container mx-auto px-4 py-6 max-w-7xl">
  <!-- Header -->
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
    <div>
      <h1 class="text-2xl font-bold text-white">Twin Dashboard</h1>
      <p class="text-void-400 mt-1">Insights, earnings, and activity from your digital twin</p>
    </div>

    <!-- Privacy toggle -->
    <div class="flex items-center gap-4 p-3 bg-void-800/50 rounded-xl border border-void-700">
      <div>
        <div class="text-sm font-medium text-white">Twin Privacy</div>
        <div class="text-xs text-void-400">{isPublic ? 'Public - Available for research' : 'Private - Not shared'}</div>
      </div>
      <button
        onclick={togglePrivacy}
        class="relative w-14 h-7 rounded-full transition-colors duration-200 {isPublic ? 'bg-cosmic-600' : 'bg-void-600'}"
      >
        <div
          class="absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 {isPublic ? 'left-8' : 'left-1'}"
        />
      </button>
    </div>
  </div>

  <div class="grid lg:grid-cols-3 gap-6">
    <!-- Left column - Twin overview -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Twin card with 3D avatar placeholder -->
      <Card variant="glass" padding="lg">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Avatar/3D visualization -->
          <div class="flex-shrink-0">
            <div class="w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0 rounded-2xl bg-gradient-to-br from-cosmic-600 to-ethereal-600 flex items-center justify-center relative overflow-hidden">
              <!-- Animated rings -->
              <div class="absolute inset-0">
                <div class="absolute inset-2 border-2 border-white/10 rounded-full animate-pulse-slow" />
                <div class="absolute inset-4 border border-white/10 rounded-full animate-pulse-slow" style="animation-delay: 0.5s" />
                <div class="absolute inset-6 border border-white/5 rounded-full animate-pulse-slow" style="animation-delay: 1s" />
              </div>
              <svg class="w-16 h-16 text-white/80 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>

          <!-- Twin info -->
          <div class="flex-1">
            <h2 class="text-xl font-semibold text-white mb-2">{twin?.name || 'Your Digital Twin'}</h2>
            <p class="text-void-400 text-sm mb-4">Created {twin ? formatDate(twin.createdAt) : 'Recently'}</p>

            <!-- Completion score -->
            <div class="mb-4">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-void-300">Twin Completeness</span>
                <span class="text-cosmic-400 font-medium">{twin?.completionScore || 0}%</span>
              </div>
              <ProgressBar value={twin?.completionScore || 0} variant="gradient" />
            </div>

            <!-- Quick stats -->
            <div class="grid grid-cols-3 gap-4">
              <div class="text-center p-3 bg-void-800/50 rounded-xl">
                <div class="text-lg font-semibold text-white">{activities.length}</div>
                <div class="text-xs text-void-400">Activities</div>
              </div>
              <div class="text-center p-3 bg-void-800/50 rounded-xl">
                <div class="text-lg font-semibold text-emerald-400">{earnings ? formatCurrency(earnings.totalEarned) : '$0'}</div>
                <div class="text-xs text-void-400">Earned</div>
              </div>
              <div class="text-center p-3 bg-void-800/50 rounded-xl">
                <div class="text-lg font-semibold text-white">{topicInterests.length}</div>
                <div class="text-xs text-void-400">Topics</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <!-- Personality traits -->
      <Card variant="default" padding="lg">
        <h3 class="text-lg font-semibold text-white mb-4">Core Personality Traits</h3>
        <div class="grid sm:grid-cols-2 gap-4">
          {#each personalityTraitsData as trait}
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-void-300">{trait.label}</span>
                <span class="text-cosmic-400">{trait.value}%</span>
              </div>
              <div class="h-2 bg-void-700 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500"
                  style="width: {trait.value}%; background-color: {trait.color}"
                />
              </div>
            </div>
          {/each}
        </div>
      </Card>

      <!-- Topic interests -->
      <Card variant="default" padding="lg">
        <h3 class="text-lg font-semibold text-white mb-4">Topic Interests</h3>
        <div class="space-y-3">
          {#each topicInterests.slice(0, 5) as topic}
            <div class="flex items-center gap-4">
              <div class="flex-1">
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-void-200">{topic.topic}</span>
                  <span class="text-void-400">{topic.engagementScore}%</span>
                </div>
                <div class="h-1.5 bg-void-700 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-cosmic-500 rounded-full"
                    style="width: {topic.engagementScore}%"
                  />
                </div>
              </div>
              <span class="text-xs px-2 py-1 bg-void-700 text-void-300 rounded">{topic.category}</span>
            </div>
          {/each}
        </div>
      </Card>

      <!-- Core values -->
      <Card variant="default" padding="lg">
        <h3 class="text-lg font-semibold text-white mb-4">Core Values</h3>
        <div class="flex flex-wrap gap-3">
          {#each coreValues as value}
            <div
              class="px-4 py-2 rounded-xl border transition-all duration-200 hover:-translate-y-0.5"
              style="
                background: rgba(139, 92, 246, {value.importance / 500});
                border-color: rgba(139, 92, 246, {value.importance / 300});
              "
            >
              <div class="text-sm font-medium text-white">{value.value}</div>
              <div class="text-xs text-void-400">{value.importance}% importance</div>
            </div>
          {/each}
        </div>
      </Card>
    </div>

    <!-- Right column - Earnings & Activity -->
    <div class="space-y-6">
      <!-- Earnings card -->
      <Card variant="glow" padding="lg">
        <h3 class="text-lg font-semibold text-white mb-4">Earnings</h3>

        <div class="text-center mb-6">
          <div class="text-3xl font-bold text-white">{earnings ? formatCurrency(earnings.totalEarned) : '$0.00'}</div>
          <div class="text-sm text-void-400">Total Earned</div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="p-3 bg-void-800/50 rounded-xl text-center">
            <div class="text-lg font-semibold text-emerald-400">{earnings ? formatCurrency(earnings.availableBalance) : '$0'}</div>
            <div class="text-xs text-void-400">Available</div>
          </div>
          <div class="p-3 bg-void-800/50 rounded-xl text-center">
            <div class="text-lg font-semibold text-amber-400">{earnings ? formatCurrency(earnings.pendingBalance) : '$0'}</div>
            <div class="text-xs text-void-400">Pending</div>
          </div>
        </div>

        <Button variant="secondary" fullWidth>
          View Earnings Details
        </Button>
      </Card>

      <!-- Activity log -->
      <Card variant="default" padding="lg">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-white">Recent Activity</h3>
          <span class="text-xs text-void-400">Transparency Log</span>
        </div>

        <div class="space-y-3">
          {#each activities.slice(0, 5) as activity}
            <div class="p-3 bg-void-800/50 rounded-xl">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="text-sm font-medium text-white">{activity.title}</div>
                  <div class="text-xs text-void-400 mt-0.5">{activity.company}</div>
                </div>
                {#if activity.compensation}
                  <span class="text-sm font-medium text-emerald-400">+{formatCurrency(activity.compensation)}</span>
                {/if}
              </div>
              <div class="flex items-center gap-2 mt-2">
                <span class="text-xs px-2 py-0.5 bg-void-700 text-void-300 rounded">{activity.category}</span>
                <span class="text-xs text-void-500">{formatDate(activity.timestamp)}</span>
              </div>
            </div>
          {/each}
        </div>

        {#if activities.length === 0}
          <div class="text-center py-8 text-void-400">
            <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p class="text-sm">No activities yet</p>
          </div>
        {/if}
      </Card>

      <!-- Writing style -->
      <Card variant="default" padding="lg">
        <h3 class="text-lg font-semibold text-white mb-4">Writing Style</h3>

        <div class="space-y-4">
          {#each ['Formality', 'Complexity', 'Emotionality', 'Assertiveness'] as style, i}
            {@const values = [65, 70, 55, 60]}
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-void-300">{style}</span>
                <span class="text-void-400">{values[i]}%</span>
              </div>
              <div class="h-1.5 bg-void-700 rounded-full overflow-hidden">
                <div
                  class="h-full bg-ethereal-500 rounded-full"
                  style="width: {values[i]}%"
                />
              </div>
            </div>
          {/each}
        </div>
      </Card>
    </div>
  </div>
</div>
