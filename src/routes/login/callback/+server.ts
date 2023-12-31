import type { RequestHandler } from './$types.js';
import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const POST: RequestHandler = async ({ url, request }) => {
	const bodyParams = await request.json();
	const clientId = '3d769c375f754b6c9ba2c74606b34397';
	// const codeVerifier = localStorage.getItem('code_verifier') ?? '';
	const redirectUri = dev
		? 'https://localhost:5173/login/callback'
		: 'https://sveltify-dev.vercel.app/login/callback';
	const body = new URLSearchParams({
		grant_type: 'authorization_code',
		code: bodyParams.code,
		redirect_uri: redirectUri,
		client_id: clientId,
		code_verifier: bodyParams.codeVerifier,
		scope:
			'user-read-email user-read-private user-top-read streaming user-read-playback-state user-modify-playback-state user-read-currently-playing'
	});
	const { accessToken, refreshToken, error } = await fetch(
		'https://accounts.spotify.com/api/token',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: body
		}
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error('HTTP status ' + response.status);
			}
			return response.json();
		})
		.then((data) => {
			return {
				accessToken: data?.access_token,
				refreshToken: data?.refresh_token,
				error: null
			};
		})
		.catch((error) => {
			console.error('Error:', error);
			return {
				accessToken: null,
				refreshToken: null,
				error: error
			};
		});
	return json({ accessToken, refreshToken, error });
};
