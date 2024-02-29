
import { getServerAuthSession } from "@/server/auth";
import LastLinks from "./components/home/last-links";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="w-3/4 mx-auto text-center flex flex-col items-center justify-start text-black relative h-[calc(100dvh-72px)] overflow-y-hidden">
      <h1 className="text-4xl md:text-5xl xl:text-6xl  font-extrabold tracking-tight mt-20">
          Yet Another Url Shortener
      </h1>
      <p className="text-md md:text-lg lg:text-xl xl:text-2xl font-normal">Short your links with custom slugs or weird and complex hashes!</p>
      <LastLinks/>
    </main>
  );
}

