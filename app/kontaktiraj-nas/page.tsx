import client from "@/tina/__generated__/client";
import ContactUsClientPage from "./client-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt – Naročilo na zobozdravstveni pregled | Ordinacija Božič",
  description:
    "Pokličite ali pišite ordinaciji Božič v Štorjah pri Sežani in Portorožu. Naročite se na zobozdravstveni pregled, ortodontijo, protetiko ali drugo specialistično obravnavo.",
  alternates: {
    canonical: "/kontaktiraj-nas",
  },
};

export default async function ContactPage() {
  const locations = await client.queries.locationConnection();
  const globalQuery = await client.queries.global({ relativePath: "global.json" });

  return (
    <div className="container mx-auto py-12">
      <ContactUsClientPage
        locations={locations}
        globalQuery={globalQuery}
      />
    </div>
  );
}
