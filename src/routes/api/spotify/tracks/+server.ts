import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const bodyParams = await request.json();
	try {
		const result = await fetch(
			'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0',
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${bodyParams.accessToken}`
				}
			}
		);
		const data = await result.json();
		console.log('fetching tracks', data, bodyParams.accessToken);
		// return await result.json();
		return json(data);
	} catch (error) {
		console.log('omg jpp', error);
		return json(error);
	}
};
