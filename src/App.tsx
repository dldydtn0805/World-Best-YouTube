import { useState, createContext, useContext } from 'react'
import './App.css'
import SearchBarComponent from "./SearchBarComponent";
import VideoComponent from "./VideoComponent";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchURLProvider } from './SearchURLContext';
const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)


  return (
    <QueryClientProvider client={queryClient}>
      <>
        <h1>있어보이는 사이트이름 포함된 네비게이션 컴포넌트</h1>
        <SearchURLProvider>
          <SearchBarComponent></SearchBarComponent>
          <VideoComponent></VideoComponent>
        </SearchURLProvider>
        <h1>유튜브 API 받아올 컴포넌트</h1>
        <h1>마이크를 켜고 에코를 넣어줄 수 있는 컴포넌트</h1>
      </>
    </QueryClientProvider>
  )
}

export default App
