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
      <div className="container mx-auto px-2 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {data?.serviceCategoryConnection.edges?.map((categoryData) => {
            const category = categoryData!.node!;
            return (
              <Link
                href={category._sys.filename}
                key={category?.id}
                className="group relative h-80 sm:h-96 lg:h-72 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary" />
                  <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-primary" />
                </div>

                {/* Content */}
                <div className="relative h-full p-4 sm:p-6 flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <div className="mb-4 relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors duration-300" />
                    <div className="relative bg-white rounded-full p-4 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                      <Image
                        data-tina-field={tinaField(categoryData?.node, "icon")}
                        width={48}
                        height={48}
                        src={category.icon}
                        alt={category.title}
                        className="relative z-10"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    data-tina-field={tinaField(categoryData?.node, "title")}
                    className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2"
                  >
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p
                    data-tina-field={tinaField(categoryData?.node, "shortDescription")}
                    className="text-gray-600 text-sm leading-relaxed line-clamp-4 sm:line-clamp-5 lg:line-clamp-4"
                  >
                    {category.shortDescription}
                  </p>

                  {/* Hover Arrow */}
                  <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-semibold">Več informacij</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
