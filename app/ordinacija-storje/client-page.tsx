// "use client";

// import { LocationConnectionQuery } from "@/tina/__generated__/types";
// import { useTina } from "tinacms/dist/react";
// import Location from "@/components/locations/location";

// interface ClientPageProps {
//   data: LocationConnectionQuery;
//   filter: string;
// }

// export default function ClientPage({ data, filter }: ClientPageProps) {
//   const { data: tinaData } = useTina(data);

//   const location = tinaData.locationConnection.edges?.find((edge) => edge?.node?.label?.toLowerCase().includes(filter));

//   if (!location?.node) {
//     return <div>Location not found</div>;
//   }

//   return (
//     <main className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-playfair mb-8">Ordinacija {location.node.label}</h1>
//       <Location location={location.node} />
//     </main>
//   );
// }
