"use client";

import Image from "next/image";
import {
  GlobalQuery,
  ServiceCategoryConnectionQuery,
  ServiceCategoryConnectionQueryVariables,
} from "@/tina/__generated__/types";
import {
  TinaConnectionClientPageProps,
  TinaQueryClientPageProps,
} from "@/tina/utils";
import CategoriesSmall from "@/components/services/categories-small";
import { tinaField, useTina } from "tinacms/dist/react";
import EmblaCarousel from "@/components/EmblaCarousel";
import Link from "next/link";

export default function ClientHomePage({
  categoriesConnectionQuery,
  globalQuery,
}: {
  categoriesConnectionQuery: TinaConnectionClientPageProps<
    ServiceCategoryConnectionQuery,
    ServiceCategoryConnectionQueryVariables
  >;
  globalQuery: TinaQueryClientPageProps<GlobalQuery>;
}) {
  const { global } = useTina(globalQuery).data;

  const carouselSlides = [
    {
      src: global.landingImage,
      alt: "",
      tinaField: tinaField(global, "landingImage"),
    },
    {
      src: global.landingImage,
      alt: "",
      tinaField: tinaField(global, "landingImage"),
    },
    {
      src: global.landingImage,
      alt: "",
      tinaField: tinaField(global, "landingImage"),
    },
  ];

  return (
    <div className="mx-auto flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Text */}
          <div className="order-2 lg:order-1 space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Specialistična
              <span className="block text-primary">Zobozdravstvena</span>
              <span className="block">Ordinacija</span>
            </h1>
            <p
              className="text-lg lg:text-xl text-secondary leading-relaxed"
              id="hero-subtext"
              data-tina-field={tinaField(global, "heroSubtext")}
            >
              {global.heroSubtext}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kontaktiraj-nas"
                className="btn btn-primary btn-lg px-8 py-3 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Kontaktiraj Nas
              </Link>
              <Link
                href="#our-services"
                className="btn btn-outline btn-lg px-8 py-3 font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Naše Storitve
              </Link>
            </div>
          </div>

          {/* Carousel */}
          <div className="order-1 lg:order-2">
            <EmblaCarousel slides={carouselSlides}></EmblaCarousel>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-12">
        <h2
          id="our-services"
          data-tina-field={tinaField(global, "ourServicesText")}
          className="text-center text-4xl font-semibold mb-12"
        >
          {global.ourServicesText}
        </h2>
        <CategoriesSmall {...categoriesConnectionQuery}></CategoriesSmall>
      </section>
    </div>
  );
}
