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

  const locationLabels = data.locationConnection.edges!.map((location) => {
    return location!.node!.label;
  });

  const fallbackContacts = data.locationConnection.edges!.map((edge) => ({
    label: edge!.node!.label,
    phones: (edge!.node!.phone ?? []).filter((p): p is string => Boolean(p)),
    email: edge!.node!.mail ?? "",
  }));

  return (
    <ContactForm
      locations={locationLabels}
      presetMessages={globalData.global.contactForm.presetMessages}
      headerTitle={globalData.global.contactForm.headerTitle}
      headerSubtitle={globalData.global.contactForm.headerSubtitle}
      fallbackContacts={fallbackContacts}
    />
  );
}
