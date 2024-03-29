import CharacterGrid from "@/components/learn/character-grid";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <main className="pb-36 md:pb-0">
        <Navbar />
        <CharacterGrid />
      </main>
    </>
  );
}
