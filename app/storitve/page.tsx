import client from "@/tina/__generated__/client";
import ServicesList from "@/components/services/services-list";

export default async function Storitve() {
  const services = await client.queries.servicesConnection();

  const mappedServices = services.data.servicesConnection
    .edges!.map((s) => {
      const service = s!.node!;
      return {
        shortDescription: service.longDescription,
        type: service.type,
        title: service.title,
        icon: service.icon
      };
    })
    .filter(Boolean); // Remove null values

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-center text-4xl font-semibold capitalize mb-8">Storitve ki jih nudimo</h1>
        <ServicesList services={mappedServices} />
      </div>
    </main>
  );
}
