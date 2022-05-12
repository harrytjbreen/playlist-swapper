import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code as string;

  const clientID = process.env.SPOTIFY_ID as string;
  const redirectURI = process.env.SPOTIFY_REDIRECT_URI as string;
  const clientSecret = process.env.SPOTIFY_SECRET as string;

  if(!code) {
    res.status(400).json({err: "No Auth code provided"});
    return;
  }

  const data = new URLSearchParams({
    grant_type: "authorization_code",
    redirect_uri: redirectURI,
    code: code
  });

  try {
    const response = await axios.post("https://accounts.spotify.com/api/token", data, {
      headers: {
        'Authorization': 'Basic ' + (new Buffer(clientID + ':' + clientSecret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    console.log(response.data)
    res.status(200).json({access: response.data.access_token, refresh: response.data.refresh_token});
  } catch (e) {
    console.log(e);
    res.status(400).json({err: e});
  }
}

export default handler;