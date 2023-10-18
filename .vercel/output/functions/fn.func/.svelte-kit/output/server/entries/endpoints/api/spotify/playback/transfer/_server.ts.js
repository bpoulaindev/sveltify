import { j as json } from "../../../../../../chunks/index.js";
const POST = async ({ request }) => {
  const bodyParams = await request.json();
  try {
    const devices = await fetch("https://api.spotify.com/v1/me/player/devices", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bodyParams.accessToken}`
      }
    });
    const devicesData = await devices.json();
    const device = devicesData?.devices.find((device2) => device2.name === "SvelteKit");
    await fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${bodyParams.accessToken}`
      },
      body: JSON.stringify({
        device_ids: [device ? device.id : bodyParams.deviceId],
        play: true
      })
    });
    console.log("creating new device");
    return json({
      data: "ok"
    });
  } catch (error) {
    console.log("error while making device active", error);
    return json(error);
  }
};
export {
  POST
};
