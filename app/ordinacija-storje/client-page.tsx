"use client";

import { LocationComponent } from "@/components/locations/location";
import { LocationQuery } from "@/tina/__generated__/types";
import { TinaQueryClientPageProps } from "@/tina/utils";
import { useTina } from "tinacms/dist/react";

export default function ClientOrdinacijaStorjePage(props: TinaQueryClientPageProps<LocationQuery>) {
  const { data } = useTina(props);

  return (
    <div className="p-4 sm:p-8">
      <LocationComponent {...data} />
    </div>
  );
}
