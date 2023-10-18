import { j as json } from "../../../../../../chunks/index.js";
const POST = async ({ request }) => {
  const bodyParams = await request.json();
  try {
    await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${bodyParams.uri}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bodyParams.accessToken}`
      }
    });
    console.log("adding song to queue", bodyParams.uri);
    return json({
      data: "ok"
    });
  } catch (error) {
    console.log("error while adding song to queue", error);
    return json(error);
  }
};
export {
  POST
};
