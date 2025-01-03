"use client";

import { components } from "@/components/mdx-components";
import { AboutQuery } from "@/tina/__generated__/types";
import { TinaQueryClientPageProps } from "@/tina/utils";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function ClientAboutUsPage(props: TinaQueryClientPageProps<AboutQuery>) {
  const { data } = useTina(props);
  const about = data.about;
  return (
    <div
      className="prose"
      data-tina-field={tinaField(about, "body")}
    >
      <TinaMarkdown
        components={components}
        content={about.body}
      ></TinaMarkdown>
    </div>
  );
}
