import client from "@/tina/__generated__/client";
import LokacijeClientPage from "./client-page";

export default async function BusinessLocations() {
  const locations = await client.queries.locationConnection();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Nase Lokacije</h1>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
        <LokacijeClientPage {...locations}></LokacijeClientPage>
      </div>
    </div>
  );
}
