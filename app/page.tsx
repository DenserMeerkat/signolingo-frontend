import { Suspense } from "react";
import CharacterGrid from "@/components/learn/character-grid";
import { CircularProgress } from "@nextui-org/progress";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <main className="pb-36 md:pb-0">
        <Suspense fallback={<LoadingScreen />}>
          <Navbar />
          <CharacterGrid />
        </Suspense>
      </main>
    </>
  );
}

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <CircularProgress color="primary" />
    </div>
  );
};
