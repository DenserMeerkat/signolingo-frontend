"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import { getUserData } from "@/lib/auth-utils";
import { useAppContext } from "@/context/app-context";

export default function Home() {
  const { updateAppUser, updateUserData } = useAppContext();
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const params = new URLSearchParams();
    if (!user) {
      params.append("auth", "login");
    } else {
      getUserData(user.uid).then((data) => {
        if (data) {
          updateAppUser(user);
          updateUserData(data);
        }
      });
    }
    router.push("/learn" + "?" + params.toString());
  }, [router, user, updateAppUser, updateUserData]);

  return <main />;
}
