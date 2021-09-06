<script>
    import { fade } from 'svelte/transition';

    export let timestamp;

    $: done = false;
    let formatted = null;
    let prime = false;
    let oyster = false;

    function setFormatted({text, pr = false, oy = false}) {
        done = true;
        formatted = text;
        prime = pr;
        oyster = oy;
    }

    function formatTimestamp(timestamp) {
        let random = Math.random();
        if (random > 0.995) { setFormatted({text: "oyster", oy: true}); return; }
        if (random > 0.940) { setFormatted({text: new Date(timestamp * 1000).toLocaleString('en-US')}); return; }
        if (random > 0.800) { window.factorizer.run({n: timestamp}).then(value => setFormatted({
            text: value.factors.join(' * '),
            pr: value.factors.length == 1,
        })); return; }
        setFormatted({text: null}); return;
    }

    setTimeout(() => formatTimestamp(timestamp), 10);
</script>

<div id='formatted'>
    {#if done}
        <div in:fade|local={{ duration: 400, delay: 300 }}>
            <span class:detail={formatted}>{timestamp}</span>
            {#if formatted}
                <span class='formatted' class:prime={prime} class:oyster={oyster}>{formatted}</span>
            {/if}
        </div>
    {:else}
        <div class='loading'>
            ...
        </div>
    {/if}
</div>

<style>
    .detail {
        color: lightgrey;
    }
    .formatted {
        margin-left: 5px;
    }
    .prime {
        color: rgb(0, 167, 218);
    }
    .oyster {
        color: rgb(125, 10, 233);
    }
    .loading {
        color: grey;
    }
    #formatted {
        text-align: center;
        width: fit-content;
        margin-right: auto;
        margin-left: auto;
    }
</style>