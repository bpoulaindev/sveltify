import { useWritable } from '$lib/use_shared_stores.js';
import type { UserProfile } from '$lib/types/spotify.js';

export const useUserProfile = () => useWritable<UserProfile | null>('userProfile', null);
