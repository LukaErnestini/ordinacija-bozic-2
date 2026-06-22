import client from "@/tina/__generated__/client";
import { notFound } from "next/navigation";
import ClientCategoryPage from "./client-page";
import { Metadata } from "next";

const BASE_URL = "https://www.ordinacijabozic.si";

export async function generateMetadata(
  { params }: { params: Promise<{ category: string[] }> }
): Promise<Metadata> {
  const { category } = await params;
  try {
    const data = await client.queries.serviceCategory({
      relativePath: `${category}.mdx`,
    });
    const sc = data.data.serviceCategory;
    const title = sc.title
      ? `${sc.title} | Ordinacija Božič`
      : "Storitve | Ordinacija Božič";
    const description =
      sc.shortDescription ||
      `${sc.title ?? "Storitve"} – zobozdravstvene storitve ordinacije Božič.`;
    const imageUrl = sc.icon
      ? (sc.icon.startsWith("http") ? sc.icon : `${BASE_URL}${sc.icon}`)
      : undefined;
    return {
      title,
      description,
      alternates: {
        canonical: `/${category}`,
      },
      openGraph: {
        title,
        description,
        url: `${BASE_URL}/${category}`,
        type: "website",
        ...(imageUrl
          ? {
              images: [
                {
                  url: imageUrl,
                  width: 1200,
                  height: 630,
                  alt: sc.title ?? "Storitve",
                },
              ],
            }
          : {}),
      },
    };
  } catch {
    return {
      title: "Storitve | Ordinacija Božič",
      alternates: { canonical: `/${category}` },
    };
  }
}

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

    const sc = serviceCategoryQuery.data.serviceCategory;

    // Service schema for this category.
    const serviceLd = {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      "name": sc.title,
      "description": sc.shortDescription,
      "url": `${BASE_URL}/${category}`,
      "provider": {
        "@id": `${BASE_URL}/#clinic`,
      },
    };

    // BreadcrumbList: Home › <Category>
    const breadcrumbsLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Domov",
          "item": BASE_URL,
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": sc.title ?? "Storitve",
          "item": `${BASE_URL}/${category}`,
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
        <ClientCategoryPage
          serviceCategoryQuery={serviceCategoryQuery}
          servicesConnection={servicesConnection}
        ></ClientCategoryPage>
      </>
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
