import './App.css'
import SearchBarComponent from "./SearchBarComponent";
import SearchedVideoListComponent from "./VideoComponent";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SelectedVideoIdProvider } from './SelectedVideoIdContext';
import VideoPlayerComponent from './VideoPlayerComponent';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <h1>World Best YouTube</h1>
        <SelectedVideoIdProvider>
          <SearchBarComponent></SearchBarComponent>
          <VideoPlayerComponent></VideoPlayerComponent>
          <SearchedVideoListComponent></SearchedVideoListComponent>
        </SelectedVideoIdProvider>
      </>
    </QueryClientProvider>
  )
}

export default App
