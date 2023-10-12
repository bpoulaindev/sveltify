import { dev } from '$app/environment';
import { writable } from 'svelte/store';
import type {
	SpotifyApiResponse,
	SpotifyArtist,
	SpotifyTrack,
	Token,
	Tokens,
	UserProfile
} from '$lib/types/spotify.d.ts';
import {
	artistsRankingStore,
	tokenStore,
	tracksRankingStore,
	userProfileStore
} from '$lib/stores.js';
import dayjs from 'dayjs';

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
		localStorage.setItem('code_verifier', codeVerifier);
		const args = new URLSearchParams({
			response_type: 'code',
			client_id: clientId,
			scope:
				'user-read-email user-read-private user-top-read streaming user-read-playback-state user-modify-playback-state user-read-currently-playing',
			redirect_uri: redirectUri,
			state: state,
			code_challenge_method: 'S256',
			code_challenge: codeChallenge
		});
		window.location.href = 'https://accounts.spotify.com/authorize?' + args;
	});
};

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
	toggleHtml();
	// localStorage.theme = darkMode ? 'dark' : 'light';
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
	darkMode.subscribe(($darkMode) => {
		// toggleHtml();
		localStorage.setItem('theme', $darkMode ? 'dark' : 'light');
	});
};

export const initializeTokens = () => {
	const accessToken = JSON.parse(localStorage.getItem('access_token') ?? '{}') as Token;
	const refreshToken = JSON.parse(localStorage.getItem('refresh_token') ?? '{}') as Token;
	if (accessToken?.token && refreshToken?.token) {
		tokenStore.set({
			accessToken,
			refreshToken
		} as Tokens);
	}
	return null;
};

export const updateLocalStorageTokens = (tokens: Tokens) => {
	localStorage.setItem('access_token', JSON.stringify(tokens?.accessToken));
	localStorage.setItem('refresh_token', JSON.stringify(tokens?.refreshToken));
};
export const updateLocalStorage = (key: string, value: string) => {
	localStorage.setItem(key, value);
};
export const initializeUserProfile = () => {
	const userProfile = JSON.parse(localStorage.getItem('user_card') ?? '{}');
	if (userProfile && userProfile.display_name) {
		userProfileStore.set({ ...userProfile, timestamp: dayjs().valueOf() });
	}
	return null;
};
export const updateLocalStorageUserProfile = (userProfile: UserProfile) => {
	localStorage.setItem('user_card', JSON.stringify(userProfile));
};

export const initializeArtistsRanking = () => {
	const artistsRanking = JSON.parse(localStorage.getItem('artists_ranking') ?? '{}');
	if (artistsRanking && artistsRanking?.total > 0) {
		artistsRankingStore.set({ ...artistsRanking, timestamp: dayjs().valueOf() });
	}
	return null;
};
export const updateLocalStorageArtistsRanking = (
	artistsRanking: SpotifyApiResponse<SpotifyArtist>
) => {
	localStorage.setItem('artists_ranking', JSON.stringify(artistsRanking));
};

export const initializeTracksRanking = () => {
	const tracksRanking = JSON.parse(localStorage.getItem('tracks_ranking') ?? '{}');
	if (tracksRanking && tracksRanking?.total > 0) {
		tracksRankingStore.set({ ...tracksRanking, timestamp: dayjs().valueOf() });
	}
	return null;
};
export const updateLocalStorageTracksRanking = (
	tracksRanking: SpotifyApiResponse<SpotifyTrack>
) => {
	localStorage.setItem('tracks_ranking', JSON.stringify(tracksRanking));
};
