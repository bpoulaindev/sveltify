import { j as json } from "../../../../../../chunks/index.js";
const PUT = async ({ request }) => {
  const bodyParams = await request.json();
  try {
    await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${bodyParams.position}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${bodyParams.accessToken}`
      }
    });
    console.log("seeking to position", bodyParams.position);
    return json({
      data: "ok"
    });
  } catch (error) {
    console.log("error while seeking to specific position", error);
    return json(error);
  }
};
export {
  PUT
};
