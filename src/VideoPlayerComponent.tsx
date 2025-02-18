import { useSelectedVideoId } from "./SelectedVideoIdContext";

const VideoPlayerComponent = () => {
  const {selectedVideoId} = useSelectedVideoId();
  return <div>
    <iframe allowFullScreen key = {selectedVideoId} src= {selectedVideoId ? `https://www.youtube.com/embed/${selectedVideoId}` :  `https://www.youtube.com/embed/61JHONRXhjs?si=8vU03OU-ruEnKl4b`} width={720} height={480} ></iframe>
  </div>
}

export default VideoPlayerComponent;