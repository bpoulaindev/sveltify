import { j as json } from "../../../../../chunks/index.js";
const POST = async ({ request }) => {
  const bodyParams = await request.json();
  const clientId = "3d769c375f754b6c9ba2c74606b34397";
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: bodyParams.refreshToken,
    client_id: clientId
  });
  const { refreshToken, accessToken, error } = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return response.json();
  }).then((data) => {
    return {
      refreshToken: data?.refresh_token,
      accessToken: data?.access_token,
      error: null
    };
  }).catch((error2) => {
    console.error("Error:", error2);
    return {
      refreshToken: null,
      accessToken: null,
      error: error2
    };
  });
  return json({ refreshToken, accessToken, error });
};
export {
  POST
};
