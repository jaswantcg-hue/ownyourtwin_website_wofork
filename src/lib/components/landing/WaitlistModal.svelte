<!--
  Waitlist Modal Component
  Form for users to join the waitlist
-->
<script lang="ts">
  import Modal from '../common/Modal.svelte';
  import Button from '../common/Button.svelte';
  import Input from '../common/Input.svelte';
  import { validateWaitlistForm, type WaitlistFormData, hasErrors } from '$lib/utils/validation';
  import { showSuccess, showError } from '$lib/stores/ui';

  interface Props {
    /** Whether modal is open */
    open?: boolean;
    /** Close handler */
    onclose?: () => void;
  }

  let {
    open = $bindable(false),
    onclose,
  }: Props = $props();

  // Form state
  let formData: WaitlistFormData = $state({
    name: '',
    email: '',
    reason: '',
  });

  let errors: Record<string, string | undefined> = $state({});
  let isSubmitting = $state(false);
  let isSubmitted = $state(false);

  // Handle form submission
  async function handleSubmit(event: Event) {
    event.preventDefault();

    // Validate form
    errors = validateWaitlistForm(formData);
    if (hasErrors(errors)) return;

    isSubmitting = true;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      isSubmitted = true;
      showSuccess('You\'re on the list!', 'We\'ll notify you when we\'re ready.');

      // Reset after delay
      setTimeout(() => {
        open = false;
        isSubmitted = false;
        formData = { name: '', email: '', reason: '' };
      }, 2000);
    } catch {
      showError('Something went wrong', 'Please try again later.');
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
  title={isSubmitted ? '' : 'Join the Waitlist'}
  size="md"
  onclose={handleClose}
  closeOnBackdrop={!isSubmitting}
>
  {#if isSubmitted}
    <!-- Success state -->
    <div class="text-center py-8">
      <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
        <svg class="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-white mb-2">You're on the list!</h3>
      <p class="text-void-300">We'll notify you when your spot is ready.</p>
    </div>
  {:else}
    <!-- Form -->
    <form onsubmit={handleSubmit} class="space-y-6">
      <p class="text-void-300 mb-6">
        Be among the first to experience the future of self-understanding. Join our exclusive waitlist and get early access.
      </p>

      <Input
        name="name"
        label="Your Name"
        placeholder="Enter your name"
        bind:value={formData.name}
        error={errors.name}
        required
      >
        {#snippet icon()}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        {/snippet}
      </Input>

      <div>
        <label for="reason" class="block text-sm font-medium text-void-200 mb-2">
          What excites you most about AuraAI?
          <span class="text-void-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="reason"
          name="reason"
          rows="3"
          placeholder="Tell us why you're interested..."
          bind:value={formData.reason}
          class="
            w-full px-4 py-3 rounded-xl
            bg-void-800/50 border border-void-600
            text-white placeholder-void-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            focus:border-cosmic-500 focus:ring-cosmic-500/20
            resize-none
          "
        />
      </div>

      <div class="flex justify-end gap-3 pt-4">
        <Button
          variant="ghost"
          onclick={handleClose}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
        >
          {#snippet icon()}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          {/snippet}
          Join Waitlist
        </Button>
      </div>
    </form>
  {/if}
</Modal>
