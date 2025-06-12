"use client";

import {
  GlobalQuery,
  ServiceCategoryConnectionQuery,
  ServiceCategoryConnectionQueryVariables
} from "@/tina/__generated__/types";
import { TinaConnectionClientPageProps, TinaQueryClientPageProps } from "@/tina/utils";
import CategoriesSmall from "@/components/services/categories-small";
import { tinaField, useTina } from "tinacms/dist/react";
import EmblaCarousel from "@/components/EmblaCarousel";
import Link from "next/link";

export default function ClientHomePage({
  categoriesConnectionQuery,
  globalQuery
}: {
  categoriesConnectionQuery: TinaConnectionClientPageProps<
    ServiceCategoryConnectionQuery,
    ServiceCategoryConnectionQueryVariables
  >;
  globalQuery: TinaQueryClientPageProps<GlobalQuery>;
}) {
  const { global } = useTina(globalQuery).data;

  const carouselSlides =
    global.heroImages?.map((i) => ({
      src: i as string,
      alt: "",
      tinaField: tinaField(global, "heroImages")
    })) ?? [];

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

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-br from-base-100 via-base-100 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-3xl lg:text-5xl font-serif font-bold text-gray-800 mb-4"
              data-tina-field={tinaField(global.homePage, "whyChooseUsTitle")}
            >
              {global.homePage?.whyChooseUsTitle}
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-tina-field={tinaField(global.homePage, "whyChooseUsSubtitle")}
            >
              {global.homePage?.whyChooseUsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full transform hover:-translate-y-2">
                <div className="w-20 h-20 mb-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-serif font-bold text-gray-800 mb-4"
                  data-tina-field={tinaField(global.homePage, "experienceTitle")}
                >
                  {global.homePage?.experienceTitle}
                </h3>
                <p
                  className="text-gray-600 leading-relaxed"
                  data-tina-field={tinaField(global.homePage, "experienceDescription")}
                >
                  {global.homePage?.experienceDescription}
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full transform hover:-translate-y-2">
                <div className="w-20 h-20 mb-6 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-serif font-bold text-gray-800 mb-4"
                  data-tina-field={tinaField(global.homePage, "modernEquipmentTitle")}
                >
                  {global.homePage?.modernEquipmentTitle}
                </h3>
                <p
                  className="text-gray-600 leading-relaxed"
                  data-tina-field={tinaField(global.homePage, "modernEquipmentDescription")}
                >
                  {global.homePage?.modernEquipmentDescription}
                </p>
              </div>
            </div>

            <div className="group md:col-span-2 lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full transform hover:-translate-y-2">
                <div className="w-20 h-20 mb-6 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-2xl font-serif font-bold text-gray-800 mb-4"
                  data-tina-field={tinaField(global.homePage, "personalCareTitle")}
                >
                  {global.homePage?.personalCareTitle}
                </h3>
                <p
                  className="text-gray-600 leading-relaxed"
                  data-tina-field={tinaField(global.homePage, "personalCareDescription")}
                >
                  {global.homePage?.personalCareDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary to-primary/95 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div
                className="text-4xl lg:text-5xl font-bold font-serif mb-2 text-white"
                data-tina-field={tinaField(global.homePage, "yearsExperienceStat")}
              >
                {global.homePage?.yearsExperienceStat}
              </div>
              <div
                className="text-primary-100 font-medium"
                data-tina-field={tinaField(global.homePage, "yearsExperienceLabel")}
              >
                {global.homePage?.yearsExperienceLabel}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div
                className="text-4xl lg:text-5xl font-bold font-serif mb-2 text-white"
                data-tina-field={tinaField(global.homePage, "locationsStat")}
              >
                {global.homePage?.locationsStat}
              </div>
              <div
                className="text-primary-100 font-medium"
                data-tina-field={tinaField(global.homePage, "locationsLabel")}
              >
                {global.homePage?.locationsLabel}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div
                className="text-4xl lg:text-5xl font-bold font-serif mb-2 text-white"
                data-tina-field={tinaField(global.homePage, "satisfactionStat")}
              >
                {global.homePage?.satisfactionStat}
              </div>
              <div
                className="text-primary-100 font-medium"
                data-tina-field={tinaField(global.homePage, "satisfactionLabel")}
              >
                {global.homePage?.satisfactionLabel}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <div
                className="text-4xl lg:text-5xl font-bold font-serif mb-2 text-white"
                data-tina-field={tinaField(global.homePage, "emergencyHelpStat")}
              >
                {global.homePage?.emergencyHelpStat}
              </div>
              <div
                className="text-primary-100 font-medium"
                data-tina-field={tinaField(global.homePage, "emergencyHelpLabel")}
              >
                {global.homePage?.emergencyHelpLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-16">
        <h2
          id="our-services"
          data-tina-field={tinaField(global, "ourServicesText")}
          className="text-center text-3xl lg:text-4xl font-serif font-bold text-gray-800 mb-4"
        >
          {global.ourServicesText}
        </h2>
        <p
          className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
          data-tina-field={tinaField(global.homePage, "servicesSubtitle")}
        >
          {global.homePage?.servicesSubtitle}
        </p>
        <CategoriesSmall {...categoriesConnectionQuery}></CategoriesSmall>
      </section>

      {/* Team Preview */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-serif font-bold text-gray-800 mb-4"
              data-tina-field={tinaField(global.homePage, "teamTitle")}
            >
              {global.homePage?.teamTitle}
            </h2>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              data-tina-field={tinaField(global.homePage, "teamSubtitle")}
            >
              {global.homePage?.teamSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <Image
                  src="/images/joskobozic.jpg"
                  alt="Dr. Joško Božić"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-1">Dr. Joško Božić</h3>
              <p className="text-primary font-medium mb-2">Specialist ortodontije</p>
              <p className="text-gray-600 text-sm">
                Vodja ordinacije z več kot 30 leti izkušenj na področju ortodontije
              </p>
            </div>

            <div className="text-center group">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-1">Dr. Helena Božić</h3>
              <p className="text-primary font-medium mb-2">Specialist protetike</p>
              <p className="text-gray-600 text-sm">Strokovnjakinja za protetične rešitve in estetsko zobozdravstvo</p>
            </div>

            <div className="text-center group">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-1">Dr. Jan Božić</h3>
              <p className="text-primary font-medium mb-2">Zobozdravnik</p>
              <p className="text-gray-600 text-sm">Mladi strokovnjak z najnovejšim znanjem in pristopom</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/predstavitev"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium"
            >
              <span data-tina-field={tinaField(global.homePage, "teamLinkText")}>{global.homePage?.teamLinkText}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Locations Quick Access */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-serif font-bold text-gray-800 mb-4"
              data-tina-field={tinaField(global.homePage, "locationsTitle")}
            >
              {global.homePage?.locationsTitle}
            </h2>
            <p
              className="text-lg text-gray-600"
              data-tina-field={tinaField(global.homePage, "locationsSubtitle")}
            >
              {global.homePage?.locationsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-800">Štorje</h3>
              </div>
              <p
                className="text-gray-600 mb-4"
                data-tina-field={tinaField(global.homePage, "storjeDescription")}
              >
                {global.homePage?.storjeDescription}
              </p>
              <Link
                href="/ordinacija-storje"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                <span data-tina-field={tinaField(global.homePage, "moreInfoText")}>
                  {global.homePage?.moreInfoText}
                </span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-800">Portorož</h3>
              </div>
              <p
                className="text-gray-600 mb-4"
                data-tina-field={tinaField(global.homePage, "portorozDescription")}
              >
                {global.homePage?.portorozDescription}
              </p>
              <Link
                href="/ordinacija-portoroz"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium"
              >
                <span data-tina-field={tinaField(global.homePage, "moreInfoText")}>
                  {global.homePage?.moreInfoText}
                </span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4"
            data-tina-field={tinaField(global.homePage, "ctaTitle")}
          >
            {global.homePage?.ctaTitle}
          </h2>
          <p
            className="text-xl text-primary-content/90 mb-8 max-w-2xl mx-auto"
            data-tina-field={tinaField(global.homePage, "ctaSubtitle")}
          >
            {global.homePage?.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontaktiraj-nas"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl hover:bg-gray-50 transition-colors font-medium text-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span data-tina-field={tinaField(global.homePage, "contactButtonText")}>
                {global.homePage?.contactButtonText}
              </span>
            </Link>
            <a
              href={`tel:${global.homePage?.callButtonPhone}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white hover:text-primary transition-colors font-medium text-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span data-tina-field={tinaField(global.homePage, "callButtonText")}>
                {global.homePage?.callButtonText}
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
