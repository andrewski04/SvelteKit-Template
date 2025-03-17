import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	server: {
		allowedHosts: ['localhost', 'host.docker.internal']
	},
	test: {
		environment: 'node',
		coverage: {
			include: ['src/**/*.{test,spec}.{js,ts}'],
			provider: 'istanbul',
			reporter: ['text', 'json', 'html']
		}
	}
});
