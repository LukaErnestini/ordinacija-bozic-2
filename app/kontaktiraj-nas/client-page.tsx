"use client";

import { LocationConnectionQuery, LocationConnectionQueryVariables } from "@/tina/__generated__/types";
import { TinaConnectionClientPageProps } from "@/tina/utils";
import { useTina } from "tinacms/dist/react";
import ContactForm from "./contact-form";

interface ContactUsClientPageProps {
  locations: TinaConnectionClientPageProps<LocationConnectionQuery, LocationConnectionQueryVariables>;
}

export default function ContactUsClientPage(props: ContactUsClientPageProps) {
  const { data } = useTina({ ...props.locations });
  const locations = data.locationConnection.edges!.map((location) => {
    return location!.node!.label;
  });

  return <ContactForm locations={locations} />;
}
