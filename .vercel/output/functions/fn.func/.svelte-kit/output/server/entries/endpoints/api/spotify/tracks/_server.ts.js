import { j as json } from "../../../../../chunks/index.js";
const POST = async ({ request }) => {
  const bodyParams = await request.json();
  try {
    const result = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bodyParams.accessToken}`
        }
      }
    );
    const data = await result.json();
    console.log("fetching tracks", data, bodyParams.accessToken);
    return json(data);
  } catch (error) {
    return json(error);
  }
};
export {
  POST
};
