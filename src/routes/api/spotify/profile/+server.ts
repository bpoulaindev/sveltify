import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const bodyParams = await request.json();
	try {
		const result = await fetch('https://api.spotify.com/v1/me', {
			method: 'GET',
			headers: { Authorization: `Bearer ${bodyParams.accessToken}` }
		});
		const data = await result.json();
		// return await result.json();
		return json(data);
	} catch (error) {
		console.log('error while fetching user profile', error);
		return json({ error });
	}
};
