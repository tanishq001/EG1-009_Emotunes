import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

const MusicPlayer = ({ item }) => {
  const { id, name, Mood, artist } = item;
  const [html, setHtml] = useState("")
  const dataRef = useRef()
  useEffect(() =>{
      const fetchData  = async ()  =>  {
        try{
          let response = await axios.get(`https://embed.spotify.com/oembed`,{
            params:{
              url : `https://open.spotify.com/track/${id}`
            }
          })
          console.log(response)
          dataRef.current.innerHTML = response.data.html
        }catch(e){
          console.log(e)
        }
      }

      fetchData()
  },[])
  return <div className="shadow-lg" ref={dataRef}>{name}</div>
};

export default MusicPlayer;
