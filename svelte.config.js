import { preprocessMeltUI } from '@melt-ui/pp';
import sequence from 'svelte-sequential-preprocessor';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),
	onwarn: (warning, handler) => {
		if (warning.code === 'a11y-click-events-have-key-events') return;

		// Handle all other warnings normally
		handler(warning);
	},
	kit: {
		adapter: adapter({
			runtime: 'nodejs18.x'
		}),
		alias: {
			$src: 'src',
			$lib: 'src/lib',
			$components: 'src/lib/components',
			$assets: 'src/assets'
		}
	},
	csp: {
		directives: {
			'script-src': ['self']
		},
		reportOnly: {
			'script-src': ['self']
		}
	}
};
export default config;
