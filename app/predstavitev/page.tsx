import client from "@/tina/__generated__/client";
import ClientAboutUsPage from "./client-page";
import { Metadata } from "next";

const BASE_URL = "https://www.ordinacijabozic.si";

export async function generateMetadata(): Promise<Metadata> {
  // Fixed SEO-friendly title; CMS `about.title` ("SZO Božič") would otherwise
  // produce a redundant "SZO Božič | Ordinacija Božič" in the browser tab.
  const title = "Naša ekipa – zobozdravniki in specialisti | Ordinacija Božič";
  try {
    const aboutData = await client.queries.about({ relativePath: "about.mdx" });
    const about = aboutData.data.about;
    const description =
      about.subtitle ||
      "Spoznajte ekipo specialistov in zobozdravnikov ordinacije Božič v Štorjah in Portorožu.";
    const imageUrl = about.image
      ? (about.image.startsWith("http") ? about.image : `${BASE_URL}${about.image}`)
      : undefined;
    return {
      title,
      description,
      alternates: {
        canonical: "/predstavitev",
      },
      openGraph: {
        title,
        description,
        url: `${BASE_URL}/predstavitev`,
        type: "website",
        ...(imageUrl
          ? {
              images: [
                {
                  url: imageUrl,
                  width: 1200,
                  height: 630,
                  alt: about.title ?? "Predstavitev ekipe ordinacije Božič",
                },
              ],
            }
          : {}),
      },
    };
  } catch {
    return {
      title,
      description:
        "Spoznajte ekipo specialistov in zobozdravnikov ordinacije Božič v Štorjah in Portorožu.",
      alternates: { canonical: "/predstavitev" },
    };
  }
}

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
  ],
};

export default async function AboutUs() {
  const [aboutData, staffData] = await Promise.all([
    client.queries.about({
      relativePath: "about.mdx"
    }),
    client.queries.staffConnection()
  ]);

  // Transform staff data into a lookup object
  const staffLookup = Object.fromEntries(
    staffData.data.staffConnection.edges?.map((edge) => {
      const node = edge?.node;
      return [node?._sys.filename, node];
    }) ?? []
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <ClientAboutUsPage
        {...aboutData}
        staffData={staffLookup}
      />
    </>
  );
}
