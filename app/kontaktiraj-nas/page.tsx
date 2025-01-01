import client from "@/tina/__generated__/client";
import ContactUsClientPage from "./client-page";

export default async function ContactPage() {
  const locations = await client.queries.locationConnection();

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Kontaktirajte nas</h1>
      <ContactUsClientPage locations={locations}></ContactUsClientPage>
    </div>
  );
}
