<!--
  MediaTestimonials Component
  Combines the Explainer Video (Right) and User Stories (Left)
  Left side: Testimonials stacked vertically
  Right side: Explainer video (sticky)
-->
<script lang="ts">
    interface Props {
        /** Handler for opening demo request modal */
        onDemoClick?: () => void;
    }

    let { onDemoClick }: Props = $props();

    const testimonials = [
        {
            quote: "I finally feel like my data is working for me, not against me. The privacy controls are incredible. I choose exactly what gets shared.",
            name: "Sarah M.",
            role: "Early Adopter",
            avatar: "👩‍💻",
            highlight: "Privacy controls",
        },
        {
            quote: "What impressed me most was the transparency. I see every request, every earning, every byte of data my Twin shares. No surprises.",
            name: "David R.",
            role: "Beta Tester",
            avatar: "👨‍🔬",
            highlight: "Full transparency",
        },
        {
            quote: "As a business, the quality of insights from Digital Twins is miles ahead of traditional surveys. The data is genuine because users are actually engaged.",
            name: "Priya K.",
            role: "Product Manager",
            avatar: "👩‍💼",
            highlight: "Better insights",
        },
    ];
</script>

<section class="py-24 relative overflow-hidden">
    <!-- Background -->
    <div
        class="absolute inset-0 bg-gradient-to-b from-void-950 via-void-900 to-void-950"
    ></div>
    <div
        class="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-cosmic-600/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    ></div>

    <div class="container mx-auto px-4 relative z-10 max-w-7xl">
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <!-- LEFT COLUMN: Reviews (User Stories) -->
            <div class="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-6">
                <div class="mb-4 lg:mb-8 animate-fade-in">
                    <div
                        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-500/10 border border-cosmic-500/30 mb-6"
                    >
                        <span class="text-sm text-cosmic-300 font-medium"
                            >What People Are Saying</span
                        >
                    </div>
                    <h2 class="text-3xl font-bold text-white mb-4">
                        Hear from our <span
                            class="bg-gradient-to-r from-cosmic-400 to-ethereal-400 bg-clip-text text-transparent"
                            >early adopters</span
                        >
                    </h2>
                </div>

                <div class="flex flex-col gap-6">
                    {#each testimonials as testimonial, index}
                        <div
                            class="relative p-6 sm:p-8 rounded-3xl bg-void-800/40 border border-void-700/50 hover:border-cosmic-500/30 transition-all duration-300 animate-fade-in group hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-cosmic-500/10"
                            style="animation-delay: {index * 150}ms"
                        >
                            <!-- Highlight badge -->
                            <div
                                class="absolute top-6 right-6 inline-flex items-center px-3 py-1 rounded-full bg-void-900/80 border border-void-700 text-xs font-medium text-cosmic-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                {testimonial.highlight}
                            </div>

                            <!-- Quote icon -->
                            <svg
                                class="w-8 h-8 text-cosmic-500/20 mb-6 group-hover:text-cosmic-500/40 transition-colors duration-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                                />
                            </svg>

                            <p
                                class="text-void-200 leading-relaxed max-w-sm mb-8 text-base tracking-wide font-light"
                            >
                                "{testimonial.quote}"
                            </p>

                            <!-- User info -->
                            <div class="flex items-center gap-4">
                                <div
                                    class="w-12 h-12 rounded-full bg-gradient-to-br from-void-700 to-void-800 border-2 border-void-600 flex items-center justify-center text-2xl shadow-inner group-hover:border-cosmic-500/50 transition-colors duration-300"
                                >
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div
                                        class="text-base font-semibold text-white tracking-wide"
                                    >
                                        {testimonial.name}
                                    </div>
                                    <div
                                        class="text-sm text-void-400 font-medium"
                                    >
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- RIGHT COLUMN: Video Player (Sticky) -->
            <div
                class="lg:col-span-7 order-1 lg:order-2 lg:sticky lg:top-32 h-fit"
            >
                <div class="animate-fade-in">
                    <h2
                        class="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight max-w-xl"
                    >
                        See How Digital Twins Are <br />
                        <span
                            class="bg-gradient-to-r from-cosmic-400 to-ethereal-400 bg-clip-text text-transparent"
                            >Reshaping the Data Economy</span
                        >
                    </h2>
                    <p
                        class="text-lg text-void-300 mb-10 max-w-lg leading-relaxed"
                    >
                        Watch how your Digital Twin works, from connecting your
                        data to earning from your insights in real-time.
                    </p>

                    <div
                        class="p-2 sm:p-4 rounded-[2rem] bg-void-800/30 border border-void-700/50 backdrop-blur-xl shadow-2xl"
                    >
                        <div
                            class="relative w-full aspect-video rounded-[1.5rem] bg-void-900 border border-void-700/50 overflow-hidden cursor-pointer group shadow-inner"
                        >
                            <!-- Video Glow -->
                            <div
                                class="absolute inset-0 bg-gradient-to-tr from-cosmic-600/20 to-ethereal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            ></div>

                            <video
                                id="explainer-video"
                                autoplay
                                loop
                                muted
                                playsinline
                                preload="auto"
                                class="w-full h-full object-cover rounded-[1.5rem] transform group-hover:scale-[1.02] origin-center transition-transform duration-700 ease-out"
                                poster="/video-poster.jpg"
                                controls
                            >
                                <source
                                    src="/OwnYourTwin.mp4"
                                    type="video/mp4"
                                />
                                <track kind="captions" />
                                Your browser does not support the video tag.
                            </video>

                            <!-- Play overlay visual enhancement -->
                            <div
                                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 bg-void-950/10"
                            >
                                <div
                                    class="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-500"
                                >
                                    <div
                                        class="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 flex items-center gap-4 ml-4">
                        <div
                            class="w-12 h-[1px] bg-gradient-to-r from-cosmic-500 to-transparent"
                        ></div>
                        <p
                            class="text-sm text-void-400 font-medium tracking-wide uppercase"
                        >
                            The Digital Twin Economy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
