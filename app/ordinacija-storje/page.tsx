import client from "@/tina/__generated__/client";
import ClientOrdinacijaStorjePage from "./client-page";

export default async function Page() {
  const locationResponse = await client.queries.location({ relativePath: "ordinacija-storje.mdx" });

  return <ClientOrdinacijaStorjePage {...locationResponse} />;
}
