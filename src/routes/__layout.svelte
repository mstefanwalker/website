<script>
    import Nav from '../components/nav.svelte';
    import Footer from '../components/footer.svelte';
    import { browser } from '$app/env';
    import { Pool } from '../modules/worker';

    // set up a global utility to produce prime factors.
    // this is global since this both needs to be one instance
    // accessible at multiple locations, and Worker seems to have
    // trouble being used anywhere other than in script tags.
    // Trouble includes Worker not defined when building and when
    // Server Side Rendering takes place. SSR in this case can be
    // solved by checking the browser first, but solving the build
    // errors are tough.
    if (browser) {
        let numWorkers = 12;
        let workers = [];
        for (let i = 0; i < numWorkers; i++)
            workers.push(new Worker('/workers/factorization.js'));
        window.factorizer = new Pool(workers);
    }
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
        color: lightseagreen;
        text-decoration: none;
    }
</style>