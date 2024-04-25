import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
  } from "react";
  import { Progress } from "@/types";
  import { User } from "firebase/auth";
  import { useAuthState } from "react-firebase-hooks/auth";
  import { auth } from "@/config/firebase";
  
  interface AppContextType {
    user?: User | null;
    progress: Progress;
    updateProgress: () => void;
  }
  
  const defaultProgress: Record<string, number> = {};
  
  for (let i = 0; i < 26; i++) {
    defaultProgress[String.fromCharCode(65 + i)] = 0;
  }
  for (let i = 0; i < 10; i++) {
    defaultProgress[i.toString()] = 0;
  }
  
  const defaultAppContext: AppContextType = {
    user: undefined,
    progress: {
      characters: defaultProgress,
    },
    updateProgress: () => {},
  };
  const AppContext = createContext<AppContextType>(defaultAppContext);
  
  interface AppContextProviderProps {
    children: ReactNode;
  }
  
  export const AppContextProvider: React.FC<AppContextProviderProps> = ({
    children,
  }) => {
    const [user] = useAuthState(auth);
    const [progress, setProgress] = useState({
      characters: defaultProgress,
    });
  
    const updateProgress = () => {
      setProgress({
        characters: defaultProgress,
      });
    };
  
    const state: AppContextType = {
      user: user,
      progress: progress,
      updateProgress: updateProgress,
    };
  
    useEffect(() => {
      const storedState = localStorage.getItem("appState");
      if (storedState) {
        const parsedState = JSON.parse(storedState);
      }
    }, []);
  
    useEffect(() => {
      const stateToStore = JSON.stringify({});
      localStorage.setItem("appState", stateToStore);
    }, []);
  
    return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
  };
  
  export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("useAppContext must be used within AppContextProvider");
    }
    return context;
  };
  