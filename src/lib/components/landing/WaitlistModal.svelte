<!--
  Sign Up for Early Access Modal (formerly WaitlistModal)
  Collects demo request with name, email, phone, and interests
-->
<script lang="ts">
  import Modal from "../common/Modal.svelte";
  import Button from "../common/Button.svelte";
  import Input from "../common/Input.svelte";
  import { showSuccess, showError } from "$lib/stores/ui";

  interface Props {
    /** Whether modal is open */
    open?: boolean;
    /** Close handler */
    onclose?: () => void;
  }

  let { open = $bindable(false), onclose }: Props = $props();

  // Form state
  let formData = $state({
    name: "",
    email: "",
    phone: "",
    interests: "",
  });

  let errors: Record<string, string | undefined> = $state({});
  let isSubmitting = $state(false);
  let isSubmitted = $state(false);

  // Simple validation
  function validateForm(): Record<string, string | undefined> {
    const errs: Record<string, string | undefined> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Invalid email address";
    // Phone is optional, but validate format if provided
    if (formData.phone && !/^[\d\s\-\+\(\)]{7,20}$/.test(formData.phone))
      errs.phone = "Invalid phone number";
    return errs;
  }

  function hasErrors(errs: Record<string, string | undefined>): boolean {
    return Object.values(errs).some(Boolean);
  }

  // Handle form submission
  async function handleSubmit(event: Event) {
    event.preventDefault();

    // Validate form
    errors = validateForm();
    if (hasErrors(errors)) return;

    isSubmitting = true;

    try {
      const response = await fetch("/api/request-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      // Success
      isSubmitted = true;
      showSuccess(
        "We've received your request!",
        "Our team will reach out to you shortly.",
      );

      // Reset after delay
      setTimeout(() => {
        open = false;
        isSubmitted = false;
        formData = { name: "", email: "", phone: "", interests: "" };
      }, 2500);
    } catch {
      showError("Something went wrong", "Please try again later.");
    } finally {
      isSubmitting = false;
    }
  }

  // Handle modal close
  function handleClose() {
    if (!isSubmitting) {
      open = false;
      onclose?.();
    }
  }
</script>

<Modal
  bind:open
  title={isSubmitted ? "" : "Sign Up for Early Access"}
  size="md"
  onclose={handleClose}
  closeOnBackdrop={!isSubmitting}
>
  {#if isSubmitted}
    <!-- Success state -->
    <div class="text-center py-8">
      <div
        class="w-20 h-20 mx-auto mb-6 rounded-full bg-ethereal-500/20 flex items-center justify-center"
      >
        <svg
          class="w-10 h-10 text-ethereal-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-white mb-2">Thank you!</h3>
      <p class="text-void-300">
        We'll reach out to you shortly to schedule your demo.
      </p>
    </div>
  {:else}
    <!-- Form -->
    <form onsubmit={handleSubmit} class="space-y-5">
      <p class="text-void-300 mb-4">
        Share your details and we'll show you how Digital Twins can transform
        your relationship with data.
      </p>

      <Input
        name="name"
        label="Your Name"
        placeholder="Enter your full name"
        bind:value={formData.name}
        error={errors.name}
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        {/snippet}
      </Input>

      <Input
        type="email"
        name="email"
        label="Email Address"
        placeholder="you@example.com"
        bind:value={formData.email}
        error={errors.email}
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

      <Input
        type="tel"
        name="phone"
        label="Phone Number"
        placeholder="+1 (555) 000-0000"
        bind:value={formData.phone}
        error={errors.phone}
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
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        {/snippet}
      </Input>

      <div>
        <label
          for="interests"
          class="block text-sm font-medium text-void-200 mb-2"
        >
          Tell us what interests you.
          <span class="text-void-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="interests"
          name="interests"
          rows="3"
          placeholder="What are you hoping to learn about Digital Twins?"
          bind:value={formData.interests}
          class="
            w-full px-4 py-3 rounded-xl
            bg-void-800/50 border border-void-600
            text-white placeholder-void-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            focus:border-cosmic-500 focus:ring-cosmic-500/20
            resize-none
          "
        >
        </textarea>
      </div>

      <!-- Trust badges -->
      <div
        class="flex items-center justify-center gap-4 py-3 border-t border-b border-void-700/50"
      >
        <div class="flex items-center gap-1.5 text-xs text-void-400">
          <svg
            class="w-3.5 h-3.5 text-ethereal-400"
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
          <span>Encrypted</span>
        </div>
        <div class="flex items-center gap-1.5 text-xs text-void-400">
          <svg
            class="w-3.5 h-3.5 text-ethereal-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>GDPR Compliant</span>
        </div>
        <div class="flex items-center gap-1.5 text-xs text-void-400">
          <svg
            class="w-3.5 h-3.5 text-ethereal-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
          <span>No spam, ever</span>
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-2">
        <Button variant="ghost" onclick={handleClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={isSubmitting}>
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
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          {/snippet}
          Sign Up for Early Access
        </Button>
      </div>
    </form>
  {/if}
</Modal>
