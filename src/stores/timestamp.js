import { readable } from 'svelte/store';

function now() {
    return Math.round(Date.now() / 1000);
}

export const timestamp = readable(now(), function start(set) {
    let interval = setInterval(() => {
        set(now());
    }, 1000);

    return function stop() {
        clearInterval(interval);
    };
});
