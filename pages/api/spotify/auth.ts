import {NextApiRequest, NextApiResponse} from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const clientID = process.env.SPOTIFY_ID as string;
  const redirectURI = process.env.SPOTIFY_REDIRECT_URI as string;
  const scope = "playlist-modify-private";
  res.writeHead(301,
    { location:
      `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&scope=${scope}&redirect_uri=${redirectURI}`
    })
    .end();
}

export default handler;