import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { UserData } from "@/types";
import { User } from "firebase/auth";
import { getDefaultProgress } from "@/lib/auth-utils";

interface AppContextType {
  appUser?: User | null;
  userData: UserData;
  updateAppUser: (user: User | null) => void;
  updateUserData: (userData: UserData) => void;
}

const defaultProgress: Record<string, number> = getDefaultProgress();
const defaultAppContext: AppContextType = {
  appUser: undefined,
  userData: { characters: defaultProgress, avatar: "" },
  updateAppUser: () => {},
  updateUserData: () => {},
};
const AppContext = createContext<AppContextType>(defaultAppContext);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [appUser, setAppUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData>({
    characters: defaultProgress,
    avatar: "",
  });

  const state: AppContextType = {
    appUser: appUser,
    userData: { characters: defaultProgress, avatar: "" },
    updateAppUser: setAppUser,
    updateUserData: setUserData,
  };

  useEffect(() => {
    const storedState = localStorage.getItem("appState");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setUserData(parsedState.userData);
    }
  }, []);

  useEffect(() => {
    const stateToStore = JSON.stringify({ appUser, userData });
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
