import React, { useState, useEffect } from "react";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const isPlayingString = localStorage.getItem("videoIsPlaying");
    const storedIsPlaying = isPlayingString
      ? JSON.parse(isPlayingString)
      : true;
    setIsPlaying(storedIsPlaying);
  }, []);

  const handleClose = () => {
    setIsPlaying(false);
    localStorage.setItem("videoIsPlaying", JSON.stringify(false));
  };

  const handleOpen = () => {
    setIsPlaying(true);
    localStorage.setItem("videoIsPlaying", JSON.stringify(true));
  };

  if (
    !isPlaying &&
    (new Date().getDate() !== 25 ||
      new Date().getMonth() !== 5 ||
      new Date().getFullYear() !== 2023)
  ) {
    return null; // Render null for any date other than 25/06/2023 when not playing
  }

  const autoplaySrc = `${src}?autoplay=1`;

  return (
    <div>
      {!isPlaying && (
        <button
          className="text-white bg-red-500 rounded-md px-2 py-1 absolute right-20 top-[200px]"
          onClick={handleOpen}
        >
          Live Streaming
        </button>
      )}
      {isPlaying && (
        <div>
          <iframe
            className="w-full h-[350px] max-w-md absolute z-10 bottom-0 right-10"
            loading="lazy"
            src={autoplaySrc}
            allowFullScreen={true}
          ></iframe>
          <button
            className="absolute bottom-[300px] z-30 right-[55px] text-white bg-red-500 rounded-md px-2 py-1"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
