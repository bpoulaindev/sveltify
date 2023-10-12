export type Token = {
	token: string;
	timestamp: number;
} | null;
export type Tokens = {
	accessToken: Token;
	refreshToken: Token;
} | null;
export type UserProfile = {
	country: string;
	display_name: string;
	email: string;
	explicit_content: {
		filter_enabled: boolean;
		filter_locked: boolean;
	};
	external_urls: { spotify: string };
	followers: { href: string; total: number };
	href: string;
	id: string;
	images: Image[];
	product: 'premium' | 'free' | 'open';
	type: string;
	uri: string;
	timestamp: number;
};

export type Image = {
	url: string;
	height: number;
	width: number;
};

export type SpotifyArtist = {
	external_urls: {
		spotify: string;
	};
	followers: {
		href: string | null;
		total: number;
	};
	genres: string[];
	href: string;
	id: string;
	images: Image[];
	name: string;
	popularity: number;
	type: string;
	uri: string;
};

export type SimplifiedArtistObject = {
	external_urls: {
		spotify: string;
	};
	popularity?: number;
	href: string;
	id: string;
	name: string;
	type: 'artist';
	uri: string;
};

export type SpotifyAlbum = {
	album_type: 'album' | 'single' | 'compilation';
	total_tracks: number;
	available_markets: string[];
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: {
		url: string;
		height: number;
		width: number;
	}[];
	name: string;
	release_date: string;
	release_date_precision: string;
	restrictions: {
		reason: 'market' | 'product' | 'explicit';
	};
	type: string;
	uri: string;
	artists: SimplifiedArtistObject[];
};

export type SpotifyTrack = {
	album: SpotifyAlbum;
	artists: SimplifiedArtistObject[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: {
		isrc: string;
	};
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	name: string;
	popularity: number;
	preview_url: string | null;
	restrictions: {
		reason: 'market' | 'product' | 'explicit';
	};
	track_number: number;
	type: string;
	uri: string;
	is_local: boolean;
	timestamp: number;
};

export type SpotifyApiResponse<T> = {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: T[];
	timestamp: number;
};

export type SpotifyDevice = {
	id: string;
	is_active: boolean;
	is_private_session: boolean;
	is_restricted: boolean;
	name: string;
	type: string;
	volume_percent: number;
	supports_volume: boolean;
};

export type SpotifyDevicesResponse = {
	devices: SpotifyDevice[];
};
