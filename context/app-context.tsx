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
import { randomUsername } from "@/lib/random";

interface AppContextType {
  appUser?: User | null;
  userData: UserData;
  updateAppUser: (user: User | null) => void;
  updateUserData: (userData: UserData) => void;
}

const defaultProgress: Record<string, number> = getDefaultProgress();
const username: string = randomUsername();

const defaultAppContext: AppContextType = {
  appUser: undefined,
  userData: {
    characters: defaultProgress,
    avatar: "ReliableRhinoceros",
    userName: username,
  },
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
  const [username, setUsername] = useState(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      return storedUsername;
    } else {
      const newUsername = randomUsername();
      localStorage.setItem("username", newUsername);
      return newUsername;
    }
  });
  const [userData, setUserData] = useState<UserData>({
    characters: defaultProgress,
    avatar: "ReliableRhinoceros",
    userName: username,
  });

  const state: AppContextType = {
    appUser: appUser,
    userData: userData,
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
