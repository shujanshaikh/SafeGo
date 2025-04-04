import MapWithDirections from "@/components/map";

export default function Home() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center">🚗 SafeGo: AI-Powered Route Safety</h1>
      <MapWithDirections />
    </main>
  );
}
