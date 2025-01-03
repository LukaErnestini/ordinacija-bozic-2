"use client";

import { createStaffMdxComponents, StaffPrefetchedData } from "@/components/mdx-components";
import { AboutQuery } from "@/tina/__generated__/types";
import { TinaQueryClientPageProps } from "@/tina/utils";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function ClientAboutUsPage(
  props: TinaQueryClientPageProps<AboutQuery> & { staffData: StaffPrefetchedData }
) {
  const { data } = useTina(props);
  const about = data.about;

  const mdxComponents = createStaffMdxComponents(props.staffData);

  return (
    <div
      className="prose"
      data-tina-field={tinaField(about, "body")}
    >
      <TinaMarkdown
        components={mdxComponents}
        content={about.body}
      />
    </div>
  );
}
