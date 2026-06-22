"use client";
import {
  GlobalQuery,
  LocationConnectionQuery,
  LocationConnectionQueryVariables,
  ServiceCategoryConnectionQuery,
  ServiceCategoryConnectionQueryVariables,
  StaffConnectionQuery,
  StaffConnectionQueryVariables
} from "@/tina/__generated__/types";
import { TinaConnectionClientPageProps, TinaQueryClientPageProps } from "@/tina/utils";
import CategoriesSmall from "@/components/services/categories-small";
import TeamPreview from "@/components/team-preview";
import { tinaField, useTina } from "tinacms/dist/react";
import EmblaCarousel from "@/components/EmblaCarousel";
import Link from "next/link";

export default function ClientHomePage({
  categoriesConnectionQuery,
  globalQuery,
  staffConnectionQuery,
  locationsConnectionQuery
}: {
  categoriesConnectionQuery: TinaConnectionClientPageProps<
    ServiceCategoryConnectionQuery,
    ServiceCategoryConnectionQueryVariables
  >;
  globalQuery: TinaQueryClientPageProps<GlobalQuery>;
  staffConnectionQuery: TinaConnectionClientPageProps<StaffConnectionQuery, StaffConnectionQueryVariables>;
  locationsConnectionQuery: TinaConnectionClientPageProps<LocationConnectionQuery, LocationConnectionQueryVariables>;
}) {
  const { global } = useTina(globalQuery).data;
  const { staffConnection } = useTina(staffConnectionQuery).data;
  const { locationConnection } = useTina(locationsConnectionQuery).data;

  // Build a lookup so we can pair each location with its homepage description / route.
  const locations = (locationConnection.edges ?? [])
    .map((edge) => edge?.node)
    .filter((n): n is NonNullable<typeof n> => Boolean(n));

  const storjeLocation = locations.find((l) => l?.label?.toLowerCase().includes("štorje"));
  const portorozLocation = locations.find((l) => l?.label?.toLowerCase().includes("portorož"));

  const locationCards = [
    {
      slug: "ordinacija-storje",
      label: "Štorje",
      data: storjeLocation,
      description: global.homePage?.storjeDescription,
      fallbackImage: "/a.jpg",
      theme: {
        canvas: "from-emerald-50/50 via-emerald-50/20 to-base-100",
        glowA: "bg-emerald-200/30",
        glowB: "bg-primary/10",
        wash: "rgba(16, 122, 85, 0.03)",
        pinIcon: "text-emerald-700",
        badgeBorder: "border-emerald-400/30",
        eyebrow: "text-emerald-700/85",
        accentLine: "bg-emerald-700",
        chip: "bg-emerald-100 text-emerald-800",
        ctaText: "text-emerald-700",
        hoverBorder: "hover:border-emerald-400/40",
      },
    },
    {
      slug: "ordinacija-portoroz",
      label: "Portorož",
      data: portorozLocation,
      description: global.homePage?.portorozDescription,
      fallbackImage: "/558D0AEA-870E-42C1-AFE3-72A175C74CAC.jpg",
      theme: {
        canvas: "from-sky-100/35 via-sky-50/20 to-base-100",
        glowA: "bg-sky-300/20",
        glowB: "bg-primary/10",
        wash: "rgba(14, 116, 144, 0.05)",
        pinIcon: "text-sky-700",
        badgeBorder: "border-sky-400/30",
        eyebrow: "text-sky-700/85",
        accentLine: "bg-sky-700",
        chip: "bg-sky-100 text-sky-800",
        ctaText: "text-sky-700",
        hoverBorder: "hover:border-sky-400/40",
      },
    },
  ];

  const carouselSlides =
    global.heroImages?.map((i, index) => ({
      src: i as string,
      alt: `${global.pageTitle ?? "Ordinacija Božič"} – fotografija ${index + 1}`,
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
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/kontaktiraj-nas"
                className="btn btn-primary btn-lg text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Kontaktiraj Nas
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
              <Link
                href="#our-services"
                className="btn btn-outline btn-primary btn-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
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

      {/* Quick Stats */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        {/* Decorative blurred circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Years of trust */}
            <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 lg:p-8 text-center transform hover:scale-[1.03] hover:bg-white/15 hover:border-white/40 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div
                className="text-4xl lg:text-5xl font-bold font-serif text-white leading-none"
                data-tina-field={tinaField(global.homePage, "yearsExperienceStat")}
              >
                {global.homePage?.yearsExperienceStat}
              </div>
              <div className="w-10 h-0.5 bg-white/40 mx-auto my-3" />
              <div
                className="text-white/85 text-sm lg:text-base font-medium"
                data-tina-field={tinaField(global.homePage, "yearsExperienceLabel")}
              >
                {global.homePage?.yearsExperienceLabel}
              </div>
            </div>

            {/* Locations */}
            <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 lg:p-8 text-center transform hover:scale-[1.03] hover:bg-white/15 hover:border-white/40 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div
                className="text-4xl lg:text-5xl font-bold font-serif text-white leading-none"
                data-tina-field={tinaField(global.homePage, "locationsStat")}
              >
                {global.homePage?.locationsStat}
              </div>
              <div className="w-10 h-0.5 bg-white/40 mx-auto my-3" />
              <div
                className="text-white/85 text-sm lg:text-base font-medium"
                data-tina-field={tinaField(global.homePage, "locationsLabel")}
              >
                {global.homePage?.locationsLabel}
              </div>
            </div>

            {/* Specialty fields */}
            <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 lg:p-8 text-center transform hover:scale-[1.03] hover:bg-white/15 hover:border-white/40 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div
                className="text-4xl lg:text-5xl font-bold font-serif text-white leading-none"
                data-tina-field={tinaField(global.homePage, "satisfactionStat")}
              >
                {global.homePage?.satisfactionStat}
              </div>
              <div className="w-10 h-0.5 bg-white/40 mx-auto my-3" />
              <div
                className="text-white/85 text-sm lg:text-base font-medium"
                data-tina-field={tinaField(global.homePage, "satisfactionLabel")}
              >
                {global.homePage?.satisfactionLabel}
              </div>
            </div>

            {/* Doctors */}
            <div className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 lg:p-8 text-center transform hover:scale-[1.03] hover:bg-white/15 hover:border-white/40 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div
                className="text-4xl lg:text-5xl font-bold font-serif text-white leading-none"
                data-tina-field={tinaField(global.homePage, "emergencyHelpStat")}
              >
                {global.homePage?.emergencyHelpStat}
              </div>
              <div className="w-10 h-0.5 bg-white/40 mx-auto my-3" />
              <div
                className="text-white/85 text-sm lg:text-base font-medium"
                data-tina-field={tinaField(global.homePage, "emergencyHelpLabel")}
              >
                {global.homePage?.emergencyHelpLabel}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-14 bg-gradient-to-br from-base-100 via-base-100 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2
              className="text-2xl lg:text-3xl font-serif font-bold text-gray-800 mb-2"
              data-tina-field={tinaField(global.homePage, "whyChooseUsTitle")}
            >
              {global.homePage?.whyChooseUsTitle}
            </h2>
            <p
              className="text-base text-gray-600 max-w-2xl mx-auto"
              data-tina-field={tinaField(global.homePage, "whyChooseUsSubtitle")}
            >
              {global.homePage?.whyChooseUsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="group">
              <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 h-full transform hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-lg font-serif font-bold text-gray-800"
                    data-tina-field={tinaField(global.homePage, "experienceTitle")}
                  >
                    {global.homePage?.experienceTitle}
                  </h3>
                </div>
                <p
                  className="text-sm text-gray-600 leading-relaxed"
                  data-tina-field={tinaField(global.homePage, "experienceDescription")}
                >
                  {global.homePage?.experienceDescription}
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 h-full transform hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-lg font-serif font-bold text-gray-800"
                    data-tina-field={tinaField(global.homePage, "modernEquipmentTitle")}
                  >
                    {global.homePage?.modernEquipmentTitle}
                  </h3>
                </div>
                <p
                  className="text-sm text-gray-600 leading-relaxed"
                  data-tina-field={tinaField(global.homePage, "modernEquipmentDescription")}
                >
                  {global.homePage?.modernEquipmentDescription}
                </p>
              </div>
            </div>

            <div className="group md:col-span-2 lg:col-span-1">
              <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 h-full transform hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-secondary"
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
                    className="text-lg font-serif font-bold text-gray-800"
                    data-tina-field={tinaField(global.homePage, "personalCareTitle")}
                  >
                    {global.homePage?.personalCareTitle}
                  </h3>
                </div>
                <p
                  className="text-sm text-gray-600 leading-relaxed"
                  data-tina-field={tinaField(global.homePage, "personalCareDescription")}
                >
                  {global.homePage?.personalCareDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <TeamPreview
        staffConnection={staffConnection}
        global={global}
      />

      {/* Locations Quick Access */}
      <section className="py-16 bg-gradient-to-b from-base-100 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-3xl lg:text-4xl font-serif font-bold text-gray-800 mb-3"
              data-tina-field={tinaField(global.homePage, "locationsTitle")}
            >
              {global.homePage?.locationsTitle}
            </h2>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              data-tina-field={tinaField(global.homePage, "locationsSubtitle")}
            >
              {global.homePage?.locationsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {locationCards.map((loc) => {
              const primaryPhone = loc.data?.phone?.find((p): p is string => Boolean(p)) ?? null;
              return (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  className={`group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 ${loc.theme.hoverBorder}`}
                >
                  {/* Designed "destination header" — light canvas tinted per location */}
                  <div className={`relative h-32 lg:h-36 overflow-hidden bg-gradient-to-br ${loc.theme.canvas}`}>
                    {/* Faded map watermark behind everything — visible at top, fades out toward the bottom */}
                    {loc.data?.googleMapsEmbedSrc && (
                      <iframe
                        src={loc.data.googleMapsEmbedSrc}
                        title=""
                        aria-hidden="true"
                        tabIndex={-1}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                        style={{
                          filter: "grayscale(100%) brightness(1.1) contrast(0.85)",
                          opacity: 0.36,
                          maskImage:
                            "linear-gradient(to bottom, black 0%, black 10%, transparent 70%)",
                          WebkitMaskImage:
                            "linear-gradient(to bottom, black 0%, black 10%, transparent 70%)",
                        }}
                      />
                    )}
                    {/* Soft blurred glow on top of the map */}
                    <div className={`absolute -top-10 -right-10 w-36 h-36 ${loc.theme.glowA} rounded-full blur-3xl pointer-events-none`} />
                    <div className={`absolute -bottom-12 -left-8 w-32 h-32 ${loc.theme.glowB} rounded-full blur-3xl pointer-events-none`} />
                    {/* Brand wash so the map reads as decorative rather than functional */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ backgroundColor: loc.theme.wash }}
                    />

                    {/* Map-pin badge top-right */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all">
                      <svg className={`w-4 h-4 ${loc.theme.pinIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>

                    {/* Location name centerpiece — sits in a frosted badge so it pops above the gradient */}
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-4 lg:p-5">
                      <div className={`inline-flex flex-col bg-white/85 backdrop-blur-sm rounded-xl border ${loc.theme.badgeBorder} shadow-sm px-3.5 py-2.5`}>
                        <span className={`text-[10px] lg:text-xs uppercase tracking-[0.2em] ${loc.theme.eyebrow} font-semibold mb-0.5 leading-none`}>
                          Ordinacija
                        </span>
                        <h3 className="text-2xl lg:text-3xl font-serif font-bold text-gray-800 tracking-tight leading-none">
                          {loc.label}
                        </h3>
                        <div className={`w-8 h-0.5 ${loc.theme.accentLine} mt-2`} />
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <p
                      className="text-gray-700 text-sm mb-3 leading-relaxed"
                      data-tina-field={tinaField(
                        global.homePage,
                        loc.slug === "ordinacija-storje" ? "storjeDescription" : "portorozDescription"
                      )}
                    >
                      {loc.description}
                    </p>

                    {/* Phone chip */}
                    {primaryPhone && (
                      <div className="flex flex-wrap gap-1.5 mb-4 text-xs">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 ${loc.theme.chip} rounded-full font-medium`}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {primaryPhone}
                        </span>
                      </div>
                    )}

                    {/* CTA */}
                    <div className={`inline-flex items-center gap-2 ${loc.theme.ctaText} font-semibold text-sm group-hover:gap-3 transition-all duration-300`}>
                      <span data-tina-field={tinaField(global.homePage, "moreInfoText")}>
                        {global.homePage?.moreInfoText}
                      </span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
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
              className="btn btn-lg bg-white text-primary border-white hover:bg-gray-50 hover:border-gray-50 gap-2 shadow-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
            <Link
              href={`tel:${global.homePage?.callButtonPhone}`}
              className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-primary hover:border-white gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
