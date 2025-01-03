"use client";

import { createStaffMdxComponents, StaffPrefetchedData } from "@/components/mdx-components";
import { AboutQuery } from "@/tina/__generated__/types";
import { TinaQueryClientPageProps } from "@/tina/utils";
import Image from "next/image";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function ClientAboutUsPage(
  props: TinaQueryClientPageProps<AboutQuery> & { staffData: StaffPrefetchedData }
) {
  const { data } = useTina(props);
  const about = data.about;

  const mdxComponents = createStaffMdxComponents(props.staffData);

  return (
    <>
      {about.image && (
        <Image
          data-tina-field={tinaField(about, "image")}
          className="sm:-mt-nav max-w-7xl mx-auto w-full"
          src={about.image}
          alt=""
          width={2000}
          height={2000}
        ></Image>
      )}
      <div
        className="mx-auto p-4 sm:p-8 prose prose-a:text-blue-700"
        data-tina-field={tinaField(about, "body")}
      >
        <TinaMarkdown
          components={mdxComponents}
          content={about.body}
        />
      </div>
    </>
  );
}
