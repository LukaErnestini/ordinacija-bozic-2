export default async function Storitve() {
  // const services = await client.queries.servicesConnection();

  // const mappedServices = services.data.servicesConnection
  //   .edges!.map((s) => {
  //     const service = s!.node!;
  //     return {
  //       shortDescription: service.longDescription,
  //       title: service.title,
  //       icon: service.icon
  //     };
  //   })
  //   .filter(Boolean); // Remove null values

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-center text-4xl font-semibold capitalize mb-8">Nase Storitve</h1>
        TO DO
        {/* <ServicesList services={mappedServices} /> */}
      </div>
    </main>
  );
}
