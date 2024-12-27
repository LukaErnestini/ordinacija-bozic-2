import client from "@/tina/__generated__/client";
import StoritevClientPage from "./client-page";

export default async function Storitev({ params }: { params: Promise<{ slug: string[] }> }) {
  const fileName = (await params).slug;
  const data = await client.queries.services({ relativePath: `${fileName.join("/")}.mdx` });
  return <StoritevClientPage {...data}></StoritevClientPage>;
}

export async function generateStaticParams() {
  const services = await client.queries.servicesConnection();
  const paths = services.data?.servicesConnection.edges?.map((edge) => ({
    slug: edge?.node?._sys.breadcrumbs
  }));
  console.log(paths);
  return paths || [];
}
