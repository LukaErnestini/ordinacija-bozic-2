"use client";

import Image from "next/image";
import { ServicesConnectionQuery, ServicesConnectionQueryVariables } from "@/tina/__generated__/types";
import { useTina } from "tinacms/dist/react";
import Link from "next/link";

interface ClientServicesProps {
  data: ServicesConnectionQuery;
  variables: ServicesConnectionQueryVariables;
  query: string;
}
export default function ServicesClientPage(props: ClientServicesProps) {
  const { data } = useTina({ ...props });

  return (
    <div>
      {data?.servicesConnection.edges?.map((serviceData) => {
        const service = serviceData!.node!;
        return (
          <div
            key={service?.id}
            className="flex flex-col items-center text-center max-w-[300px]"
          >
            <Image
              width={50}
              height={50}
              src={service.icon}
              alt={service.title}
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-3 text-sm">{service.shortDescription}</p>
            <Link
              href={service._sys.filename}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Read more
            </Link>
          </div>
          // <pre key={service?.id}>{JSON.stringify(service, null, 2)}</pre>
          // <ServiceSmall key={}></ServiceSmall>
        );
      })}
    </div>
  );
}
