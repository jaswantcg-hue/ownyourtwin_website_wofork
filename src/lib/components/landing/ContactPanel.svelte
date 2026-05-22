<!--
  Contact Panel — OwnYourTwin Redesign
  Slide-out panel on right edge, updated to monochrome + clay theme
-->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  let isHovered = $state(false);
  let panelElement: HTMLElement;
  
  // Form state
  let showForm = $state(false);
  let contactEmail = $state("");
  let contactMessage = $state("");
  let isSubmitting = $state(false);
  let isSuccess = $state(false);

  function openContact() {
    isHovered = true;
  }

  function handleOutsideClick(e: MouseEvent) {
    if (isHovered && panelElement && !panelElement.contains(e.target as Node)) {
      isHovered = false;
      // Reset form if closed by outside click (optional, but good UX)
      setTimeout(() => {
        if (!isSuccess && !isSubmitting) showForm = false;
      }, 300);
    }
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!contactEmail || !contactMessage) return;
    
    isSubmitting = true;
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    isSubmitting = false;
    isSuccess = true;
    
    // Auto reset after 3 seconds
    setTimeout(() => {
      isHovered = false;
      setTimeout(() => {
        showForm = false;
        isSuccess = false;
        contactEmail = "";
        contactMessage = "";
      }, 300);
    }, 3000);
  }

  onMount(() => {
    window.addEventListener("openContact", openContact);
    window.addEventListener("click", handleOutsideClick);
  });

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("openContact", openContact);
      window.removeEventListener("click", handleOutsideClick);
    }
  });
</script>

<div
  bind:this={panelElement}
  class="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex items-center"
  role="complementary"
  aria-label="Contact information"
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => { if (!showForm && !isSuccess) isHovered = false; }}
>
  <!-- Tab trigger -->
  <div
    style="
    width:48px; height:48px;
    background:#111111;
    border-radius:10px 0 0 10px;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer;
    box-shadow:-4px 0 16px rgba(0,0,0,0.15);
    transition:background 0.2s;
  "
    onmouseenter={(e) =>
      ((e.currentTarget as HTMLElement).style.background = "#c4856a")}
    onmouseleave={(e) =>
      ((e.currentTarget as HTMLElement).style.background = "#111111")}
  >
    <svg
      width="18"
      height="18"
      fill="none"
      stroke="#ffffff"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  </div>

  <!-- Slide-out panel -->
  <div
    style="
    position:fixed;
    right:0;
    top:50%;
    transform: translateY(-50%) translateX({isHovered ? '0' : '100%'});
    opacity:{isHovered ? '1' : '0'};
    visibility:{isHovered ? 'visible' : 'hidden'};
    width:320px;
    background:#ffffff;
    border:1px solid #e0e0e0;
    border-radius:16px 0 0 16px;
    padding:32px 28px;
    box-shadow:-8px 0 32px rgba(0,0,0,0.1);
    transition:transform 0.35s ease, opacity 0.35s ease;
    z-index:100;
  "
  >
    {#if isSuccess}
      <!-- Success View -->
      <div class="flex flex-col items-center justify-center h-full text-center py-10 animate-fade-in">
        <div class="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h2 style="font-family:'Montserrat',sans-serif; font-weight:700; font-size:1.1rem; color:#111111; margin-bottom:12px;">
          Message Sent!
        </h2>
        <p style="font-family:'Lora',serif; font-size:0.9rem; color:#555555; line-height:1.6;">
          Thank you for reaching out. We'll get back to you shortly.
        </p>
      </div>

    {:else if showForm}
      <!-- Form View -->
      <div class="animate-fade-in flex flex-col h-full">
        <h2 style="font-family:'Montserrat',sans-serif; font-weight:700; font-size:1.1rem; color:#111111; margin-bottom:6px;">
          Send a Message
        </h2>
        <p style="font-family:'Lora',serif; font-style:italic; font-size:0.85rem; color:#888888; margin-bottom:24px; line-height:1.6;">
          We'd love to hear from you. Fill out the form below.
        </p>

        <form onsubmit={handleSubmit} class="flex-1 flex flex-col gap-4">
          <div>
            <label for="email" style="display:block; font-family:'Montserrat',sans-serif; font-size:0.75rem; font-weight:600; color:#555555; margin-bottom:6px;">Email Address</label>
            <input 
              type="email" 
              id="email"
              bind:value={contactEmail} 
              required
              placeholder="you@example.com"
              style="width:100%; padding:10px 12px; border:1px solid #e0e0e0; border-radius:8px; font-family:'Lora',serif; font-size:0.9rem; color:#111111; outline:none; transition:border-color 0.2s;"
              onfocus={(e) => (e.currentTarget.style.borderColor = '#c4856a')}
              onblur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
            />
          </div>
          <div>
            <label for="message" style="display:block; font-family:'Montserrat',sans-serif; font-size:0.75rem; font-weight:600; color:#555555; margin-bottom:6px;">Message</label>
            <textarea 
              id="message"
              bind:value={contactMessage} 
              required
              rows="4"
              placeholder="How can we help you?"
              style="width:100%; padding:10px 12px; border:1px solid #e0e0e0; border-radius:8px; font-family:'Lora',serif; font-size:0.9rem; color:#111111; outline:none; resize:none; transition:border-color 0.2s;"
              onfocus={(e) => (e.currentTarget.style.borderColor = '#c4856a')}
              onblur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
            ></textarea>
          </div>
          
          <div class="mt-auto pt-4 flex gap-3">
            <button
              type="button"
              onclick={(e) => { e.stopPropagation(); showForm = false; }}
              style="flex:1; padding:0.7rem; border:1px solid #e0e0e0; border-radius:8px; background:transparent; font-family:'Montserrat',sans-serif; font-size:0.875rem; font-weight:600; color:#555555; cursor:pointer; transition:all 0.2s;"
              onmouseenter={(e) => (e.currentTarget.style.background = '#f8f8f8')}
              onmouseleave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              class="btn-clay"
              style="flex:1; justify-content:center; font-size:0.875rem; padding:0.7rem;"
            >
              {#if isSubmitting}
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {:else}
                Send
              {/if}
            </button>
          </div>
        </form>
      </div>

    {:else}
      <!-- Default Info View -->
      <div class="animate-fade-in flex flex-col h-full">
        <h2
          style="font-family:'Montserrat',sans-serif; font-weight:700; font-size:1.1rem; color:#111111; margin-bottom:6px;"
        >
          Get in Touch
        </h2>
        <p
          style="font-family:'Lora',serif; font-style:italic; font-size:0.85rem; color:#888888; margin-bottom:24px; line-height:1.6;"
        >
          Reach out to our team for questions, support, or just to say hello.
        </p>

        <!-- Email -->
        <div
          style="display:flex; align-items:flex-start; gap:14px; margin-bottom:20px;"
        >
          <div
            style="
            width:38px; height:38px; flex-shrink:0;
            border-radius:9px; background:#f0f0f0;
            display:flex; align-items:center; justify-content:center;
          "
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="#555555"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <div
              style="font-family:'Montserrat',sans-serif; font-size:0.75rem; font-weight:600; color:#aaaaaa; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:3px;"
            >
              Email
            </div>
            <a
              href="mailto:contact@ownyourtwin.com"
              style="font-family:'Lora',serif; font-size:0.85rem; color:#555555; text-decoration:none; transition:color 0.2s;"
              onmouseenter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#c4856a")}
              onmouseleave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#555555")}
              >contact@ownyourtwin.com</a
            >
          </div>
        </div>

        <!-- Location -->
        <div
          style="display:flex; align-items:flex-start; gap:14px; margin-bottom:24px;"
        >
          <div
            style="
            width:38px; height:38px; flex-shrink:0;
            border-radius:9px; background:#f0f0f0;
            display:flex; align-items:center; justify-content:center;
          "
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="#555555"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <div
              style="font-family:'Montserrat',sans-serif; font-size:0.75rem; font-weight:600; color:#aaaaaa; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:3px;"
            >
              Offices
            </div>
            <p
              style="font-family:'Lora',serif; font-size:0.85rem; color:#555555; line-height:1.6; margin:0;"
            >
              Seattle, WA, US<br />
              Toronto, ON, Canada<br />
              Bangalore, India
            </p>
          </div>
        </div>

        <!-- Divider -->
        <div style="height:1px; background:#f0f0f0; margin-bottom:20px;"></div>

        <!-- CTA -->
        <button
          class="btn-clay mt-auto"
          onclick={(e) => { e.stopPropagation(); showForm = true; }}
          style="width:100%; justify-content:center; font-size:0.875rem; padding:0.7rem 1rem;"
        >
          Send a Message
        </button>
      </div>
    {/if}
  </div>
</div>
