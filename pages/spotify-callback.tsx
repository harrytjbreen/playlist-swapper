import type { NextPage } from 'next'
import {useEffect} from "react";
import axios from "axios";
import useSpotifyAPI from "../hooks/useSpotifyAPI";

const SpotifyCallback: NextPage = () => {

  const {setTokens} = useSpotifyAPI();

  useEffect(() => {
    if(typeof window === "undefined") return;
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

    (async () => {
      const res = await axios.get(`/api/spotify/get-access?code=${code}`);
      setTokens(res.data);
    })();

  },[]);

  return (
    <>

    </>
  );
}

export default SpotifyCallback;