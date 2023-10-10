import type {
	UserProfile,
	SpotifyApiResponse,
	SpotifyArtist,
	Tokens
} from '$lib/types/spotify.d.ts';
import { writable } from 'svelte/store';

// export const useTokens: () => Writable<Tokens> = () => useWritable<Tokens | null>('tokens', null);
export const userProfileStore = writable<UserProfile | null>(null);

export const artistsStore = writable<SpotifyApiResponse<SpotifyArtist> | null>(null);

export const tokenStore = writable<Tokens | null>(null);
