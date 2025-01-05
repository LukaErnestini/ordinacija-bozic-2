"use client";

import Image from "next/image";
import { ServiceCategoryConnectionQuery, ServiceCategoryConnectionQueryVariables } from "@/tina/__generated__/types";
import { tinaField, useTina } from "tinacms/dist/react";
import Link from "next/link";
import { TinaConnectionClientPageProps } from "@/tina/utils";

export default function CategoriesSmall(
  props: TinaConnectionClientPageProps<ServiceCategoryConnectionQuery, ServiceCategoryConnectionQueryVariables>
) {
  const { data } = useTina(props);

  return (
    <section className="pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.serviceCategoryConnection.edges?.map((categoryData) => {
            const category = categoryData!.node!;
            return (
              <Link
                href={category._sys.filename}
                key={category?.id}
                className="btn h-56 justify-start flex-nowrap group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
              >
                <Image
                  data-tina-field={tinaField(categoryData?.node, "icon")}
                  width={54}
                  height={54}
                  src={category.icon}
                  alt={category.title}
                  className="mb-2"
                />
                <h3
                  data-tina-field={tinaField(categoryData?.node, "title")}
                  className="text-xl font-semibold mb-3"
                >
                  {category.title}
                </h3>
                <p
                  data-tina-field={tinaField(categoryData?.node, "shortDescription")}
                  className="text-gray-600 text-sm line-clamp-3"
                >
                  {category.shortDescription}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
