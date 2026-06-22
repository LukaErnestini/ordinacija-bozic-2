import client from "@/tina/__generated__/client";
import ClientHomePage from "./client-page";

export default async function Home() {
  const categories = await client.queries.serviceCategoryConnection();
  const globalQuery = await client.queries.global({ relativePath: "global.json" });
  const staffConnection = await client.queries.staffConnection();
  const locationsConnection = await client.queries.locationConnection();

  return (
    <ClientHomePage
      categoriesConnectionQuery={categories}
      globalQuery={globalQuery}
      staffConnectionQuery={staffConnection}
      locationsConnectionQuery={locationsConnection}
    ></ClientHomePage>
  );
}
