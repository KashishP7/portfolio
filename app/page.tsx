import { profile } from "@/content/profile";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <h1 className="text-5xl font-extrabold font-stretch-semi-expanded tracking-tight sm:text-7xl">
        {profile.name}
      </h1>
    </main>
  );
}
