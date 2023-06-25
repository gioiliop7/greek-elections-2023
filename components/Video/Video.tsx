import { useState } from "react";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  const handleClose = () => {
    setIsPlaying(false);
  };

  if (
    !isPlaying ||
    new Date().getDate() !== 25 ||
    new Date().getMonth() !== 5 ||
    new Date().getFullYear() !== 2023
  ) {
    return null; // Render nothing when not playing or if it's not the specified date
  }
  const autoplaySrc = `${src}?autoplay=1`;

  return (
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
  );
};

export default VideoPlayer;
