"use client";

import { LocationComponent } from "@/components/locations/location";
import { LocationConnectionQuery, LocationConnectionQueryVariables } from "@/tina/__generated__/types";
import { ListClientPageProps } from "@/tina/utils";
import { useTina } from "tinacms/dist/react";

export default function LokacijeClientPage(
  props: ListClientPageProps<LocationConnectionQuery, LocationConnectionQueryVariables>
) {
  const { data } = useTina({ ...props });

  return (
    <>
      {data.locationConnection.edges!.map((locationData) => {
        const location = locationData!.node!;
        return (
          <LocationComponent
            key={location?.id}
            {...location}
          ></LocationComponent>
        );
      })}
    </>
  );
}
