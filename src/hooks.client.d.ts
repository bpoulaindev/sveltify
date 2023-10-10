/// <reference types="svelte" />
import type { Tokens, UserProfile } from '$lib/types/spotify.d.ts';
export declare const useSpotifyLogin: () => void;
export declare const darkMode: import("svelte/store").Writable<boolean>;
export declare const toggleDarkMode: () => void;
export declare const initializeDarkMode: () => void;
export declare const initializeTokens: () => null;
export declare const updateLocalStorageTokens: (tokens: Tokens) => void;
export declare const initializeUserProfile: () => null;
export declare const updateLocalStorageUserProfile: (userProfile: UserProfile) => void;
