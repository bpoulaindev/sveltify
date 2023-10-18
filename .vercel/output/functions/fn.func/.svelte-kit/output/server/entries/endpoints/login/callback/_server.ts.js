import { j as json } from "../../../../chunks/index.js";
const POST = async ({ url, request }) => {
  const bodyParams = await request.json();
  const clientId = "3d769c375f754b6c9ba2c74606b34397";
  const redirectUri = "https://sveltify-dev.vercel.app/login/callback";
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: bodyParams.code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: bodyParams.codeVerifier,
    scope: "user-read-email user-read-private user-top-read streaming user-read-playback-state user-modify-playback-state user-read-currently-playing"
  });
  const { accessToken, refreshToken, error } = await fetch(
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
      accessToken: data?.access_token,
      refreshToken: data?.refresh_token,
      error: null
    };
  }).catch((error2) => {
    console.error("Error:", error2);
    return {
      accessToken: null,
      refreshToken: null,
      error: error2
    };
  });
  return json({ accessToken, refreshToken, error });
};
export {
  POST
};
