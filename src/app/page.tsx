
import { getServerAuthSession } from "@/server/auth";
import LastLinks from "./components/home/last-links";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex flex-col items-center justify-start text-black relative h-[calc(100dvh-72px)] overflow-y-hidden">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem] mt-20">
          Yet Another Url Shortener
      </h1>
      <p className="text-2xl font-normal">Short your links with custom slugs or weird and complex hashes!</p>
      <LastLinks/>
    </main>
  );
}

