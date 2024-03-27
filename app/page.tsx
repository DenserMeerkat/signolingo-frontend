import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <main className="flex">
        <Navbar />
        <div className="sm:w-[80px] lg:w-[280px]"></div>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"></section>
      </main>
    </>
  );
}
