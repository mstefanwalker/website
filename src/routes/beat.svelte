<script>
    import Formatted from '../components/formatted.svelte'
    import { timestamp } from '../stores/timestamp';
    import { fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    const numTimestamps = 30;

    let flyX = 150;
    let id = 1;

    let timestamps = [];
    function addTimestamp(timestamp) {
        // initialize and avoid first update caused by page load. Only add when $timestamp updates
        if (!timestamps) return [];
        // then add to the top so the list slides down!
        return [{id: id++, time: timestamp, flyX: flyX *= -1}, ...timestamps];
    }

    $: {
        timestamps = addTimestamp($timestamp);
        if (timestamps.length >= numTimestamps) {
            timestamps = timestamps.slice(0, -1);
        }
    }
</script>

<div id='timestamps'>
    {#each timestamps as timestamp, index (timestamp.id)}
        <div
            class='timestamp'
            in:fly|local={{ x: timestamp.flyX, duration: 250, delay: 300 }}
            out:fly|local={{ x: timestamp.flyX, duration: 250, delay: 0 }}
            animate:flip|local={{duration: 200}}>
            <Formatted timestamp={timestamp.time}/>
        </div>
    {/each}
</div>

<style>
    #timestamps {
        margin-top: 40px;
        text-align: center;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
    }
</style>