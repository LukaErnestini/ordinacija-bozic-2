import client from "@/tina/__generated__/client";
import ClientAboutUsPage from "./client-page";

export default async function AboutUs() {
  const [aboutData, staffData] = await Promise.all([
    client.queries.about({
      relativePath: "about.mdx"
    }),
    client.queries.staffConnection()
  ]);

  // Transform staff data into a lookup object
  const staffLookup = Object.fromEntries(
    staffData.data.staffConnection.edges?.map((edge) => {
      const node = edge?.node;
      return [node?._sys.filename, node];
    }) ?? []
  );

  return (
    <ClientAboutUsPage
      {...aboutData}
      staffData={staffLookup}
    />
  );
}
