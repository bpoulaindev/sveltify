import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import * as fs from 'fs';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		https: {
			key: fs.readFileSync(`${__dirname}/cert/localhost-key.pem`),
			cert: fs.readFileSync(`${__dirname}/cert/localhost.pem`)
		},
		proxy: {}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
