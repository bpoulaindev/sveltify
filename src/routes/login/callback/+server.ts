import type { RequestHandler } from './$types.js';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url, request }) => {
	const bodyParams = await request.json();
	const clientId = '3d769c375f754b6c9ba2c74606b34397';
	// const codeVerifier = localStorage.getItem('code_verifier') ?? '';
	const body = new URLSearchParams({
		grant_type: 'authorization_code',
		code: bodyParams.code,
		redirect_uri: 'https://localhost:5173/login/callback',
		client_id: clientId,
		code_verifier: bodyParams.codeVerifier
	});
	console.log('lesgo', { body }, bodyParams);
	const { data, error } = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: body
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('HTTP status ' + response.status);
			}
			return response.json();
		})
		.then((data) => {
			console.log('is it working ?', data);
			// localStorage.setItem('access_token', data?.access_token);
			return {
				data: data?.access_token,
				error: null
			};
		})
		.catch((error) => {
			console.error('Error:', error);
			return {
				data: null,
				error: error
			};
		});
	return json({ data, error });
};
