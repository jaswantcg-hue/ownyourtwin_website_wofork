<script lang="ts">
    import {
        Mail,
        MapPin,
        Share2,
        Globe,
        Network,
        MessageSquare,
    } from "lucide-svelte";
    import { slide, fade } from "svelte/transition";
    import { quintOut } from "svelte/easing";

    let isHovered = $state(false);

    // Social links from provided design
    const socials = [
        { icon: Share2, label: "Share" },
        { icon: Globe, label: "Web" },
        { icon: Network, label: "Network" },
    ];
</script>

<div
    class="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex items-center group pointer-events-none"
    role="complementary"
    aria-label="Contact information"
    onmouseenter={() => (isHovered = true)}
    onmouseleave={() => (isHovered = false)}
>
    <!-- Trigger Icon (Floating) -->
    <div
        class="w-14 h-14 bg-gradient-to-r from-cosmic-600 to-cosmic-500 border border-cosmic-400/30 rounded-l-2xl flex items-center justify-center text-white cursor-pointer pointer-events-auto shadow-glow-sm hover:shadow-glow hover:from-cosmic-500 hover:to-cosmic-400 transition-all duration-300"
    >
        <MessageSquare class="w-6 h-6" />
    </div>

    <!-- Slide-out Panel -->
    <div
        class="fixed right-0 h-auto max-h-[80vh] w-[350px] bg-void-950/90 backdrop-blur-2xl border-l border-y border-cosmic-500/20 rounded-l-3xl p-8 shadow-2xl transition-all duration-500 ease-quint-out pointer-events-auto"
        style="transform: translateX({isHovered
            ? '0'
            : '100%'}); opacity: {isHovered ? '1' : '0'}; visibility: {isHovered
            ? 'visible'
            : 'hidden'}"
    >
        <!-- Background Gradient Glow -->
        <div
            class="absolute inset-0 bg-gradient-to-br from-cosmic-500/5 via-transparent to-ethereal-500/5 pointer-events-none"
        ></div>

        <div class="relative z-10">
            <h2 class="text-3xl font-bold text-white mb-2 leading-tight">
                Contact OwnYourTwin - <span class="text-cosmic-400"
                    >Minimalist</span
                >
            </h2>
            <p class="text-void-400 text-sm mb-10 leading-relaxed">
                Reach out to our digital proxy team for seamless integration and
                support.
            </p>

            <!-- Contact Items -->
            <div class="space-y-6 mb-12">
                <div class="flex items-start gap-4">
                    <div
                        class="w-10 h-10 rounded-xl bg-void-900 border border-void-800 flex items-center justify-center text-cosmic-500"
                    >
                        <Mail class="w-5 h-5" />
                    </div>
                    <div>
                        <h4 class="text-sm font-semibold text-white">
                            Email Us
                        </h4>
                        <a
                            href="mailto:hello@echora.io"
                            class="text-void-400 text-sm hover:text-cosmic-400 transition-colors"
                            >contact@ownyourtwin.com</a
                        >
                    </div>
                </div>

                <div class="flex items-start gap-4">
                    <div
                        class="w-10 h-10 rounded-xl bg-void-900 border border-void-800 flex items-center justify-center text-cosmic-500"
                    >
                        <MapPin class="w-5 h-5" />
                    </div>
                    <div>
                        <h4 class="text-sm font-semibold text-white">
                            Visit Us
                        </h4>
                        <p class="text-void-400 text-sm">
                            OwnYourTwin<br />
                            Bangalore, KA, India
                            <br />
                            Seattle, WA, US
                            <br />
                            Toronto, ON, Canada
                        </p>
                    </div>
                </div>
            </div>

            <!-- Socials -->
            <div>
                <h4 class="text-sm font-semibold text-white mb-4">
                    Follow the Proxy
                </h4>
                <div class="flex gap-3">
                    {#each socials as { icon: Icon, label }}
                        <button
                            class="w-10 h-10 rounded-full bg-void-900 border border-void-800 flex items-center justify-center text-void-400 hover:text-white hover:bg-void-800 hover:border-cosmic-500/30 transition-all duration-300"
                            aria-label={label}
                        >
                            <Icon class="w-5 h-5" />
                        </button>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    :global(.shadow-glow-sm) {
        box-shadow: 0 0 15px rgba(139, 92, 246, 0.2);
    }

    :global(.shadow-glow) {
        box-shadow: 0 0 25px rgba(139, 92, 246, 0.4);
    }

    .ease-quint-out {
        transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
    }
</style>
