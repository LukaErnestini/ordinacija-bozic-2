import client from "@/tina/__generated__/client";
import ClientObvestilaPage from "./client-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pomembna obvestila | Ordinacija Božič",
  description:
    "Aktualna obvestila in novice ordinacije Božič. Spremembe ordinacijskih ur, dopusti, prazniki in druge pomembne informacije za paciente.",
  alternates: {
    canonical: "/obvestila",
  },
};

export default async function AboutUs() {
  const noticeData = await client.queries.noticeConnection();

  return <ClientObvestilaPage {...noticeData} />;
}
