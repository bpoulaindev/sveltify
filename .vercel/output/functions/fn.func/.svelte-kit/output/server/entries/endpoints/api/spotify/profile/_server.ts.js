import { j as json } from "../../../../../chunks/index.js";
const POST = async ({ request }) => {
  const bodyParams = await request.json();
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${bodyParams.accessToken}` }
  });
  const data = await result.json();
  return json(data);
};
export {
  POST
};
