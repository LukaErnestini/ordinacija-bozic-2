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
    <div>
      {/* Hero Section */}
      <div className={`relative ${about.showImageUnderNavbar ? "-mt-nav-mobile" : ""}`}>
        <div className="h-[50vh] min-h-[400px] lg:h-[60vh] xl:h-[70vh] 2xl:h-[80vh] relative">
          {about.image && (
            <Image
              data-tina-field={tinaField(about, "image")}
              className="object-cover object-top"
              src={about.image}
              alt=""
              fill
              priority
              sizes="100vw"
            />
          )}
        </div>

        {/* Title overlay */}
        <div className="container mx-auto px-4 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
              <h1
                data-tina-field={tinaField(about, "title")}
                className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 text-center"
              >
                {about.title}
              </h1>
              {about.subtitle && (
                <p
                  data-tina-field={tinaField(about, "subtitle")}
                  className="text-xl md:text-2xl text-foreground/80 text-center max-w-2xl mx-auto"
                >
                  {about.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="relative h-24"></div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-2 sm:px-4 py-12">
        <div
          className="prose prose-lg max-w-4xl mx-auto sm:bg-white/50 backdrop-blur-sm sm:rounded-2xl sm:p-8 sm:shadow-xl"
          data-tina-field={tinaField(about, "body")}
        >
          <TinaMarkdown
            components={mdxComponents}
            content={about.body}
          />
        </div>
      </div>
    </div>
  );
}
