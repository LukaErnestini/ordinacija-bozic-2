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
    <div className="max-w-4xl mx-auto pb-4 sm:py-8 sm:px-6 lg:px-8">
      <div className="sm:bg-white sm:shadow-lg sm:rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              data-tina-field={tinaField(staff, "image")}
              src={image}
              alt={name}
              width={2000}
              height={2000}
              className="w-full md:w-48 md:h-full object-contain sm:object-cover"
            />
          </div>
          <div className="p-8">
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
              className="mt-4 prose"
            >
              <TinaMarkdown content={bio} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
