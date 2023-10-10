import { useSharedStore, useWritable } from '$lib/use_shared_stores.js';
import type {
	UserProfile,
	SpotifyApiResponse,
	SpotifyArtist,
	Tokens,
	Token
} from '$lib/types/spotify.js';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/environment';

// export const useTokens: () => Writable<Tokens> = () => useWritable<Tokens | null>('tokens', null);
export const userProfileStore = writable<UserProfile | null>(null);

export const useTopArtists = () =>
	useWritable<SpotifyApiResponse<SpotifyArtist> | null>('topArtists', null);

export const tokenStore = writable<Tokens | null>(null);
