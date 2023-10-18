import { j as json } from "../../../../../../chunks/index.js";
const PUT = async ({ request }) => {
  const bodyParams = await request.json();
  try {
    await fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${bodyParams.shuffle}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${bodyParams.accessToken}`
      }
    });
    console.log("changing shuffle state", bodyParams.shuffle);
    return json({
      data: "ok"
    });
  } catch (error) {
    console.log("error while changing shuffle state", error);
    return json(error);
  }
};
export {
  PUT
};
