import client from "@/tina/__generated__/client";
import ClientOrdinacijaPortorozPage from "./client-page";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Zobozdravnik Portorož | Ordinacija Božič";
  const description = "Specialistična zobozdravstvena ordinacija Božič v Portorožu na slovenski obali. Ortodontija (Invisalign, Spark), protetika in splošno zobozdravstvo. Naročite se na pregled.";
  return {
    title,
    description,
    alternates: {
      canonical: '/ordinacija-portoroz',
    },
    openGraph: {
      title,
      description,
      url: "https://www.ordinacijabozic.si/ordinacija-portoroz",
      type: "website",
      images: [
        {
          url: "https://www.ordinacijabozic.si/558D0AEA-870E-42C1-AFE3-72A175C74CAC.jpg",
          width: 1200,
          height: 630,
          alt: "Ordinacija Božič – Portorož",
        },
      ],
    },
  };
}

export default async function Page() {
  const locationResponse = await client.queries.location({ relativePath: "ordinacija-portoroz.mdx" });

  return <ClientOrdinacijaPortorozPage {...locationResponse} />;
}
