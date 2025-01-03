import client from "@/tina/__generated__/client";
import ClientObvestilaPage from "./client-page";

export default async function AboutUs() {
  const noticeData = await client.queries.noticeConnection();

  return <ClientObvestilaPage {...noticeData} />;
}
