import client from "@/tina/__generated__/client";
import ClientOrdinacijaPortorozPage from "./client-page";

export default async function Page() {
  const locationResponse = await client.queries.location({ relativePath: "ordinacija-portoroz.mdx" });

  return <ClientOrdinacijaPortorozPage {...locationResponse} />;
}
