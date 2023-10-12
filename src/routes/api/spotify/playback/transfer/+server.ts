import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import type { SpotifyDevicesResponse } from '$lib/types/spotify.js';

export const POST: RequestHandler = async ({ request }) => {
	const bodyParams = await request.json();
	try {
		const devices = await fetch('https://api.spotify.com/v1/me/player/devices', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${bodyParams.accessToken}`
			}
		});
		const devicesData: SpotifyDevicesResponse = await devices.json();
		const device = devicesData?.devices.find((device) => device.name === 'SvelteKit');
		const result = await fetch('https://api.spotify.com/v1/me/player', {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${bodyParams.accessToken}`
			},
			body: JSON.stringify({
				device_ids: [device ? device.id : bodyParams.deviceId],
				play: true
			})
		});
		const data = await result.json();
		console.log('creating new device');
		return json(data);
	} catch (error) {
		console.log('error while making device active', error);
		return json(error);
	}
};
