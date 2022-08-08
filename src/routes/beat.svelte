<script>
    import { browser } from '$app/env';
    import Timestamp from '../components/timestamp.svelte'
    import StatusBar from '../components/status_bar.svelte'
    import { timestamp } from '../stores/timestamp';
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    const numTimestamps = 28;
    const numSpaces = 3;

    let timestampUpdatePosition = 0;
    let timestampsInitialized = false;

    $: factorizerStatus = browser ? {...window.factorizer.status(), timestamp: $timestamp} : {workers: [], timestamp: $timestamp};
    $: timestamps = timestampsInitialized ? updateTimestamps($timestamp) : initializeTimestamps(numTimestamps);
    $: activeWorkers = factorizerStatus.workers.filter(worker => worker.id < 4 || worker.numJobs > 0)

    function updateTimestamps(timestamp) {
        let entry = {
            show: true,
            time: timestamp,
            factors: null,
            oyster: Math.random() > 0.995
        }
        timestamps[timestampUpdatePosition] = entry;
        if (browser) {
            window.factorizer.run({n: timestamp}).then(value => {
                entry.factors = value.factors;
                timestamps = timestamps;
            });
        }
        for (let i = 0; i < numSpaces; i++) {    
            let offset = i + 1;
            let spacePosition = (timestampUpdatePosition + offset) % timestamps.length;
            timestamps[spacePosition].show = false;
        }
        let nextPosition = (timestampUpdatePosition + 1) % timestamps.length;
        timestampUpdatePosition = nextPosition;
        return timestamps;
    }

    function initializeTimestamps(numTimestamps) {
        let timestamps = []
        for (let i = 0; i < numTimestamps; i++) {
            timestamps.push({
                show: false,
                time: null,
                factors: null,
                oyster: false
            });
        }
        timestamps = timestamps;
        timestampsInitialized = true;
        return timestamps;
    }
</script>

<div id='status'>
    <div>
        {#each activeWorkers as worker, index (worker.id)}
            <span
                class='status bars'
                animate:flip|local={{ duration: 200, delay: 200 }}
                in:fade|local={{ duration: 400, delay: 300 }}
                out:fade|local={{ duration: 200 }}
            >
                <StatusBar current={worker.numJobs} max=3 />
            </span>
        {:else}
            <span class='status bars'>...</span>
        {/each}
    </div>
</div>

<div id='timestamps'>
    {#each timestamps as {show, time, factors, oyster}}
        {#if show}
            <div
                class='timestamp'
                in:fade|local={{ duration: 300 }}
            >
                <Timestamp timestamp={time} factors={factors} oyster={oyster}/>
            </div>
        {:else}
            <div 
                class='timestamp'
            >
                &nbsp;
            </div>
        {/if}
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