import { db } from "@/config/firebase";
import { Progress } from "@/types";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
} from "firebase/firestore";

export const getEmailFromIdentifier = async (identifier: string) => {
  if (identifier.includes("@")) {
    return identifier;
  } else {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", identifier));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return userDoc.data().email;
    } else {
      console.log(`No user found with username ${identifier}.`);
      return null;
    }
  }
};

export const getUserProgress = async (uid: string) => {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data().progress as Progress;
  } else {
    console.log(`No user found with uid ${uid}.`);
    return null;
  }
};

export const createUserDocument = async (
  uid: string,
  username: string,
  email: string,
) => {
  const userDocRef = doc(db, "users", uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    await setDoc(userDocRef, {
      username: username,
      email: email,
      progress: getDefaultProgress(),
    });
  } else {
    console.log(`User document with username ${username} already exists.`);
  }
};

export const getDefaultProgress = (): Progress => {
  const defaultCharacterProgress: Record<string, number> = {};

  for (let i = 0; i < 26; i++) {
    defaultCharacterProgress[String.fromCharCode(65 + i)] = 0;
  }
  for (let i = 0; i < 10; i++) {
    defaultCharacterProgress[i.toString()] = 0;
  }

  return {
    characters: defaultCharacterProgress,
  } as Progress;
};
