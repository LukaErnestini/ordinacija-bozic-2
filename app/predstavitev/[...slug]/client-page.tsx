"use client";

import { StaffQuery } from "@/tina/__generated__/types";
import { TinaQueryClientPageProps } from "@/tina/utils";
import Image from "next/image";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function ClientPredstavitevPage(props: TinaQueryClientPageProps<StaffQuery>) {
  const { data } = useTina(props);
  const { staff } = data;
  const { name, title, bio, image } = staff;

  return (
    <div className="-mt-nav sm:mt-0 max-w-7xl mx-auto pb-4 sm:py-8 sm:px-6 lg:px-8">
      <div className="sm:bg-white sm:shadow-lg sm:rounded-lg overflow-hidden">
        <div className="md:flex md:items-start md:gap-8">
          <div className="md:flex-shrink-0 relative h-[600px] w-full md:w-72">
            <Image
              data-tina-field={tinaField(staff, "image")}
              src={image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 18rem"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="p-8 flex-1">
            <div
              data-tina-field={tinaField(staff, "title")}
              className="uppercase tracking-wide text-sm text-primary font-semibold"
            >
              {title}
            </div>
            <h1
              data-tina-field={tinaField(staff, "name")}
              className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
            >
              {name}
            </h1>
            <div
              data-tina-field={tinaField(staff, "bio")}
              className="mt-6 prose prose-lg max-w-none"
            >
              <TinaMarkdown content={bio} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
