<!--
  Footer — OwnYourTwin Redesign
  CTA strip on off-white, then a black footer with legible light-grey text
-->
<script lang="ts">
  import { base } from "$app/paths";
  import { Logo } from "$lib/components/common";

  interface Props {
    onDemoClick?: () => void;
  }
  let { onDemoClick }: Props = $props();

  const currentYear = new Date().getFullYear();
  const withBase = (href: string) => (href.startsWith("/") ? `${base}${href}` : href);

  const footerLinks = {
    product: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "For Individuals", href: "#for-individuals" },
      { label: "For Businesses", href: "/forBusiness" },
      { label: "Blog", href: "/blog" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "/ContactPanel" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Data Rights", href: "#" },
    ],
  };

  const socials = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/ownyourtwin",
      icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z",
    },
    // {
    //   label: "Twitter/X",
    //   href: "#",
    //   icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    // },
    // {
    //   label: "GitHub",
    //   href: "#",
    //   icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
    // },
  ];

  function handleSmoothScroll(e: Event, href: string) {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
</script>

<!-- Footer CTA strip (off-white) -->
<div
  style="
  background-color: #f8f8f6;
  padding: 80px 24px;
  text-align: center;
  border-top: 1px solid #e0e0e0;
"
>
  <div style="max-width:640px; margin:0 auto;">
    <div
      style="display:flex; align-items:center; justify-content:center; gap:16px; margin-bottom:20px;"
    >
      <div style="width:40px; height:1px; background:#e0e0e0;"></div>
      <span class="section-label">Ready to begin?</span>
      <div style="width:40px; height:1px; background:#e0e0e0;"></div>
    </div>
    <h3
      style="
      font-family:'Montserrat',sans-serif;
      font-weight:800;
      font-size:clamp(1.6rem,3vw,2.4rem);
      color:#111111;
      letter-spacing:-0.02em;
      line-height:1.2;
      margin-bottom:16px;
    "
    >
      See how your Twin can<br />work for you.
    </h3>
    <p
      style="
      font-family:'Lora',serif;
      font-style:italic;
      font-size:1rem;
      color:#888888;
      margin-bottom:32px;
      line-height:1.6;
    "
    >
      Join the early access list. Be among the first to experience data
      ownership the way it should be.
    </p>
    <button
      class="btn-clay"
      onclick={onDemoClick}
      style="font-size:1rem; padding:0.9rem 2.4rem;"
    >
      Sign Up for Early Access
    </button>
  </div>
</div>

<!-- Main footer (black) -->
<footer
  style="
  background-color: #111111;
  padding: 64px 24px 32px;
"
>
  <div style="max-width:1200px; margin:0 auto;">
    <!-- Top: brand + links -->
    <div
      style="
      display:grid;
      grid-template-columns:2fr 1fr 1fr 1fr;
      gap:48px;
      margin-bottom:48px;
      padding-bottom:48px;
      border-bottom:1px solid #2a2a2a;
    "
    >
      <!-- Brand -->
      <div>
        <div style="margin-bottom:16px;">
          <Logo size="sm" invertForDark={true} />
        </div>
        <p
          style="
          font-family:'Lora',serif;
          font-size:0.875rem;
          color:#aaaaaa;
          line-height:1.65;
          margin-bottom:20px;
          max-width:280px;
        "
        >
          Own Your Data. Earn From It. Create an AI-powered Digital Twin that
          gives you control of your data and earns you value.
        </p>
        <!-- Trust note -->
        <div
          style="display:flex; align-items:center; gap:8px; margin-bottom:20px;"
        >
          <svg
            width="13"
            height="13"
            fill="none"
            stroke="#c4856a"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span
            style="font-family:'Montserrat',sans-serif; font-size:0.72rem; font-weight:500; color:#888888;"
            >Your data is never sold. Ever.</span
          >
        </div>

        <!-- Contact Info -->
        <div style="margin-bottom: 28px;">
          <div style="display: flex; gap: 12px; align-items: flex-start; margin-bottom: 14px;">
             <span style="font-family:'Montserrat',sans-serif; font-size:0.75rem; font-weight:600; color:#aaaaaa; text-transform:uppercase; letter-spacing:0.1em; width: 65px; margin-top:2px;">Email</span>
             <a 
               href="mailto:contact@ownyourtwin.com" 
               style="font-family:'Lora',serif; font-size:0.9rem; color:#888888; text-decoration:none; transition:color 0.2s;" 
               onmouseenter={(e) => ((e.currentTarget as HTMLElement).style.color = '#ffffff')} 
               onmouseleave={(e) => ((e.currentTarget as HTMLElement).style.color = '#888888')}
             >
               contact@ownyourtwin.com
             </a>
          </div>
          <div style="display: flex; gap: 12px; align-items: flex-start;">
             <span style="font-family:'Montserrat',sans-serif; font-size:0.75rem; font-weight:600; color:#aaaaaa; text-transform:uppercase; letter-spacing:0.1em; width: 65px; margin-top:2px;">Offices</span>
             <div style="font-family:'Lora',serif; font-size:0.9rem; color:#888888; line-height:1.6;">
               Seattle, WA, US<br/>
               Toronto, ON, Canada<br/>
               Bangalore, India
             </div>
          </div>
        </div>
        <!-- Socials -->
        <div style="display:flex; gap:10px;">
          {#each socials as social}
            <a
              href={social.href}
              aria-label={social.label}
              class="social-link"
              style="
                width:34px; height:34px;
                border-radius:8px;
                background:#1e1e1e;
                border:1px solid #2e2e2e;
                display:flex; align-items:center; justify-content:center;
                transition:all 0.2s;
              "
            >
              <svg
                style="width:14px;height:14px;"
                fill="#888888"
                viewBox="0 0 24 24"
              >
                <path d={social.icon} />
              </svg>
            </a>
          {/each}
        </div>
      </div>

      <!-- Product links -->
      <div>
        <h4
          style="
          font-family:'Montserrat',sans-serif;
          font-size:0.68rem;
          font-weight:700;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:#666666;
          margin-bottom:20px;
        "
        >
          Product
        </h4>
        <ul
          style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:12px;"
        >
          {#each footerLinks.product as link}
            <li>
              <a
                href={withBase(link.href)}
                onclick={(e) => handleSmoothScroll(e, link.href)}
                class="footer-link">{link.label}</a
              >
            </li>
          {/each}
        </ul>
      </div>

      <!-- Company links -->
      <div>
        <h4
          style="
          font-family:'Montserrat',sans-serif;
          font-size:0.68rem;
          font-weight:700;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:#666666;
          margin-bottom:20px;
        "
        >
          Company
        </h4>
        <ul
          style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:12px;"
        >
          {#each footerLinks.company as link}
            <li>
              {#if link.label === "Contact"}
                <a 
                  href={withBase(link.href)}
                  class="footer-link"
                  onclick={(e) => { e.preventDefault(); e.stopPropagation(); window.dispatchEvent(new CustomEvent('openContact')); }}
                >{link.label}</a>
              {:else}
                <a href={withBase(link.href)} class="footer-link">{link.label}</a>
              {/if}
            </li>
          {/each}
        </ul>
      </div>

      <!-- Legal links -->
      <div>
        <h4
          style="
          font-family:'Montserrat',sans-serif;
          font-size:0.68rem;
          font-weight:700;
          letter-spacing:0.18em;
          text-transform:uppercase;
          color:#666666;
          margin-bottom:20px;
        "
        >
          Legal
        </h4>
        <ul
          style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:12px;"
        >
          {#each footerLinks.legal as link}
            <li>
              <a href={withBase(link.href)} class="footer-link">{link.label}</a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Bottom bar -->
    <div
      style="
      display:flex;
      flex-wrap:wrap;
      align-items:center;
      justify-content:space-between;
      gap:16px;
    "
    >
      <p
        style="font-family:'Montserrat',sans-serif; font-size:0.72rem; color:#666666; margin:0;"
      >
        &copy; {currentYear} OwnYourTwin. All rights reserved. Your data is encrypted,
        protected, and always yours.
      </p>
      <div style="display:flex; gap:20px;">
        <a href={withBase("/privacy")} class="footer-link-sm">Privacy</a>
        <a href={withBase("/terms")} class="footer-link-sm">Terms</a>
        <a href={withBase("/cookies")} class="footer-link-sm">Cookies</a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer-link {
    font-family: "Montserrat", sans-serif;
    font-size: 0.875rem;
    color: #aaaaaa;
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-link:hover {
    color: #ffffff;
  }

  .footer-link-sm {
    font-family: "Montserrat", sans-serif;
    font-size: 0.72rem;
    color: #666666;
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer-link-sm:hover {
    color: #aaaaaa;
  }

  .social-link:hover {
    background: #2a2a2a !important;
    border-color: #c4856a !important;
  }
  .social-link:hover svg {
    fill: #ffffff !important;
  }

  @media (max-width: 768px) {
    footer > div > div:first-child {
      grid-template-columns: 1fr 1fr !important;
    }
    footer > div > div:first-child > div:first-child {
      grid-column: span 2;
    }
  }
</style>
