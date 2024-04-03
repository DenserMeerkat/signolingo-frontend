import { atom } from "recoil";

type AuthModelState = {
  isOpen: boolean;
  type: "login" | "register" | "forgot-password";
};

const initialAuthModalState: AuthModelState = {
  isOpen: false,
  type: "login",
};

export const authModalState = atom<AuthModelState>({
  key: "authModalState",
  default: initialAuthModalState,
});
