import { useQueryClient } from "@tanstack/react-query";
import { YouTubeVideoListResponse } from "./api";
import countryCodes from "./countryCode";

const SearchBarComponent = () => {
  const queryClient = useQueryClient();
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const clickCountyCodeButton = async (countryCode: string) => {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=${countryCode}&maxResults=10&key=${apiKey}`;
    await queryClient.fetchQuery<YouTubeVideoListResponse>({
      queryKey: ["search"],
      queryFn: async () => {
        const response = await fetch(url);
        const result: YouTubeVideoListResponse = await response.json();
        console.log("Search Result : ", result);
        return result;
      },
      staleTime: 1000 * 10
    });
  };

  return (
      <div>
        {countryCodes.map((country) => {
          return (
              <button
                  key={country.code}
                  onClick={() => clickCountyCodeButton(country.code)}
              >
                {country.name}
              </button>
          );
        })}
      </div>
  );
};

export default SearchBarComponent;