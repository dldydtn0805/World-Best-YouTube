import { useQuery } from "@tanstack/react-query";
import { YouTubeVideoListResponse } from "./api";
import { useSelectedVideoId } from "./SelectedVideoIdContext";

const SearchedVideoListComponent = () => {
  const {selectedVideoId, setSelectedVideoId} = useSelectedVideoId();
  const { data } = useQuery<YouTubeVideoListResponse>({
      queryKey: ["search"],
      enabled : false,
      staleTime: 1000 * 10
  })

  const selectVideo = (id : string) => {
    setSelectedVideoId(id);
    console.log(selectedVideoId);
  }

  return (
    <div>
      {data?.items.map((e)=> 
      <img key = {e.id} src={`${e.snippet.thumbnails.high.url}`} alt="" onClick={()=>selectVideo(e.id)} />
      )}
    </div>
  )
}

export default SearchedVideoListComponent;