<script lang="ts">
    import Header from "$lib/components/layout/Header.svelte";
    import Footer from "$lib/components/layout/Footer.svelte";
    import {
        MarketResearch,
        ForBusiness,
        WaitlistModal,
    } from "$lib/components/landing";

    let showDemoModal = $state(false);

    function openDemoModal() {
        showDemoModal = true;
    }
</script>

<svelte:head>
    <title>For Business | OwnYourTwin</title>
    <meta
        name="description"
        content="Discover how OwnYourTwin can provide unprecedented ethical market insights for your business."
    />
</svelte:head>

<Header transparent={false} onDemoClick={openDemoModal} />

<main class="pt-16">
    <MarketResearch />
    <ForBusiness />
</main>

<Footer onDemoClick={openDemoModal} />

<WaitlistModal bind:open={showDemoModal} />
