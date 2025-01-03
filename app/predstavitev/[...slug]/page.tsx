import client from "@/tina/__generated__/client";
import ClientPredstavitevPage from "./client-page";

export default async function Storitev({ params }: { params: Promise<{ slug: string[] }> }) {
  const fileName = (await params).slug;
  const data = await client.queries.staff({ relativePath: `${fileName.join("/")}.mdx` });
  return <ClientPredstavitevPage {...data}></ClientPredstavitevPage>;
}

export async function generateStaticParams() {
  const services = await client.queries.staffConnection();
  const paths = services.data?.staffConnection.edges?.map((edge) => ({
    slug: edge?.node?._sys.breadcrumbs
  }));

  return paths || [];
}
