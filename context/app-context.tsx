import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Progress } from "@/types";
import { User } from "firebase/auth";
import { getDefaultProgress } from "@/lib/auth-utils";

interface AppContextType {
  appUser?: User | null;
  progress: Progress;
  updateAppUser: (user: User | null) => void;
  updateProgress: (progress: Progress) => void;
}

const defaultProgress: Progress = getDefaultProgress();
const defaultAppContext: AppContextType = {
  appUser: undefined,
  progress: defaultProgress,
  updateAppUser: () => {},
  updateProgress: () => {},
};
const AppContext = createContext<AppContextType>(defaultAppContext);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [appUser, setAppUser] = useState<User | null>(null);
  const [progress, setProgress] = useState(defaultProgress);

  const state: AppContextType = {
    appUser: appUser,
    progress: progress,
    updateAppUser: setAppUser,
    updateProgress: setProgress,
  };

  useEffect(() => {
    const storedState = localStorage.getItem("appState");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setProgress(parsedState.progress);
    }
  }, []);

  useEffect(() => {
    const stateToStore = JSON.stringify({ appUser, progress });
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
