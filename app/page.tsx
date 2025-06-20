import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex flex-col w-full h-full bg-red-500 gap-[32px] row-start-2 items-center sm:items-start">
      <Card className="p-5 mx-auto my-5">Bonjour ceci est une card</Card>
    </main>
  );
}
