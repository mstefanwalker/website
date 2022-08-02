<script>
    import { interpolateLab } from 'd3-interpolate';
	import { afterUpdate } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { linear } from 'svelte/easing';

    export let max;
    export let current;

    const baseColor = 'rgb(0, 167, 218)';
    const overflowColor = 'rgb(125, 10, 233)';
    const color = tweened(baseColor, {duration: 200, interpolate: interpolateLab});

    const height = tweened(0, {duration: 200, easing: linear});

    afterUpdate(() => {
        if (current <= max) {
            $height = current * 50 / max;
            $color = baseColor;
        } else {
            $height = 50;
            $color = overflowColor;
        }
    })
</script>

<div class='container'>
    <div class='background inner'></div>
    <div class='fill inner' style='--height: {$height}px; --color: {$color};'></div>
</div>

<style>
    .container {
        overflow: hidden;
        height: 50px;
        width: 20px;
        display: grid;
        place-items: baseline;
        grid-template-areas: "inner-div";
    }
    .inner {
        grid-area: inner-div
    }
    .background {
        background-color: whitesmoke;
        height: 50px;
        width: 20px;
    }
    .fill {
        background-color: var(--color);
        height: var(--height);
        width: 20px;
        transform: translateY(1px);
    }
</style>