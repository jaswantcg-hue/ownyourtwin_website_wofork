<!--
  Login Page
  User authentication page
-->
<script lang="ts">
  import { goto } from "$app/navigation";
  import { authStore, isAuthenticated } from "$lib/stores/auth";
  import { showSuccess, showError } from "$lib/stores/ui";
  import {
    validateLoginForm,
    hasErrors,
    type LoginFormData,
  } from "$lib/utils/validation";
  import { Header } from "$lib/components/layout";
  import { Button, Input, Card, Logo } from "$lib/components/common";

  // Form state
  let formData: LoginFormData = $state({
    email: "",
    password: "",
  });
  let errors: Record<string, string | undefined> = $state({});
  let isSubmitting = $state(false);
  let showPassword = $state(false);

  // Redirect if already authenticated
  $effect(() => {
    if ($isAuthenticated) {
      goto("/app/chat");
    }
  });

  // Handle form submission
  async function handleSubmit(event: Event) {
    event.preventDefault();

    // Validate
    errors = validateLoginForm(formData);
    if (hasErrors(errors)) return;

    isSubmitting = true;

    try {
      const success = await authStore.login({
        email: formData.email,
        password: formData.password,
        rememberMe: true,
      });

      if (success) {
        showSuccess("Welcome back!", "You have been signed in successfully.");
        goto("/app/chat");
      } else {
        showError(
          "Login failed",
          "Please check your credentials and try again.",
        );
      }
    } catch {
      showError("Something went wrong", "Please try again later.");
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Login - OwnYourTwin</title>
</svelte:head>

<div class="min-h-screen bg-void-950 flex flex-col">
  <Header />

  <main class="flex-1 flex items-center justify-center px-4 py-20">
    <div class="w-full max-w-md animate-fade-in">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <Logo size="lg" class="mx-auto mb-6" />
        <h1 class="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p class="text-void-400">Sign in to continue your journey</p>
      </div>

      <!-- Login Card -->
      <Card variant="glass" padding="lg">
        <form onsubmit={handleSubmit} class="space-y-6">
          <!-- Email -->
          <Input
            type="email"
            name="email"
            label="Email Address"
            placeholder="you@example.com"
            bind:value={formData.email}
            error={errors.email}
            autocomplete="email"
            required
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            {/snippet}
          </Input>

          <!-- Password -->
          <div class="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              placeholder="Enter your password"
              bind:value={formData.password}
              error={errors.password}
              autocomplete="current-password"
              required
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              {/snippet}
            </Input>
            <button
              type="button"
              class="absolute right-3 top-9 text-void-400 hover:text-white"
              onclick={() => (showPassword = !showPassword)}
            >
              {#if showPassword}
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
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              {:else}
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              {/if}
            </button>
          </div>

          <!-- Forgot password link -->
          <div class="flex justify-end">
            <a
              href="/forgot-password"
              class="text-sm text-cosmic-400 hover:text-cosmic-300"
            >
              Forgot password?
            </a>
          </div>

          <!-- Submit button -->
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isSubmitting}
          >
            Sign In
          </Button>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-void-700"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-void-800/40 text-void-400"
              >or continue with</span
            >
          </div>
        </div>

        <!-- Social login buttons -->
        <div class="grid grid-cols-2 gap-3">
          <button
            class="flex items-center justify-center gap-2 px-4 py-2.5 bg-void-700 hover:bg-void-600 rounded-xl transition-colors"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span class="text-sm text-white">GitHub</span>
          </button>
          <button
            class="flex items-center justify-center gap-2 px-4 py-2.5 bg-void-700 hover:bg-void-600 rounded-xl transition-colors"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.23 5.924c-.806.358-1.67.6-2.577.708a4.515 4.515 0 001.98-2.49 9.017 9.017 0 01-2.86 1.095 4.504 4.504 0 00-7.677 4.108 12.78 12.78 0 01-9.29-4.71 4.504 4.504 0 001.394 6.014 4.48 4.48 0 01-2.04-.563v.057a4.504 4.504 0 003.616 4.415 4.52 4.52 0 01-2.034.077 4.505 4.505 0 004.207 3.13 9.038 9.038 0 01-5.6 1.93c-.364 0-.724-.021-1.08-.063a12.746 12.746 0 006.904 2.023c8.28 0 12.81-6.86 12.81-12.81 0-.195-.004-.39-.013-.583a9.172 9.172 0 002.252-2.336"
              />
            </svg>
            <span class="text-sm text-white">Google</span>
          </button>
        </div>
      </Card>

      <!-- Sign up link -->
      <p class="text-center mt-6 text-void-400">
        Don't have an account?
        <a
          href="/create-twin"
          class="text-cosmic-400 hover:text-cosmic-300 font-medium"
        >
          Create your twin
        </a>
      </p>
    </div>
  </main>
</div>
