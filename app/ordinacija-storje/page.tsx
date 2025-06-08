import client from "@/tina/__generated__/client";
import ClientOrdinacijaStorjePage from "./client-page";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Ordinacija Štorje | Specialistična zobozdravstvena ordinacija Božič",
    description: "Obiščite našo specialistično zobozdravstveno ordinacijo v Štorjah, Sežana. Vrhunska zobozdravstvena oskrba z najnovejšimi tehnologijami.",
    alternates: {
      canonical: '/ordinacija-storje',
    },
  };
}

export default async function Page() {
  const locationResponse = await client.queries.location({ relativePath: "ordinacija-storje.mdx" });

  return <ClientOrdinacijaStorjePage {...locationResponse} />;
}
