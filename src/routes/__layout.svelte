<script>
    import Nav from '../components/nav.svelte';
    import Footer from '../components/footer.svelte';
</script>

<div id='site'>
    <Nav/>
    <div id='site-content'>
        <slot/>
    </div>
    <Footer/>
</div>

<style>
    #site {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        align-items: stretch;
    }
    #site-content {
        flex-grow: 1;
    }
    :global(*) {
        font-family: sans-serif
    }
    :global(a) {
        color: blue;
        text-decoration: none;
    }
</style>