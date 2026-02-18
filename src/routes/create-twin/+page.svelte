<!--
  Create Twin Page
  Multi-step twin creation process with social connections and consent
-->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { twinStore } from '$lib/stores/twin';
  import { authStore } from '$lib/stores/auth';
  import { showSuccess, showError } from '$lib/stores/ui';
  import { SOCIAL_PLATFORMS, TWIN_CREATION_STEPS } from '$lib/constants';
  import { Header } from '$lib/components/layout';
  import { Button, Card, ProgressBar, Input } from '$lib/components/common';

  // Step state
  let currentStep = $state(1);
  let isProcessing = $state(false);
  let processingProgress = $state(0);
  let processingMessage = $state('');

  // Connected platforms - use array for better Svelte 5 reactivity
  let connectedPlatforms = $state<string[]>([]);
  let connectingPlatform = $state<string | null>(null);

  // Registration data
  let registrationData = $state({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  let registrationErrors = $state<Record<string, string>>({});

  // Consent state
  let consentChecks = $state({
    dataCollection: false,
    privacyPolicy: false,
    termsOfService: false,
  });

  // Platform icons
  const platformIcons: Record<string, string> = {
    linkedin: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
    github: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
    notion: 'M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.934zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.62c-.094-.42.14-1.026.793-1.073l3.454-.234 4.763 7.279V9.06l-1.214-.14c-.094-.514.28-.887.747-.933l3.224-.187z',
    obsidian: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    twitter: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
    spotify: 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 11-.277-1.215c3.809-.87 7.077-.496 9.713 1.115a.622.622 0 01.206.857zm1.223-2.722a.779.779 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.779.779 0 01-.451-1.491c3.632-1.102 8.147-.568 11.234 1.328a.779.779 0 01.254 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.934.934 0 11-.542-1.79c3.533-1.072 9.404-.865 13.115 1.338a.934.934 0 01-.956 1.609z',
  };

  // Connect a platform
  async function connectPlatform(platformId: string) {
    connectingPlatform = platformId;

    try {
      // Simulate OAuth flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (!connectedPlatforms.includes(platformId)) {
        connectedPlatforms = [...connectedPlatforms, platformId];
      }
      showSuccess('Connected!', `Successfully connected to ${platformId}`);
    } catch {
      showError('Connection failed', 'Please try again');
    } finally {
      connectingPlatform = null;
    }
  }

  // Disconnect a platform
  function disconnectPlatform(platformId: string) {
    connectedPlatforms = connectedPlatforms.filter(p => p !== platformId);
  }

  // Start processing
  async function startProcessing() {
    if (connectedPlatforms.length === 0) {
      showError('No connections', 'Please connect at least one platform');
      return;
    }

    currentStep = 2;
    isProcessing = true;
    processingProgress = 0;

    const messages = [
      'Analyzing your writing patterns...',
      'Extracting behavioral insights...',
      'Mapping your interests...',
      'Building personality model...',
      'Training your digital twin...',
      'Finalizing twin creation...',
    ];

    for (let i = 0; i < messages.length; i++) {
      processingMessage = messages[i];
      processingProgress = ((i + 1) / messages.length) * 100;
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    isProcessing = false;
    currentStep = 3;
  }

  // Handle registration
  async function handleRegistration(event: Event) {
    event.preventDefault();

    // Validate
    registrationErrors = {};
    if (!registrationData.name) registrationErrors.name = 'Name is required';
    if (!registrationData.email) registrationErrors.email = 'Email is required';
    if (!registrationData.password) registrationErrors.password = 'Password is required';
    if (registrationData.password !== registrationData.confirmPassword) {
      registrationErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(registrationErrors).length > 0) return;

    // Check consent
    if (!consentChecks.dataCollection || !consentChecks.privacyPolicy || !consentChecks.termsOfService) {
      showError('Consent required', 'Please accept all terms to continue');
      return;
    }

    try {
      const success = await authStore.register({
        name: registrationData.name,
        email: registrationData.email,
        password: registrationData.password,
        acceptTerms: true,
        acceptDataConsent: true,
      });

      if (success) {
        showSuccess('Twin created!', 'Welcome to AuraAI');
        goto('/app/chat');
      }
    } catch {
      showError('Registration failed', 'Please try again');
    }
  }

  // Check if can proceed
  let canProceed = $derived(
    currentStep === 1 ? connectedPlatforms.length > 0 :
    currentStep === 2 ? !isProcessing :
    currentStep === 3
  );
</script>

<svelte:head>
  <title>Create Your Twin - AuraAI</title>
</svelte:head>

<div class="min-h-screen bg-void-950">
  <Header />

  <main class="pt-20 pb-12 px-4">
    <div class="max-w-3xl mx-auto">
      <!-- Progress indicator -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-4">
          {#each TWIN_CREATION_STEPS as step, index}
            <div class="flex items-center">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300
                  {currentStep > step.id ? 'bg-cosmic-500 text-white' :
                   currentStep === step.id ? 'bg-cosmic-500/20 border-2 border-cosmic-500 text-cosmic-400' :
                   'bg-void-800 text-void-500'}"
              >
                {#if currentStep > step.id}
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                {:else}
                  {step.id}
                {/if}
              </div>
              {#if index < TWIN_CREATION_STEPS.length - 1}
                <div class="w-16 md:w-24 h-0.5 mx-2 {currentStep > step.id ? 'bg-cosmic-500' : 'bg-void-700'}"></div>
              {/if}
            </div>
          {/each}
        </div>
        <div class="flex justify-between text-sm">
          {#each TWIN_CREATION_STEPS as step}
            <span class="{currentStep >= step.id ? 'text-void-200' : 'text-void-500'} w-20 text-center">
              {step.name}
            </span>
          {/each}
        </div>
      </div>

      <!-- Step content -->
      {#if currentStep === 1}
        <!-- Step 1: Connect platforms -->
        <div class="animate-fade-in">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-white mb-3">Connect Your World</h1>
            <p class="text-void-300 max-w-lg mx-auto">
              Link your accounts to help us understand your writing style, interests, and behavioral patterns.
            </p>
          </div>

          <div class="grid sm:grid-cols-2 gap-4 mb-8">
            {#each SOCIAL_PLATFORMS as platform}
              <Card
                variant={connectedPlatforms.includes(platform.id) ? 'glow' : 'default'}
                padding="md"
                hoverable
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-12 h-12 rounded-xl flex items-center justify-center"
                      style="background-color: {platform.color}20"
                    >
                      <svg class="w-6 h-6" style="color: {platform.color}" fill="currentColor" viewBox="0 0 24 24">
                        <path d={platformIcons[platform.id] || ''} />
                      </svg>
                    </div>
                    <div>
                      <div class="font-medium text-white">{platform.name}</div>
                      <div class="text-sm text-void-400">{platform.description}</div>
                    </div>
                  </div>

                  {#if connectedPlatforms.includes(platform.id)}
                    <button
                      class="px-3 py-1.5 text-sm text-emerald-400 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20"
                      onclick={() => disconnectPlatform(platform.id)}
                    >
                      Connected
                    </button>
                  {:else}
                    <Button
                      variant="secondary"
                      size="sm"
                      loading={connectingPlatform === platform.id}
                      onclick={() => connectPlatform(platform.id)}
                    >
                      Connect
                    </Button>
                  {/if}
                </div>
              </Card>
            {/each}
          </div>

          <div class="flex justify-between">
            <Button variant="ghost" href="/">
              Back to Home
            </Button>
            <Button
              variant="primary"
              disabled={!canProceed}
              onclick={startProcessing}
            >
              Continue
              <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </div>

      {:else if currentStep === 2}
        <!-- Step 2: Processing -->
        <div class="animate-fade-in">
          <div class="text-center py-16">
            <!-- Animated brain/processing visual -->
            <div class="relative w-48 h-48 mx-auto mb-8">
              <div class="absolute inset-0 rounded-full bg-cosmic-500/20 animate-pulse-slow"></div>
              <div class="absolute inset-4 rounded-full bg-cosmic-500/30 animate-pulse-slow" style="animation-delay: 0.5s"></div>
              <div class="absolute inset-8 rounded-full bg-cosmic-500/40 animate-pulse-slow" style="animation-delay: 1s"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <svg class="w-20 h-20 text-cosmic-400 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>

            <h2 class="text-2xl font-bold text-white mb-3">Creating Your Digital Twin</h2>
            <p class="text-cosmic-400 mb-8">{processingMessage}</p>

            <div class="max-w-md mx-auto">
              <ProgressBar
                value={processingProgress}
                variant="gradient"
                showLabel
                label="Progress"
              />
            </div>

            <p class="text-sm text-void-400 mt-8">
              This may take a moment. We're analyzing your data to build an accurate reflection of you.
            </p>
          </div>
        </div>

      {:else if currentStep === 3}
        <!-- Step 3: Account creation & consent -->
        <div class="animate-fade-in">
          <div class="text-center mb-8">
            <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg class="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-white mb-3">Your Twin is Ready!</h1>
            <p class="text-void-300">Complete your account to start your journey</p>
          </div>

          <Card variant="glass" padding="lg">
            <form onsubmit={handleRegistration} class="space-y-6">
              <div class="grid sm:grid-cols-2 gap-4">
                <Input
                  name="name"
                  label="Full Name"
                  placeholder="Your name"
                  bind:value={registrationData.name}
                  error={registrationErrors.name}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="you@example.com"
                  bind:value={registrationData.email}
                  error={registrationErrors.email}
                  required
                />
              </div>

              <div class="grid sm:grid-cols-2 gap-4">
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Create a password"
                  bind:value={registrationData.password}
                  error={registrationErrors.password}
                  required
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm password"
                  bind:value={registrationData.confirmPassword}
                  error={registrationErrors.confirmPassword}
                  required
                />
              </div>

              <!-- Consent checkboxes -->
              <div class="space-y-4 pt-4 border-t border-void-700">
                <h3 class="text-lg font-medium text-white">Data Governance & Consent</h3>

                <label class="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    bind:checked={consentChecks.dataCollection}
                    class="mt-1 w-5 h-5 rounded border-void-600 bg-void-800 text-cosmic-500 focus:ring-cosmic-500"
                  />
                  <span class="text-sm text-void-300 group-hover:text-void-200">
                    I consent to the collection and analysis of my data to create and maintain my digital twin.
                    I understand my data will be processed securely.
                  </span>
                </label>

                <label class="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    bind:checked={consentChecks.privacyPolicy}
                    class="mt-1 w-5 h-5 rounded border-void-600 bg-void-800 text-cosmic-500 focus:ring-cosmic-500"
                  />
                  <span class="text-sm text-void-300 group-hover:text-void-200">
                    I have read and agree to the <a href="/privacy" class="text-cosmic-400 hover:underline">Privacy Policy</a>.
                  </span>
                </label>

                <label class="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    bind:checked={consentChecks.termsOfService}
                    class="mt-1 w-5 h-5 rounded border-void-600 bg-void-800 text-cosmic-500 focus:ring-cosmic-500"
                  />
                  <span class="text-sm text-void-300 group-hover:text-void-200">
                    I agree to the <a href="/terms" class="text-cosmic-400 hover:underline">Terms of Service</a>.
                  </span>
                </label>
              </div>

              <Button type="submit" variant="primary" fullWidth>
                Complete Setup & Meet My Twin
              </Button>
            </form>
          </Card>
        </div>
      {/if}
    </div>
  </main>
</div>
