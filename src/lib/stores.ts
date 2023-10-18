import type {
	UserProfile,
	SpotifyApiResponse,
	SpotifyArtist,
	Tokens,
	SpotifyTrack
} from '$lib/types/spotify.d.ts';
import { writable } from 'svelte/store';

// export const useTokens: () => Writable<Tokens> = () => useWritable<Tokens | null>('tokens', null);
export const userProfileStore = writable<UserProfile | null>(null);

export const artistsRankingStore = writable<SpotifyApiResponse<SpotifyArtist> | null>(null);

export const tracksRankingStore = writable<SpotifyApiResponse<SpotifyTrack> | null>(null);

export const tokenStore = writable<Tokens | null>(null);

export const fullScreenStore = writable<boolean>(true);
