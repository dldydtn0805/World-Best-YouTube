import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchURL } from "./SearchURLContext";

const VideoComponent = () => {
  const queryClient = useQueryClient();
  type YouTubeSearchResponse = {
    kind : string;
    etag : string;
    nextPageToken?: string;
    regionCode : string;
    pageInfo: PageInfo;
    items : SearchResult[];
  }
  type PageInfo = {
    totalResults: number;
    resultsPerPage: number;
  }

  type SearchResult = {
    kind: string;
    etag: string;
    id: VideoId;
    snippet: VideoSnippet;
  }

  type VideoId = {
    kind: string;
    videoId: string;
  }

  type VideoSnippet = {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: ThumbnailSet;
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  }

  type ThumbnailSet = {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
  }

  type Thumbnail = {
    url: string;
    width: number;
    height: number;
  }
  
  const {searchGetURL, setSearchGetURL} = useSearchURL();
  const { data } = useQuery<YouTubeSearchResponse>({
      queryKey: ["search"],
      enabled : false,
      staleTime: 1000 * 10
  })
  return (
    <div>
      {searchGetURL}
      {data?.items.map((e)=> 
      <img key = {e.id.videoId} src={`${e.snippet.thumbnails.high.url}`} alt="" />
      )}
      
    </div>
  )
}

export default VideoComponent;