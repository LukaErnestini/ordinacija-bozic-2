import client from "@/tina/__generated__/client";
import { notFound } from "next/navigation";
import ClientCategoryPage from "./client-page";

export default async function CategoryPage({ params }: { params: Promise<{ category: string[] }> }) {
  const { category } = await params;

  try {
    const serviceCategoryQuery = await client.queries.serviceCategory({
      relativePath: `${category}.mdx`
    });
    const servicesConnection = await client.queries.servicesConnection({
      filter: {
        category: {
          serviceCategory: {
            title: {
              eq: serviceCategoryQuery.data.serviceCategory.title
            }
          }
        }
      }
    });

    return (
      <ClientCategoryPage
        serviceCategoryQuery={serviceCategoryQuery}
        servicesConnection={servicesConnection}
      ></ClientCategoryPage>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    notFound();
  }
}

// Generate static paths at build time
export async function generateStaticParams() {
  const categories = await client.queries.serviceCategoryConnection();

  const paths =
    categories.data?.serviceCategoryConnection.edges?.map((edge) => ({
      category: edge?.node?._sys.filename
    })) || [];

  return paths;
}
