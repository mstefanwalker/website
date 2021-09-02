<script>
    import Nav from '../components/nav.svelte';
</script>

<Nav/>

<slot/>

<style>
    :global(*) {
        font-family: sans-serif
    }
    :global(a) {
        color: blue;
        text-decoration: none;
    }
</style>