// src/components/Homepage.js
import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import "../../loader.css"
import VideoRecorder from "./VideoRecord";
// import { data } from "../data/data";
import MusicPlayer from "./MusicPlayer";
import VideoStream from "./VideoStream";
const Home = () => {
  const webcamRef = React.useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [emotion, setEmotion] = useState("")
  const [musicRecommendations, setMusicRecommendations] = useState([]);
  const [loading, setLoading] = useState(false)

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    fetchMusicRecommendations(imageSrc);
  }, [webcamRef]);

  const fetchMusicRecommendations = async (imageSrc) => {
    // Call your music recommendation API here
    try {
      const response = await axios.post("https://mpvnpzpw-8000.inc1.devtunnels.ms/home", {
        imageSrc,
      });
      // setMusicRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching music recommendations:", error);
    }
  };

  return (
    <div className="h-screen bg-emerald-800 ">
      <Navbar />
      <div className="flex flex-col items-center justify-center  bg-emerald-800 py-6">
        <div >
          {/* <VideoRecorder /> */}
          <VideoStream {...{music:musicRecommendations, setMusic:setMusicRecommendations, setEmotion: setEmotion, setLoading:setLoading}} />
        </div>
        <h2 className="text-4xl font-bold mb-4 text-white py-4">
             Emotion: {emotion}
            </h2>
            {loading && (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>)}
        {musicRecommendations.length > 0 && (
          <div className="mt-8">
            {/* <hr className="py-4"></hr> */}
            <h2 className="text-3xl font-bold mb-4 text-white text-center">
              Music Recommendations
            </h2>
            <div className="grid lg:grid-cols-4 grid-cols-1 max-w-7xl mx-auto gap-5 py-4">
              {musicRecommendations.map((recommendation, index) => {
                console.log(recommendation)
                 return <MusicPlayer key={index} item={recommendation} />
})}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
