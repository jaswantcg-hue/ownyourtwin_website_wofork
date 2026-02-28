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

          <!-- Forgot password link removed for restricted access -->

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

        <!-- Social login disabled -->
      </Card>

      <!-- Registration link removed -->
    </div>
  </main>
</div>
