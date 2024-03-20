import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <main className="flex">
        <Navbar />
        <section className="md:pl-[300px] flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-40"></section>
      </main>
    </>
  );
}
