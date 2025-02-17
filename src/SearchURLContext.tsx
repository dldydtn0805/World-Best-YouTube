import { createContext, useContext, useState, ReactNode } from "react";

interface SearchURLContextType {
  searchGetURL : string;
  setSearchGetURL: (url:string) => void;
}
const SearchURLContext = createContext<SearchURLContextType | undefined>(undefined);

export const SearchURLProvider = ({children} : {children: ReactNode}) => {
  const [searchGetURL, setSearchGetURL] = useState<string>("");
  return (
    <SearchURLContext.Provider value = {{searchGetURL, setSearchGetURL}}>
      {children}
    </SearchURLContext.Provider>
  )
}

export const useSearchURL = () => {
  const context = useContext(SearchURLContext);
  if (!context) {
    throw new Error("");
  }
  return context;
}