<!--
  Create Twin Page
  Multi-step twin creation: Register → Connect Social → Chat
  Processing happens in background/chat directly.
-->
<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { authStore } from "$lib/stores/auth";
  import { showSuccess, showError } from "$lib/stores/ui";
  import { SOCIAL_PLATFORMS, TWIN_CREATION_STEPS } from "$lib/constants";
  import { Header } from "$lib/components/layout";
  import { Button, Card, Input } from "$lib/components/common";

  // Step state (1: Register, 2: Connect)
  let currentStep = $state(1);

  // Connected platforms
  let connectedPlatforms = $state<string[]>([]);
  let connectingPlatform = $state<string | null>(null);

  // Registration data
  let registrationData = $state({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let registrationErrors = $state<Record<string, string>>({});
  let isRegistering = $state(false);

  // Consent state (moved to registration step)
  let consentChecks = $state({
    dataCollection: false,
    privacyPolicy: false,
    termsOfService: false,
  });

  // Platform icons (SVG paths)
  const platformIcons: Record<string, string> = {
    linkedin:
      "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    instagram:
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    reddit:
      "M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z",
    facebook:
      "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    twitter:
      "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
    github:
      "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
  };

  // Handle URL params for OAuth callbacks
  onMount(() => {
    const googleAuth = $page.url.searchParams.get("google_auth");
    const githubAuth = $page.url.searchParams.get("github_auth");
    const linkedinConnected = $page.url.searchParams.get("linkedin");
    const error = $page.url.searchParams.get("error");
    const step = $page.url.searchParams.get("step");

    if (error) {
      showError("Connection failed", error.replace(/_/g, " "));
    }

    if (googleAuth === "success" || githubAuth === "success") {
      const email = $page.url.searchParams.get("email") || "";
      const name = $page.url.searchParams.get("name") || "";

      // Auto-fill registration data from OAuth
      registrationData.email = email;
      registrationData.name = name;

      // If we have both name and email, we can consider moving to step 2 directly
      // but showing the form allows user to set a password
      if (email && name) {
        showSuccess(
          `Welcome ${name}`,
          "Please create a password to complete registration",
        );
      }
    }

    if (linkedinConnected === "connected") {
      connectedPlatforms = [...connectedPlatforms, "linkedin"];
      showSuccess("LinkedIn connected!", "Profile data imported");
    }

    if (step) {
      currentStep = parseInt(step);
    }
  });

  // Google sign-in
  function signInWithGoogle() {
    window.location.href = "/api/auth/google";
  }

  // GitHub sign-in
  function signInWithGithub() {
    window.location.href = "/api/auth/github";
  }

  // Validate registration form
  function validateRegistration(): boolean {
    registrationErrors = {};

    if (!registrationData.name.trim()) {
      registrationErrors.name = "Name is required";
    }
    if (!registrationData.email.trim()) {
      registrationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registrationData.email)) {
      registrationErrors.email = "Please enter a valid email";
    }
    if (!registrationData.password) {
      registrationErrors.password = "Password is required";
    } else if (registrationData.password.length < 8) {
      registrationErrors.password = "Password must be at least 8 characters";
    }
    if (registrationData.password !== registrationData.confirmPassword) {
      registrationErrors.confirmPassword = "Passwords do not match";
    }

    return Object.keys(registrationErrors).length === 0;
  }

  // Handle registration form submission
  async function handleRegistration(event: Event) {
    event.preventDefault();

    if (!validateRegistration()) return;

    // Check consent
    if (
      !consentChecks.dataCollection ||
      !consentChecks.privacyPolicy ||
      !consentChecks.termsOfService
    ) {
      showError("Consent required", "Please accept all terms to continue");
      return;
    }

    isRegistering = true;

    try {
      const success = await authStore.register({
        name: registrationData.name,
        email: registrationData.email,
        password: registrationData.password,
        acceptTerms: true,
        acceptDataConsent: true,
      });

      if (success) {
        showSuccess("Account created!", "Now let's connect your socials");
        currentStep = 2;
      }
    } catch {
      showError("Registration failed", "Please try again");
    } finally {
      isRegistering = false;
    }
  }

  // Connect a social platform
  async function connectPlatform(platformId: string) {
    connectingPlatform = platformId;

    try {
      // For LinkedIn/GitHub, redirect to OAuth
      if (platformId === "linkedin") {
        window.location.href = "/api/social/linkedin";
        return;
      }

      // For other platforms, simulate connection (mock mode)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (!connectedPlatforms.includes(platformId)) {
        connectedPlatforms = [...connectedPlatforms, platformId];
      }
      showSuccess("Connected!", `Successfully connected to ${platformId}`);
    } catch {
      showError("Connection failed", "Please try again");
    } finally {
      connectingPlatform = null;
    }
  }

  // Disconnect a platform
  function disconnectPlatform(platformId: string) {
    connectedPlatforms = connectedPlatforms.filter((p) => p !== platformId);
  }

  // Complete setup and go to chat
  async function completeSetup() {
    if (connectedPlatforms.length === 0) {
      // Allow proceeding without connection but show warning if desired
      // For now, requiring at least one connection as per previous logic
      showError("No connections", "Please connect at least one platform");
      return;
    }

    showSuccess("Twin created!", "Your digital twin is ready");
    goto("/app/chat");
  }

  // Check if can proceed from current step
  let canProceedStep1 = $derived(
    registrationData.name.trim() !== "" &&
      registrationData.email.trim() !== "" &&
      registrationData.password !== "" &&
      registrationData.password === registrationData.confirmPassword &&
      consentChecks.dataCollection &&
      consentChecks.privacyPolicy &&
      consentChecks.termsOfService,
  );

  let canProceedStep2 = $derived(connectedPlatforms.length > 0);
</script>

<svelte:head>
  <title>Create Your Twin - AuraAI</title>
</svelte:head>

<div class="min-h-screen bg-void-950">
  <Header />

  <main class="pt-20 pb-12 px-4">
    <div class="max-w-3xl mx-auto">
      <!-- Enhanced Progress indicator -->
      <div class="mb-16">
        <div class="relative">
          <!-- Progress bar background -->
          <div class="absolute top-8 left-0 right-0 h-1 bg-void-800 rounded-full mx-auto" style="width: calc(100% - 8rem);"></div>

          <!-- Animated progress bar -->
          <div
            class="absolute top-8 left-0 h-1 bg-gradient-to-r from-cosmic-600 to-cosmic-400 rounded-full transition-all duration-700 ease-out"
            style="width: calc({((currentStep - 1) / (TWIN_CREATION_STEPS.length - 1)) * 100}% * (100% - 8rem) / 100); margin-left: 4rem;"
          ></div>

          <!-- Steps -->
          <div class="relative flex items-center justify-between max-w-2xl mx-auto">
            {#each TWIN_CREATION_STEPS as step, index}
              <div class="flex flex-col items-center relative z-10">
                <!-- Step circle -->
                <div class="relative group">
                  <div
                    class="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-lg
                      transition-all duration-500 transform
                      {currentStep > step.id
                        ? 'bg-gradient-to-br from-cosmic-600 to-cosmic-500 text-white scale-100 shadow-glow'
                        : currentStep === step.id
                          ? 'bg-gradient-to-br from-cosmic-600/30 to-cosmic-500/30 border-2 border-cosmic-500 text-cosmic-400 scale-110 animate-pulse-slow shadow-glow-sm'
                          : 'bg-void-900/80 border-2 border-void-700 text-void-500 scale-90'}"
                  >
                    {#if currentStep > step.id}
                      <!-- Checkmark for completed steps -->
                      <svg
                        class="w-8 h-8 animate-scale-in"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    {:else if currentStep === step.id}
                      <!-- Icon for active step -->
                      {#if step.id === 1}
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      {:else}
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      {/if}
                    {:else}
                      <!-- Number for inactive steps -->
                      <span class="text-xl">{step.id}</span>
                    {/if}
                  </div>

                  <!-- Pulse effect for active step -->
                  {#if currentStep === step.id}
                    <div class="absolute inset-0 rounded-2xl bg-cosmic-500/20 animate-ping"></div>
                  {/if}
                </div>

                <!-- Step label -->
                <div class="mt-4 text-center transition-all duration-300">
                  <div
                    class="font-semibold text-sm
                      {currentStep >= step.id ? 'text-white' : 'text-void-500'}"
                  >
                    {step.name}
                  </div>
                  <div
                    class="text-xs mt-1
                      {currentStep === step.id ? 'text-cosmic-400' : 'text-void-600'}"
                  >
                    {currentStep > step.id
                      ? 'Completed'
                      : currentStep === step.id
                        ? 'In Progress'
                        : 'Pending'}
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Step content -->
      {#if currentStep === 1}
        <!-- Step 1: Registration -->
        <div class="animate-fade-in">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-white mb-3">
              Create Your Account
            </h1>
            <p class="text-void-300 max-w-lg mx-auto">
              Join AuraAI to create your personalized digital twin that
              understands you.
            </p>
          </div>

          <Card variant="glass" padding="lg">
            <!-- Social Sign-in Buttons -->
            <div class="grid sm:grid-cols-2 gap-4 mb-6">
              <button
                onclick={signInWithGoogle}
                class="flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-xl transition-all duration-200"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>

              <button
                onclick={signInWithGithub}
                class="flex items-center justify-center gap-3 px-4 py-3 bg-[#24292e] hover:bg-[#2b3137] text-white font-medium rounded-xl transition-all duration-200"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                GitHub
              </button>
            </div>

            <div class="relative mb-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-void-700"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-void-800 text-void-400"
                  >or register with email</span
                >
              </div>
            </div>

            <form onsubmit={handleRegistration} class="space-y-4">
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
                  placeholder="At least 8 characters"
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
              <div class="space-y-3 pt-4 border-t border-void-700">
                <label class="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    bind:checked={consentChecks.dataCollection}
                    class="mt-1 w-5 h-5 rounded border-void-600 bg-void-800 text-cosmic-500 focus:ring-cosmic-500"
                  />
                  <span class="text-sm text-void-300 group-hover:text-void-200">
                    I consent to the collection and analysis of my data to
                    create and maintain my digital twin.
                  </span>
                </label>

                <label class="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    bind:checked={consentChecks.privacyPolicy}
                    class="mt-1 w-5 h-5 rounded border-void-600 bg-void-800 text-cosmic-500 focus:ring-cosmic-500"
                  />
                  <span class="text-sm text-void-300 group-hover:text-void-200">
                    I have read and agree to the <a
                      href="/privacy"
                      class="text-cosmic-400 hover:underline">Privacy Policy</a
                    >.
                  </span>
                </label>

                <label class="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    bind:checked={consentChecks.termsOfService}
                    class="mt-1 w-5 h-5 rounded border-void-600 bg-void-800 text-cosmic-500 focus:ring-cosmic-500"
                  />
                  <span class="text-sm text-void-300 group-hover:text-void-200">
                    I agree to the <a
                      href="/terms"
                      class="text-cosmic-400 hover:underline"
                      >Terms of Service</a
                    >.
                  </span>
                </label>
              </div>

              <div class="flex justify-between pt-4">
                <Button variant="ghost" href="/">Back to Home</Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!canProceedStep1}
                  loading={isRegistering}
                >
                  Continue
                  <svg
                    class="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Button>
              </div>
            </form>
          </Card>
        </div>
      {:else if currentStep === 2}
        <!-- Step 2: Connect Social Platforms -->
        <div class="animate-fade-in">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-white mb-3">
              Connect Your World
            </h1>
            <p class="text-void-300 max-w-lg mx-auto">
              Link at least one account to help us understand your writing
              style, interests, and behavioral patterns.
            </p>
          </div>

          <div class="grid sm:grid-cols-2 gap-4 mb-8">
            {#each SOCIAL_PLATFORMS as platform}
              <Card
                variant={connectedPlatforms.includes(platform.id)
                  ? "glow"
                  : "default"}
                padding="md"
                hoverable
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-12 h-12 rounded-xl flex items-center justify-center"
                      style="background-color: {platform.color}20"
                    >
                      <svg
                        class="w-6 h-6"
                        style="color: {platform.color}"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={platformIcons[platform.id] || ""} />
                      </svg>
                    </div>
                    <div>
                      <div class="font-medium text-white">{platform.name}</div>
                      <div class="text-sm text-void-400">
                        {platform.description}
                      </div>
                    </div>
                  </div>

                  {#if connectedPlatforms.includes(platform.id)}
                    <button
                      class="px-3 py-1.5 text-sm text-emerald-400 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20 transition-colors"
                      onclick={() => disconnectPlatform(platform.id)}
                    >
                      ✓ Connected
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

          <!-- Connected count indicator -->
          <div class="text-center mb-6">
            <span class="text-sm text-void-400">
              {connectedPlatforms.length} of {SOCIAL_PLATFORMS.length} platforms
              connected
            </span>
            {#if connectedPlatforms.length === 0}
              <p class="text-xs text-void-500 mt-1">
                Connect at least one to continue
              </p>
            {/if}
          </div>

          <div class="flex justify-between">
            <Button variant="ghost" onclick={() => (currentStep = 1)}
              >Back</Button
            >
            <Button
              variant="primary"
              disabled={!canProceedStep2}
              onclick={completeSetup}
            >
              Start Chatting
              <svg
                class="w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
          </div>
        </div>
      {/if}
    </div>
  </main>
</div>
