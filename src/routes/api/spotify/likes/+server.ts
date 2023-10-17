import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const bodyParams = await request.json();
	console.log('fetching likes', bodyParams.trackIds, bodyParams.trackIds.join('%2'));
	try {
		const result = await fetch(
			`https://api.spotify.com/v1/me/tracks/contains?ids=${bodyParams.trackIds.join('%2')}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${bodyParams.accessToken}`
				}
			}
		);
		const data = await result.json();
		console.log('fetching liked tracks', data, bodyParams.accessToken);
		// return await result.json();
		return json(data);
	} catch (error) {
		console.log('fucking error', error);
		return json(error);
	}
};
