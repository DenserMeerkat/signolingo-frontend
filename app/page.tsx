"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/app-context";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

export default function Home() {
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const params = new URLSearchParams();
    if (!user) {
      params.append("auth", "login");
    }
    router.push("/learn" + "?" + params.toString());
  }, [router, user]);

  return <main />;
}
