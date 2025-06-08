import client from "@/tina/__generated__/client";
import ClientOrdinacijaPortorozPage from "./client-page";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Ordinacija Portorož | Specialistična zobozdravstvena ordinacija Božič",
    description: "Obiščite našo specialistično zobozdravstveno ordinacijo v Portorožu. Vrhunska zobozdravstvena oskrba z najnovejšimi tehnologijami.",
    alternates: {
      canonical: '/ordinacija-portoroz',
    },
  };
}

export default async function Page() {
  const locationResponse = await client.queries.location({ relativePath: "ordinacija-portoroz.mdx" });

  return <ClientOrdinacijaPortorozPage {...locationResponse} />;
}
