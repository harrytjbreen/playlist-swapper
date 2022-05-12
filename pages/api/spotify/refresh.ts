import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const clientID = process.env.SPOTIFY_ID as string;
  const clientSecret = process.env.SPOTIFY_SECRET as string;
  const refreshToken = req.query.refresh as string;

  if(!refreshToken) {
    res.status(400).json({err: "Refresh token not supplied"})
  }
  const data = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken
  });

  try {
    const response = await axios.post("https://accounts.spotify.com/api/token", data, {
      headers: {
        'Authorization': 'Basic ' + (new Buffer(clientID + ':' + clientSecret).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    res.status(200).json({access: response.data.access_token})
  } catch (e) {
    console.log(e);
    res.status(400).json({err: e})
  }

}

export default handler;