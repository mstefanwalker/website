<script>
    import { fade } from 'svelte/transition';

    export let timestamp;
    export let factors;
    export let oyster;

    $: elements = [
        {id: 1, show: !!timestamp, text: timestamp, style: 'timestamp'},
        {id: 2, show: !!factors, text: factors ? factors.join(' × ') : '...', style: factors && factors.length == 1 ? 'prime' : 'factors'},
        {id: 3, show: !!oyster, text: oyster ? 'oyster' : '', style: 'oyster'}
    ];
</script>

<div id='formatted'>
    {#each elements as {id, show, text, style}, index (id)}
        {#if show}
            <span class={style} in:fade|local={{ duration: 400, delay: 300 }} out:fade|local={{ duration: 300 }}>
                {text}
            </span>
        {/if}
    {/each}
</div>

<style>
    .timestamp {
        color: rgb(192, 192, 192);
        margin-right: 10px
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
        text-align: left;
        width: 300px;
        margin-right: auto;
        margin-left: auto;
        overflow: visible;
        white-space: nowrap;
    }
</style>