import client from "@/tina/__generated__/client";
import ClientPredstavitevPage from "./client-page";
import { Metadata } from "next";

const BASE_URL = "https://www.ordinacijabozic.si";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join("/");
  try {
    const data = await client.queries.staff({ relativePath: `${slugPath}.mdx` });
    const s = data.data.staff;
    const title = s.name
      ? `${s.name} | Ordinacija Božič`
      : "Predstavitev | Ordinacija Božič";
    const description = s.title
      ? `${s.name ?? ""} – ${s.title}. Spoznajte ekipo ordinacije Božič.`
      : "Spoznajte ekipo ordinacije Božič.";
    const imageUrl = s.image
      ? (s.image.startsWith("http") ? s.image : `${BASE_URL}${s.image}`)
      : undefined;
    return {
      title,
      description,
      alternates: {
        canonical: `/predstavitev/${slugPath}`,
      },
      openGraph: {
        title,
        description,
        url: `${BASE_URL}/predstavitev/${slugPath}`,
        type: "profile",
        ...(imageUrl
          ? {
              images: [
                {
                  url: imageUrl,
                  width: 1200,
                  height: 630,
                  alt: s.name ?? "Ordinacija Božič",
                },
              ],
            }
          : {}),
      },
    };
  } catch {
    return {
      title: "Predstavitev | Ordinacija Božič",
      alternates: { canonical: `/predstavitev/${slugPath}` },
    };
  }
}

export default async function Storitev({ params }: { params: Promise<{ slug: string[] }> }) {
  const fileName = (await params).slug;
  const data = await client.queries.staff({ relativePath: `${fileName.join("/")}.mdx` });
  const s = data.data.staff;
  const slugPath = fileName.join("/");
  const imageUrl = s.image
    ? (s.image.startsWith("http") ? s.image : `${BASE_URL}${s.image}`)
    : undefined;

  // Person schema for this individual dentist/staff member.
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": s.name,
    "jobTitle": s.title,
    ...(imageUrl ? { image: imageUrl } : {}),
    "url": `${BASE_URL}/predstavitev/${slugPath}`,
    "worksFor": {
      "@id": `${BASE_URL}/#clinic`,
    },
  };

  // BreadcrumbList: Home › Predstavitev › <Name>
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
        "name": "Predstavitev",
        "item": `${BASE_URL}/predstavitev`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": s.name ?? "",
        "item": `${BASE_URL}/predstavitev/${slugPath}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <ClientPredstavitevPage {...data}></ClientPredstavitevPage>
    </>
  );
}

export async function generateStaticParams() {
  const services = await client.queries.staffConnection();
  const paths = services.data?.staffConnection.edges?.map((edge) => ({
    slug: edge?.node?._sys.breadcrumbs
  }));

  return paths || [];
}
