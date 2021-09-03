<script>
    import { timestamp } from '../stores/timestamp';
    import Formatted from '../components/formatted.svelte'
    import { fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    let flyX = 200;
    let id = 1;

    function addTimestamp(timestamp) {
        // initialize and avoid first update caused by page load. Only add when $timestamp updates
        if (!timestamps) return [];
        // then add to the top so the list slides down!
        return [{id: id++, time: timestamp, flyX: flyX *= -1}, ...timestamps];
    }

    $: timestamps = addTimestamp($timestamp);
</script>

<div id='timestamps'>
    {#each timestamps as timestamp, index (timestamp.id)}
        <div in:fly={{ x: timestamp.flyX, duration: 400, delay: 300 }} animate:flip={{duration: 200}}>
            <Formatted timestamp={timestamp.time}/>
        </div>
    {/each}
</div>

<style>
    #timestamps {
        overflow: hidden;
        margin-top: 40px;
        text-align: center;
    }
</style>