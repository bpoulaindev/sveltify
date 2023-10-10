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
	images: {
		url: string;
		height: number;
		width: number;
	}[];
	name: string;
	popularity: number;
	type: string;
	uri: string;
};

export type SpotifyApiResponse<T> = {
	href: string;
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
	items: T[];
};
