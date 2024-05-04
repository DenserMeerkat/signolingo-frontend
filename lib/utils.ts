import { CharacterType } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCharacterType(character: string): CharacterType {
  if (character.match(/[a-zA-Z]/)) {
    return CharacterType.Alphabets;
  } else {
    return CharacterType.Numbers;
  }
}
