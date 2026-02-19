<script lang="ts">
    import Header from "$lib/components/layout/Header.svelte";
    import Footer from "$lib/components/layout/Footer.svelte";
    import { BlogPreview } from "$lib/components/landing";

    interface Props {
        data: import("./$types").PageData;
    }

    let { data }: Props = $props();
</script>

<svelte:head>
    <title>Blogs - OwnYourTwin | Digital Twin Insights</title>
    <meta
        name="description"
        content="Explore the Digital Twin Economy. Deep dives into data sovereignty, AI behavioral science, and the future where your digital twin works for you."
    />
</svelte:head>

<Header />

<main class="pt-20">
    <BlogPreview posts={data.posts} />
</main>

<Footer />
