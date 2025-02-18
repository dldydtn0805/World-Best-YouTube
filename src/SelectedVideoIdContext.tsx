import { createContext, useContext, useState, ReactNode } from "react";

interface SelectedVideoIdType {
  selectedVideoId : string;
  setSelectedVideoId: (id:string) => void;
}
const SelectedVideoIdContext = createContext<SelectedVideoIdType | undefined>(undefined);

export const SelectedVideoIdProvider = ({children} : {children: ReactNode}) => {
  const [searchGetURL, setSearchGetURL] = useState<string>("");
  return (
    <SelectedVideoIdContext.Provider value = {{selectedVideoId: searchGetURL, setSelectedVideoId: setSearchGetURL}}>
      {children}
    </SelectedVideoIdContext.Provider>
  )
}

export const useSelectedVideoId = () => {
  const context = useContext(SelectedVideoIdContext);
  if (!context) {
    throw new Error("");
  }
  return context;
}