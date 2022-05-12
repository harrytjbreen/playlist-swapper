import type { NextPage } from 'next'
import {useEffect} from "react";
import axios from "axios";

const SpotifyCallback: NextPage = () => {


  useEffect(() => {
    if(typeof window === "undefined") return;
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");

  },[])

  return (
    <>

    </>
  );
}

export default SpotifyCallback;