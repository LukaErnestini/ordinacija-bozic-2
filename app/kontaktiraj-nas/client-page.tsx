"use client";

import { GlobalQuery, LocationConnectionQuery, LocationConnectionQueryVariables } from "@/tina/__generated__/types";
import { TinaConnectionClientPageProps, TinaQueryClientPageProps } from "@/tina/utils";
import { useTina } from "tinacms/dist/react";
import ContactForm from "./contact-form";

interface ContactUsClientPageProps {
  locations: TinaConnectionClientPageProps<LocationConnectionQuery, LocationConnectionQueryVariables>;
  globalQuery: TinaQueryClientPageProps<GlobalQuery>;
}

export default function ContactUsClientPage(props: ContactUsClientPageProps) {
  const { data } = useTina({ ...props.locations });
  const { data: globalData } = useTina(props.globalQuery);

  const locations = data.locationConnection.edges!.map((location) => {
    return location!.node!.label;
  });

  return (
    <ContactForm
      locations={locations}
      presetMessages={globalData.global.contactForm.presetMessages}
      headerTitle={globalData.global.contactForm.headerTitle}
      headerSubtitle={globalData.global.contactForm.headerSubtitle}
    />
  );
}
