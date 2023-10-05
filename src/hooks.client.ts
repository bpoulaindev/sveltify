import { dev } from '$app/environment';

const generateRandomString = (length: number) => {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

const generateCodeChallenge = async (codeVerifier: string) => {
	function base64encode(string: ArrayBuffer) {
		// @ts-ignore
		return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
	}

	const encoder = new TextEncoder();
	const data = encoder.encode(codeVerifier);
	const digest = await window.crypto.subtle.digest('SHA-256', data);

	return base64encode(digest);
};
export const useSpotifyLogin = () => {
	const clientId = '3d769c375f754b6c9ba2c74606b34397';
	const redirectUri = dev
		? 'https://localhost:5173/login/callback'
		: 'https://sveltify-dev.vercel.app/login/callback';

	const codeVerifier = generateRandomString(128);
	generateCodeChallenge(codeVerifier).then((codeChallenge) => {
		const state = generateRandomString(16);
		const scope = 'user-read-private user-read-email';
		localStorage.setItem('code_verifier', codeVerifier);
		const args = new URLSearchParams({
			response_type: 'code',
			client_id: clientId,
			scope: scope,
			redirect_uri: redirectUri,
			state: state,
			code_challenge_method: 'S256',
			code_challenge: codeChallenge
		});
		window.location.href = 'https://accounts.spotify.com/authorize?' + args;
	});
};

import { writable } from 'svelte/store';

// Create a writable Svelte store for dark mode state
export const darkMode = writable(false);

const toggleHtml = () => {
	const html = document.querySelector('html');
	if (html) {
		html.classList.toggle('dark');
	}
};
export const toggleDarkMode = () => {
	darkMode.update((value) => !value);
	localStorage.theme = darkMode ? 'dark' : 'light';
	toggleHtml();
};

// Function to initialize dark mode based on localStorage
export const initializeDarkMode = () => {
	if (
		localStorage.theme === 'dark' ||
		(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		document.documentElement.classList.add('dark');
		darkMode.set(true);
	} else {
		document.documentElement.classList.remove('dark');
		darkMode.set(false);
	}
	// Listen for changes to the dark mode state and update localStorage accordingly
	/* darkMode.subscribe(($darkMode) => {
		// toggleHtml();
		// localStorage.setItem('darkMode', $darkMode.toString());
	}); */
};
