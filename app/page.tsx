import client from "@/tina/__generated__/client";
import ServicesClientPage from "./storitve/client-page";

export default async function Home() {
  const services = await client.queries.servicesConnection();

  if (!services) {
    return null;
  }

  return (
    <div className="">
      <ServicesClientPage {...services}></ServicesClientPage>
      {/* <pre>{JSON.stringify(services, null, 2)}</pre> */}
      {/* <ServiceSmall service={services}></ServiceSmall> */}
    </div>
  );
}
