import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const PUT: RequestHandler = async ({ request }) => {
	const bodyParams = await request.json();
	try {
		await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${bodyParams.position}`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${bodyParams.accessToken}`
			}
		});
		console.log('seeking to position', bodyParams.position);
		// return await result.json();
		return json({
			data: 'ok'
		});
	} catch (error) {
		console.log('error while seeking to specific position', error);
		return json(error);
	}
};
