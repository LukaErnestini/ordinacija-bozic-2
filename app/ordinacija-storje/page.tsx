import client from "@/tina/__generated__/client";
import ClientOrdinacijaStorjePage from "./client-page";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Zobozdravnik Sežana – Ordinacija Štorje | Ordinacija Božič";
  const description = "Specialistična zobozdravstvena ordinacija Božič v Štorjah pri Sežani. Ortodontija (Invisalign, Spark), protetika in splošno zobozdravstvo. 30 let tradicije – naročite se na pregled.";
  return {
    title,
    description,
    alternates: {
      canonical: '/ordinacija-storje',
    },
    openGraph: {
      title,
      description,
      url: "https://www.ordinacijabozic.si/ordinacija-storje",
      type: "website",
      images: [
        {
          url: "https://www.ordinacijabozic.si/a.jpg",
          width: 1200,
          height: 630,
          alt: "Ordinacija Božič – Štorje",
        },
      ],
    },
  };
}

export default async function Page() {
  const locationResponse = await client.queries.location({ relativePath: "ordinacija-storje.mdx" });

  return <ClientOrdinacijaStorjePage {...locationResponse} />;
}
