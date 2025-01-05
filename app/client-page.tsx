"use client";

import Image from "next/image";
import {
  GlobalQuery,
  ServiceCategoryConnectionQuery,
  ServiceCategoryConnectionQueryVariables
} from "@/tina/__generated__/types";
import { TinaConnectionClientPageProps, TinaQueryClientPageProps } from "@/tina/utils";
import CategoriesSmall from "@/components/services/categories-small";
import { tinaField, useTina } from "tinacms/dist/react";

export default function ClientHomePage({
  categoriesConnectionQuery: categoriesConnectionQuery,
  globalQuery
}: {
  categoriesConnectionQuery: TinaConnectionClientPageProps<
    ServiceCategoryConnectionQuery,
    ServiceCategoryConnectionQueryVariables
  >;
  globalQuery: TinaQueryClientPageProps<GlobalQuery>;
}) {
  const { global } = useTina(globalQuery).data;
  return (
    <div className="-mt-nav mx-auto flex flex-col gap-12 ">
      <div className="relative h-[100vh]">
        <Image
          data-tina-field={tinaField(global, "landingImage")}
          className="mx-auto object-cover"
          src={global.landingImage}
          alt=""
          sizes="100vw"
          fill
        />
      </div>
      <h2
        data-tina-field={tinaField(global, "ourServicesText")}
        className="text-center text-4xl font-semibold capitalize mb-8"
      >
        {global.ourServicesText}
      </h2>
      <CategoriesSmall {...categoriesConnectionQuery}></CategoriesSmall>
    </div>
  );
}
