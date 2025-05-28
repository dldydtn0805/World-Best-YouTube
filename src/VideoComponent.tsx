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
        <div className="video-gallery">
            {data?.items.map((e, rank)=>
                <div className="video-item" onClick={()=>selectVideo(e.id)}>
                    <span className="video-rank">{rank + 1}</span>
                    <img className="video-thumbnail" key={e.id} src={`${e.snippet.thumbnails.high.url}`} alt="" />
                </div>
            )}
        </div>
    )
}

export default SearchedVideoListComponent;