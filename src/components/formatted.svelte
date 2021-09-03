<script>
    export let timestamp;

    function primeFactors(n) {
        const factors = [];
        let divisor = 2;

        while (n >= 2) {
            if (n % divisor == 0) {
                factors.push(divisor);
                n = n / divisor;
            } else {
                divisor++;
            }
        }
        return factors;
    }

    $: done = false;
    $: formatted = null;

    function setFormatted(text) {
        done = true;
        formatted = text;
    }

    function formatTimestamp(timestamp) {
        if (timestamps && timestamps.length <= 5) { setFormatted(null); return; }
        let random = Math.random();
        if (random > 0.995 && timestamps && timestamps.length >= 20) { setFormatted("oyster"); return; }
        if (random > 0.970) { setFormatted(new Date(timestamp * 1000).toString().split("(")[0]); return; }
        if (random > 0.940) { setFormatted(new Date(timestamp * 1000).toLocaleString('en-US')); return; }
        if (random > 0.890) { setFormatted(primeFactors(timestamp).join(' * ')); return; }
        setFormatted(null); return;
    }

    setTimeout(() => formatTimestamp(timestamp), 1);
</script>

{#if done}
    <div>
        <span class:detail={formatted}>{timestamp}</span>
        {#if formatted}
            <span class='formatted'>{formatted}</span>
        {/if}
    </div>
{:else}
    <div>
        ...
    </div>
{/if}

<style>
    .detail {
        color: lightgrey;
    }
    .formatted {
        margin-left: 5px;
    }
</style>