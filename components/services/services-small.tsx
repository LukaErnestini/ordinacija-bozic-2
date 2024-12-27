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
export default function ServicesSmall(props: ClientServicesProps) {
  const { data } = useTina({ ...props });

  return (
    <section className="py-12">
      <h2 className="text-center text-4xl font-semibold capitalize mb-8">Storitve ki jih nudimo</h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.servicesConnection.edges?.map((serviceData) => {
            const service = serviceData!.node!;
            return (
              <Link
                href={"storitve/" + service._sys.filename}
                key={service?.id}
                className="btn h-56 justify-start flex-nowrap group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
              >
                <Image
                  width={54}
                  height={54}
                  src={service.icon}
                  alt={service.title}
                  className="mb-2"
                />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{service.shortDescription}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
