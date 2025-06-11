import client from "@/tina/__generated__/client";
import ClientHomePage from "./client-page";

export default async function Home() {
  const categories = await client.queries.serviceCategoryConnection();
  const globalQuery = await client.queries.global({ relativePath: "global.json" });

  return (
    <ClientHomePage
      categoriesConnectionQuery={categories}
      globalQuery={globalQuery}
    ></ClientHomePage>
  );
}
