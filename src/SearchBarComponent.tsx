import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  const [searchParams, setSearchParams] = useState("");
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const onChangeSearchParams = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(e.target.value);
  }
  const getYoutubeAPI = () => {
    setSearchGetURL(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchParams} 노래방&type=video&videoCategoryId=10&key=${apiKey}`);
  }

  const onKeyDownSearchParams =(e : React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getYoutubeAPI();
      setSearchParams("");
      refetch();
    }
  }
  // const [searchGetURL, setSearchGetURL] = useState(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchParams} 노래방&type=video&videoCategoryId=10&key=${apiKey}`);
  const {searchGetURL, setSearchGetURL} = useSearchURL();
  const { data, isStale, refetch } = useQuery<YouTubeSearchResponse>({
    queryKey: ["search"],
    queryFn: async () => {
      const response = await fetch(searchGetURL);
      const result: YouTubeSearchResponse = await response.json();
      return result;
    },
    enabled : false,
    staleTime: 1000 * 10
  })

  return (<div>
    <input value={searchParams} onChange={onChangeSearchParams} onKeyDown={onKeyDownSearchParams} type="text" />
  </div>)
}

export default SearchBarComponent;