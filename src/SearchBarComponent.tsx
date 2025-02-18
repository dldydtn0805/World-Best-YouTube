import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchURL } from "./SearchURLContext";

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

const SearchBarComponent = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useState("");
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const onChangeSearchParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(e.target.value);
  }

  const onEnterKeyDownSearchParams = async (e : React.KeyboardEvent<HTMLInputElement> & React.ChangeEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${e.target.value} 노래방&type=video&videoCategoryId=10&key=${apiKey}`
      await queryClient.fetchQuery<YouTubeSearchResponse>({
        queryKey: ["search", e.target.value],
        queryFn: async () => {
          const response = await fetch(url);
          const result: YouTubeSearchResponse = await response.json();
          return result;
        },
        staleTime: 1000 * 10
      })
      setSearchParams("");
    }
  }
  
  return (<div>
    <input value={searchParams} onChange={onChangeSearchParams} onKeyDown={onEnterKeyDownSearchParams} type="text" />
  </div>)
}

export default SearchBarComponent;