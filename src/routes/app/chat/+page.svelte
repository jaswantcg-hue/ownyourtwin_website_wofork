<!--
  Chat/Journal Page
  Interactive chat-based journaling with the digital twin
-->
<script lang="ts">
  import { onMount } from "svelte";
  import {
    chatStore,
    currentMessages,
    twinIsTyping,
    recentInsights,
  } from "$lib/stores/chat";
  import { twinStore } from "$lib/stores/twin";
  import { formatRelativeTime } from "$lib/utils";
  import { Card, Avatar, Button } from "$lib/components/common";
  import { mockSuggestions } from "$lib/data";

  // Message input state
  let messageInput = $state("");
  let isRecording = $state(false);
  let chatContainer: HTMLDivElement;

  // Load conversations on mount
  onMount(() => {
    chatStore.loadConversations();
    // Start a new conversation if none exists
    chatStore.startNewConversation();
  });

  // Auto-scroll to bottom when new messages arrive
  $effect(() => {
    if ($currentMessages.length && chatContainer) {
      setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 100);
    }
  });

  // Send message
  async function sendMessage() {
    if (!messageInput.trim()) return;

    const content = messageInput;
    messageInput = "";
    await chatStore.sendMessage(content);
  }

  // Handle key press
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  // Use suggestion
  function useSuggestion(text: string) {
    messageInput = text;
  }

  // Get twin data
  let twin = $derived($twinStore.twin);
</script>

<svelte:head>
  <title>Journal - AuraAI</title>
</svelte:head>

<div class="h-[calc(100vh-64px)] flex">
  <!-- Sidebar - Conversations -->
  <aside
    class="hidden lg:flex w-80 flex-col border-r border-void-800 bg-void-900/50"
  >
    <div class="p-4 border-b border-void-800">
      <Button
        variant="primary"
        fullWidth
        onclick={() => chatStore.startNewConversation()}
      >
        {#snippet icon()}
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        {/snippet}
        New Conversation
      </Button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-2">
      {#each $chatStore.conversations.filter((c) => !c.isArchived) as conversation}
        <button
          class="w-full p-3 rounded-xl text-left transition-all duration-200
            {$chatStore.currentConversation?.id === conversation.id
            ? 'bg-cosmic-500/20 border border-cosmic-500/30'
            : 'bg-void-800/50 hover:bg-void-800 border border-transparent'}"
          onclick={() => chatStore.selectConversation(conversation.id)}
        >
          <div class="font-medium text-white text-sm truncate">
            {conversation.title}
          </div>
          <div class="text-xs text-void-400 mt-1">
            {formatRelativeTime(conversation.lastMessageAt)}
          </div>
          {#if conversation.tags.length > 0}
            <div class="flex flex-wrap gap-1 mt-2">
              {#each conversation.tags.slice(0, 3) as tag}
                <span
                  class="px-2 py-0.5 text-xs bg-void-700 text-void-300 rounded-full"
                  >{tag}</span
                >
              {/each}
            </div>
          {/if}
        </button>
      {/each}
    </div>
  </aside>

  <!-- Main chat area -->
  <div class="flex-1 flex flex-col">
    <!-- Chat messages -->
    <div
      bind:this={chatContainer}
      class="flex-1 overflow-y-auto p-4 md:p-6 space-y-4"
    >
      {#each $currentMessages as message (message.id)}
        <div
          class="flex gap-3 animate-fade-in
            {message.role === 'user' ? 'flex-row-reverse' : ''}"
        >
          <!-- Avatar -->
          <div class="flex-shrink-0">
            {#if message.role === "user"}
              <Avatar name="You" size="sm" />
            {:else}
              <div
                class="w-8 h-8 rounded-full bg-gradient-to-br from-cosmic-500 to-ethereal-500 flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            {/if}
          </div>

          <!-- Message content -->
          <div
            class="max-w-[75%] {message.role === 'user' ? 'text-right' : ''}"
          >
            <div
              class="inline-block px-4 py-3 rounded-2xl
                {message.role === 'user'
                ? 'bg-cosmic-600 text-white rounded-br-md'
                : 'bg-void-800 text-void-100 rounded-bl-md'}"
            >
              <p class="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            </div>
            <div class="text-xs text-void-500 mt-1 px-1">
              {formatRelativeTime(message.timestamp)}
            </div>
          </div>
        </div>
      {/each}

      <!-- Typing indicator -->
      {#if $twinIsTyping}
        <div class="flex gap-3">
          <div
            class="w-8 h-8 rounded-full bg-gradient-to-br from-cosmic-500 to-ethereal-500 flex items-center justify-center"
          >
            <svg
              class="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div class="bg-void-800 px-4 py-3 rounded-2xl rounded-bl-md">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Quick insights -->
    {#if $recentInsights.length > 0}
      <div class="px-4 md:px-6 py-2 border-t border-void-800 bg-void-900/50">
        <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {#each $recentInsights as insight}
            <div
              class="flex-shrink-0 px-3 py-2 bg-cosmic-500/10 border border-cosmic-500/20 rounded-lg"
            >
              <div class="text-xs font-medium text-cosmic-400">
                {insight.title}
              </div>
              <div class="text-xs text-void-300 mt-0.5">
                {insight.description}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Suggestions -->
    <div class="px-4 md:px-6 py-3 border-t border-void-800 bg-void-900/50">
      <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {#each mockSuggestions.slice(0, 4) as suggestion}
          <button
            class="flex-shrink-0 px-3 py-1.5 text-sm text-void-300 bg-void-800 hover:bg-void-700 rounded-full transition-colors"
            onclick={() => useSuggestion(suggestion.text)}
          >
            {suggestion.text}
          </button>
        {/each}
      </div>
    </div>

    <!-- Input area -->
    <div class="p-4 md:p-6 border-t border-void-800 bg-void-900">
      <div class="flex items-end gap-3">
        <!-- Audio record button -->
        <button
          class="p-3 rounded-xl {isRecording
            ? 'bg-red-500 text-white'
            : 'bg-void-800 text-void-400 hover:text-white'} transition-colors"
          onclick={() => (isRecording = !isRecording)}
          title={isRecording ? "Stop recording" : "Start voice recording"}
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>

        <!-- Text input -->
        <div class="flex-1 relative">
          <textarea
            bind:value={messageInput}
            onkeydown={handleKeyPress}
            placeholder="Share your thoughts..."
            rows="1"
            class="w-full px-4 py-3 bg-void-800 border border-void-700 rounded-xl text-white placeholder-void-400 resize-none focus:outline-none focus:border-cosmic-500 focus:ring-1 focus:ring-cosmic-500/20"
          ></textarea>
        </div>

        <!-- Send button -->
        <Button
          variant="primary"
          onclick={sendMessage}
          disabled={!messageInput.trim()}
        >
          {#snippet icon()}
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          {/snippet}
        </Button>
      </div>
    </div>
  </div>

  <!-- Right sidebar - Insights panel -->
  <aside
    class="hidden xl:flex w-80 flex-col border-l border-void-800 bg-void-900/50 p-4"
  >
    <h3 class="text-sm font-medium text-void-300 uppercase tracking-wider mb-4">
      Quick Insights
    </h3>

    <!-- Twin status removed as per user request (moved to global header) -->

    <!-- Recent patterns -->
    <div class="space-y-3">
      <h4 class="text-sm font-medium text-void-200">Detected Patterns</h4>

      <div class="p-3 bg-void-800/50 rounded-xl">
        <div class="flex items-center gap-2 mb-1">
          <div class="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span class="text-sm text-void-200">Positive Trend</span>
        </div>
        <p class="text-xs text-void-400">
          Your morning entries show increased optimism this week.
        </p>
      </div>

      <div class="p-3 bg-void-800/50 rounded-xl">
        <div class="flex items-center gap-2 mb-1">
          <div class="w-2 h-2 rounded-full bg-cosmic-400"></div>
          <span class="text-sm text-void-200">Topic Interest</span>
        </div>
        <p class="text-xs text-void-400">
          You've been reflecting more on career growth lately.
        </p>
      </div>

      <div class="p-3 bg-void-800/50 rounded-xl">
        <div class="flex items-center gap-2 mb-1">
          <div class="w-2 h-2 rounded-full bg-amber-400"></div>
          <span class="text-sm text-void-200">Suggestion</span>
        </div>
        <p class="text-xs text-void-400">
          Try exploring your creative hobbies this week.
        </p>
      </div>
    </div>
  </aside>
</div>

<style>
  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .typing-indicator span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #8b5cf6;
    animation: typing 1.4s infinite;
  }

  .typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing {
    0%,
    60%,
    100% {
      transform: translateY(0);
      opacity: 0.6;
    }
    30% {
      transform: translateY(-4px);
      opacity: 1;
    }
  }
</style>
