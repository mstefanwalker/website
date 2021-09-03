import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// build into a sibling project so that this repo can remain clean for git commits
			// the sibling project may be committed seperately for GitHub Pages
			pages: '../website-build/docs',
			assets: '../website-build/docs',
			fallback: null,
		}),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
	}
};

export default config;
