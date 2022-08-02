<script>
    import { browser } from '$app/env';
    import Timestamp from '../components/timestamp.svelte'
    import StatusBar from '../components/status_bar.svelte'
    import { timestamp } from '../stores/timestamp';
    import { fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    const numTimestamps = 28;

    let flyX = 300;
    let id = 1;

    function addTimestamp(timestamp) {
        // initialize and avoid first update caused by page load. Only add when $timestamp updates
        if (!timestamps) return [];
        // if removing last from list, queue after flip animation has completed below
        setTimeout(() => {
            if (timestamps.length >= numTimestamps) timestamps = timestamps.slice(0, -1);
        }, 680);
        // then add to the top so the list slides down!
        return [{id: id++, time: timestamp, flyX: flyX *= -1}, ...timestamps];
    }

    $: timestamps = addTimestamp($timestamp);
    $: factorizerStatus = browser ? {...window.factorizer.status(), timestamp: $timestamp} : {workers: [], timestamp: $timestamp};
</script>

<div id='status'>
    <div>
        {#each factorizerStatus.workers as worker, index (worker.id)}
            <span class='status bars'>
                <StatusBar current={worker.numJobs} max=3 />
            </span>
        {:else}
            <span class='status bars'>...</span>
        {/each}
    </div>
</div>

<div id='timestamps'>
    {#each timestamps as timestamp, index (timestamp.id)}
        <div
            class='timestamp'
            in:fly|local={{ x: timestamp.flyX, duration: 220, delay: 250 }}
            out:fly|local={{ x: timestamp.flyX * 0.15, duration: 220, delay: 0 }}
            animate:flip|local={{ duration: 200 }}
        >
            <Timestamp timestamp={timestamp.time}/>
        </div>
    {/each}
</div>

<style>
    .status.bars {
        display: inline-block;
    }
    .status.bars + .status.bars {
        margin-left: 5px;
    }
    #timestamps, #status {
        margin-top: 36px;
        text-align: center;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
    }
</style>