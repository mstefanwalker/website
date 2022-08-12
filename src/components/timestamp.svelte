<script>
    import { fade } from 'svelte/transition';

    export let timestamp;
    export let factors;

    $: prime = factors ? factors.length == 1 : false;
    $: exponents = factors ? calculateExponents(factors) : {};
    $: uniqueFactors = factors ? unique(factors) : [];
    $: oyster = mapContainsValueOrLarger(exponents, 8);    

    function mapContainsValueOrLarger(map, value) {
        for (let key in map) {
            if (map[key] >= value) {
                return true;
            }
        }
        return false;
    }

    function unique(array) {
        return array.filter((value, index, self) => self.indexOf(value) === index);
    }

    function calculateExponents(factors) {
        let exponents = {};
        for (let factor of factors) {
            if (exponents[factor]) {
                exponents[factor]++;
            } else {
                exponents[factor] = 1;
            }
        }
        return exponents;
    }
</script>

<div id='formatted'>
    {#if timestamp}
        <span
            class='line {prime ? 'prime' : 'timestamp'}'
            in:fade|local={{ duration: 400 }}
            out:fade|local={{ duration: 300 }}
        >
            {timestamp}
        </span>
    {/if}
    {#if factors}
        <span
            class='line {prime ? 'prime' : 'factors'}'
            in:fade|local={{ duration: 400 }}
            out:fade|local={{ duration: 300 }}
        >
            {#each uniqueFactors as factor}
                {factor}
                {#if exponents[factor] > 1}
                    <sup class='superscript'>
                        {exponents[factor]}
                    </sup>
                {/if}
                {#if factor !== uniqueFactors[uniqueFactors.length - 1]}
                    ×&nbsp;
                {/if}
            {/each}
        </span>
    {:else}
        <span 
            class='loading'
            in:fade|local={{ duration: 400 }}
        >
            ― × ― × ―
        </span>
    {/if}
    {#if oyster}
        <span
            class='line oyster'
            in:fade|local={{ duration: 400 }}
            out:fade|local={{ duration: 300 }}
        >
            oyster
        </span>
    {/if}
</div>

<style>
    .superscript {
        color: lightseagreen;
        margin-left: -0.15em;
        vertical-align: baseline;
        position: relative;
        top: -0.4em;
    }
    .line {
        margin-right: 10px;
        height: 100px;
    }
    .line.timestamp {
        color: rgb(192, 192, 192);
        margin-right: 10px;
    }
    .line.prime {
        color: rgb(0, 167, 218);
    }
    .line.oyster {
        color: rgb(125, 10, 233);
    }
    .loading {
        color: rgb(226, 226, 226);
    }
    #formatted {
        text-align: left;
        width: 350px;
        margin-right: auto;
        margin-left: auto;
        overflow: visible;
        white-space: nowrap;
    }
</style>