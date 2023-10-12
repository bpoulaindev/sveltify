import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const bodyParams = await request.json();
	try {
		await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${bodyParams.uri}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${bodyParams.accessToken}`
			}
		});
		console.log('adding song to queue', bodyParams.uri);
		// return await result.json();
		return json({
			data: 'ok'
		});
	} catch (error) {
		console.log('error while adding song to queue', error);
		return json(error);
	}
};
