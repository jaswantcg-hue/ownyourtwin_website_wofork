<!--
  Sign Up for Early Access Modal (formerly WaitlistModal)
  Monochrome + clay design system
-->
<script lang="ts">
  import Modal from "../common/Modal.svelte";
  import Button from "../common/Button.svelte";
  import Input from "../common/Input.svelte";
  import { showSuccess, showError } from "$lib/stores/ui";

  const demoMode = import.meta.env.VITE_DEMO_MODE === "true";

  interface Props {
    open?: boolean;
    onclose?: () => void;
  }

  let { open = $bindable(false), onclose }: Props = $props();

  let formData = $state({ name: "", email: "", phone: "", interests: "" });
  let errors: Record<string, string | undefined> = $state({});
  let isSubmitting = $state(false);
  let isSubmitted = $state(false);

  function validateForm(): Record<string, string | undefined> {
    const errs: Record<string, string | undefined> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Invalid email address";
    if (formData.phone && !/^[\d\s\-\+\(\)]{7,20}$/.test(formData.phone))
      errs.phone = "Invalid phone number";
    return errs;
  }

  function hasErrors(errs: Record<string, string | undefined>): boolean {
    return Object.values(errs).some(Boolean);
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    errors = validateForm();
    if (hasErrors(errors)) return;
    isSubmitting = true;
    try {
      const response = demoMode
        ? new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
        : await fetch("/api/request-demo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        if (response.status === 409 && body.field === 'email') {
          errors = { ...errors, email: 'This email is already registered' };
          return;
        }
        throw new Error("Failed to submit");
      }
      isSubmitted = true;
      showSuccess(
        demoMode ? "Demo submission successful" : "We've received your request!",
        demoMode
          ? "This demo request wasn't saved or sent."
          : "Our team will reach out to you shortly.",
      );
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
    <div style="text-align:center; padding:32px 0;">
      <div style="
        width:72px; height:72px;
        border-radius:50%;
        background:#f5ece7;
        display:flex; align-items:center; justify-content:center;
        margin:0 auto 20px;
      ">
        <svg width="32" height="32" fill="none" stroke="#c4856a" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h3 style="font-family:'Montserrat',sans-serif; font-weight:800; font-size:1.5rem; color:#111111; margin-bottom:8px;">{demoMode ? "Demo complete!" : "Thank you!"}</h3>
      <p style="font-family:'Lora',serif; font-style:italic; color:#888888; font-size:1rem;">
        {demoMode
          ? "This demo submission wasn't saved or sent."
          : "We've received your request. Our team will reach out shortly."}
      </p>
    </div>
  {:else}
    <!-- Form -->
    <form onsubmit={handleSubmit}>
      <p style="font-family:'Lora',serif; font-style:italic; font-size:0.95rem; color:#888888; margin-bottom:24px; line-height:1.65;">
        Share your details and we'll show you how Digital Twins can transform your relationship with data.
      </p>
      {#if demoMode}
        <p role="status" style="font-family:'Montserrat',sans-serif; font-size:0.8rem; color:#8a5b16; background:#fff8e8; border:1px solid #f0dfb5; border-radius:8px; padding:10px 12px; margin-bottom:16px;">
          Demo mode: submissions are not saved or sent.
        </p>
      {/if}

      <Input
        name="name"
        label="Your Name"
        placeholder="Enter your full name"
        bind:value={formData.name}
        error={errors.name}
        required
      >
        {#snippet icon()}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        {/snippet}
      </Input>

      <div style="margin-top:16px;">
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          {/snippet}
        </Input>
      </div>

      <div style="margin-top:16px;">
        <Input
          type="tel"
          name="phone"
          label="Phone Number"
          placeholder="+1 (555) 000-0000"
          bind:value={formData.phone}
          error={errors.phone}
        >
          {#snippet icon()}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          {/snippet}
        </Input>
      </div>

      <div style="margin-top:16px;">
        <label
          for="interests"
          style="display:block; font-family:'Montserrat',sans-serif; font-size:0.82rem; font-weight:600; color:#555555; margin-bottom:8px;"
        >
          What interests you? <span style="font-weight:400; color:#aaaaaa;">(optional)</span>
        </label>
        <textarea
          id="interests"
          name="interests"
          rows="3"
          placeholder="What are you hoping to learn about Digital Twins?"
          bind:value={formData.interests}
          style="
            width:100%; padding:12px 16px; border-radius:10px;
            border:1px solid #e0e0e0; background:#f8f8f6;
            color:#111111; font-family:'Lora',serif; font-size:0.9rem;
            line-height:1.6; resize:none; outline:none;
            transition:border-color 0.2s; box-sizing:border-box;
          "
          onfocus={(e) => (e.currentTarget as HTMLTextAreaElement).style.borderColor = '#c4856a'}
          onblur={(e) => (e.currentTarget as HTMLTextAreaElement).style.borderColor = '#e0e0e0'}
        ></textarea>
      </div>

      <!-- Trust badges -->
      <div style="
        display:flex; align-items:center; justify-content:center;
        gap:20px; padding:14px 0; margin:16px 0;
        border-top:1px solid #f0f0f0; border-bottom:1px solid #f0f0f0;
        flex-wrap:wrap;
      ">
        <div style="display:flex; align-items:center; gap:6px;">
          <svg width="13" height="13" fill="none" stroke="#c4856a" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          <span style="font-family:'Montserrat',sans-serif; font-size:0.72rem; font-weight:500; color:#aaaaaa;">Encrypted</span>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <svg width="13" height="13" fill="none" stroke="#c4856a" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
          <span style="font-family:'Montserrat',sans-serif; font-size:0.72rem; font-weight:500; color:#aaaaaa;">GDPR Compliant</span>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <svg width="13" height="13" fill="none" stroke="#c4856a" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/>
          </svg>
          <span style="font-family:'Montserrat',sans-serif; font-size:0.72rem; font-weight:500; color:#aaaaaa;">No spam</span>
        </div>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:12px; padding-top:4px;">
        <button
          type="button"
          onclick={handleClose}
          disabled={isSubmitting}
          class="btn-outline"
          style="padding:0.65rem 1.5rem; font-size:0.9rem;"
        >Cancel</button>
        <button
          type="submit"
          class="btn-clay"
          disabled={isSubmitting}
          style="padding:0.65rem 1.75rem; font-size:0.9rem;"
        >
          {#if isSubmitting}
            <svg style="width:16px; height:16px; animation:spin 1s linear infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
          {/if}
          Sign Up for Early Access
        </button>
      </div>
    </form>
  {/if}
</Modal>

<style>
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
</style>
