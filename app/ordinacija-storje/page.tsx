// import { draftMode } from "next/headers";
// import client from "@/tina/__generated__/client";
// import ClientPage from "./client-page";

// export default async function Page() {
//   const [locationsResponse] = await Promise.all([client.queries.locationConnection()]);
//   const isEnabled = draftMode().isEnabled;

//   const storjeLocation = locationsResponse.data.locationConnection.edges?.find((edge) =>
//     edge?.node?.label?.toLowerCase().includes("štorje")
//   );

//   if (!storjeLocation?.node) {
//     return <div>Location not found</div>;
//   }

//   return (
//     <ClientPage
//       data={locationsResponse}
//       filter="štorje"
//     />
//   );
// }
