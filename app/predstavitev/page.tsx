import client from "@/tina/__generated__/client";
import ClientAboutUsPage from "./client-page";

export default async function AboutUs() {
  const data = await client.queries.about({
    relativePath: "about.mdx"
  });

  return <ClientAboutUsPage {...data}></ClientAboutUsPage>;
}
