"use client";

import {
  ServiceCategoryQuery,
  ServicesConnectionQuery,
  ServicesConnectionQueryVariables
} from "@/tina/__generated__/types";
import Image from "next/image";
import { TinaConnectionClientPageProps, TinaQueryClientPageProps } from "@/tina/utils";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { generalMdxComponents } from "@/components/mdx-components";

export default function ClientCategoryPage({
  serviceCategoryQuery,
  servicesConnection
}: {
  serviceCategoryQuery: TinaQueryClientPageProps<ServiceCategoryQuery>;
  servicesConnection: TinaConnectionClientPageProps<ServicesConnectionQuery, ServicesConnectionQueryVariables>;
}) {
  const { data: serviceCategoryData } = useTina(serviceCategoryQuery);
  const { serviceCategory } = serviceCategoryData;
  const { data: servicesData } = useTina(servicesConnection);
  const services = servicesData.servicesConnection.edges?.map((service) => service?.node);

  return (
    <div>
      {/* <pre>{JSON.stringify(servicesConnection.data.servicesConnection, null, 2)}</pre> */}
      {/* Hero Section with stronger gradient and shadow effects */}
      <div className="relative bg-gradient-to-b from-secondary/30 via-background to-background">
        <div className="absolute inset-0 bg-primary/5 backdrop-blur-[2px]" />

        <div className="container relative mx-auto px-4 py-16 sm:py-20 md:py-24">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Enhanced icon with multiple layers of effects */}
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl transform scale-150" />
              <div className="absolute inset-0 bg-secondary/10 rounded-full blur-xl transform scale-125" />

              {/* Icon container with hover effect */}
              <div className="relative transform transition-transform duration-500 hover:scale-110">
                <Image
                  data-tina-field={tinaField(serviceCategory, "icon")}
                  src={serviceCategory.icon}
                  alt=""
                  width={120}
                  height={120}
                  className="relative z-10 drop-shadow-2xl transition-all duration-300 group-hover:drop-shadow-[0_0_2em_rgba(176,144,84,0.3)]"
                />
              </div>
            </div>

            {/* Enhanced title with stronger gradient and animation */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-8 relative">
              <span
                className="relative inline-block"
                data-tina-field={tinaField(serviceCategory, "title")}
              >
                {serviceCategory.title}
                {/* Animated underline */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/80 to-transparent transform scale-x-50 hover:scale-x-100 transition-transform duration-500" />
              </span>
            </h1>

            {/* Description with enhanced styling */}
            <p
              className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto leading-relaxed"
              data-tina-field={tinaField(serviceCategory, "shortDescription")}
            >
              {serviceCategory.shortDescription}
            </p>
          </div>
        </div>

        {/* Enhanced wave divider with gradient */}
        <div className="relative h-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDMyMCI+PHBhdGggZmlsbD0iI2ZiZmJmZSIgZmlsbC1vcGFjaXR5PSIxIiBkPSJNMCwyMjRMNjAsMjEzLjNDMTIwLDIwMywyNDAsMTgxLDM2MCwxODEuM0M0ODAsMTgxLDYwMCwyMDMsNzIwLDIyNEM4NDAsMjQ1LDk2MCwyNjcsMTA4MCwyNjEuM0MxMjAwLDI1NiwxMzIwLDIyNCwxMzgwLDIwOEwxNDQwLDE5MkwxNDQwLDMyMEwxMzgwLDMyMEMxMzIwLDMyMCwxMjAwLDMyMCwxMDgwLDMyMEM5NjAsMzIwLDg0MCwzMjAsNzIwLDMyMEM2MDAsMzIwLDQ4MCwzMjAsMzYwLDMyMEMyNDAsMzIwLDEyMCwzMjAsNjAsMzIwTDAsMzIwWiI+PC9wYXRoPjwvc3ZnPg==')] bg-cover bg-bottom opacity-90" />
        </div>
      </div>
      {/* Content Section with enhanced container */}
      <div className="mx-auto px-4 py-3 md:py-12">
        <div
          data-tina-field={tinaField(serviceCategory, "body")}
          className="prose prose-lg max-w-4xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl p-4 sm:p-8 shadow-xl"
        >
          <TinaMarkdown content={serviceCategory.body} />
        </div>
      </div>
      {/* Table of Contents */}
      <div className="mx-auto px-4 py-3 md:py-12">
        {/* Desktop */}
        <div className="mx-auto max-w-7xl hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((service) => {
            if (!service) return null;
            const { _sys, title, subtitle, icon } = service;
            return (
              <a
                href={`#${_sys.filename}`}
                key={_sys.filename}
                className="btn h-56 justify-start flex-nowrap group p-4 gap-1 lg:gap-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
              >
                <Image
                  width={54}
                  height={54}
                  src={icon}
                  alt={title}
                  className="mb-2"
                />
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{subtitle}</p>
              </a>
            );
          })}
        </div>

        {/* Mobile */}
        <div className="max-w-4xl mx-auto md:hidden">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-3 md:mb-12">
            <h2 className="text-3xl font-serif font-bold mb-6">Kazalo</h2>
            <nav className="space-y-4">
              {services?.map((service) => {
                if (!service) return null;
                const { _sys, title } = service;
                return (
                  <a
                    key={_sys.filename}
                    href={`#${_sys.filename}`}
                    className="block text-lg px-6 py-2 rounded-lg hover:bg-primary/5 hover:text-primary transition-all duration-200 relative group"
                  >
                    <span className="relative flex items-center">
                      {title}
                      <svg
                        className="w-5 h-5 ml-auto text-primary/40 group-hover:text-primary transition-colors duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      {/* Services */}
      <div className="mx-auto px-4 pb-24 pt-3 md:pt-12">
        <div className="max-w-4xl mx-auto space-y-24">
          {services?.map((service) => {
            if (!service) return null;
            const { body, icon, subtitle, title, _sys } = service;
            return (
              <article
                key={_sys.filename}
                id={_sys.filename}
                className="sm:bg-white/50 sm:backdrop-blur-sm sm:rounded-2xl sm:p-8 sm:shadow-xl"
              >
                <div className="flex items-start gap-6">
                  {icon && (
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl transform scale-150" />
                      <Image
                        src={icon}
                        alt=""
                        width={80}
                        height={80}
                        className="relative drop-shadow-xl"
                      />
                    </div>
                  )}
                  <div>
                    <h2
                      className="text-3xl font-serif font-bold mb-2"
                      data-tina-field={tinaField(service, "title")}
                    >
                      {title}
                    </h2>
                    {subtitle && (
                      <p
                        className="text-xl text-foreground/70 mb-4"
                        data-tina-field={tinaField(service, "subtitle")}
                      >
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {body && (
                  <div
                    className="prose prose-lg mt-8"
                    data-tina-field={tinaField(service, "body")}
                  >
                    <TinaMarkdown
                      content={body}
                      components={generalMdxComponents()}
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
