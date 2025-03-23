import client from "@/tina/__generated__/client";
import ContactUsClientPage from "./client-page";

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
