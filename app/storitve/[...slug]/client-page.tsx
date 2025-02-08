"use client";

import { ServicesQuery } from "@/tina/__generated__/types";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";
import { generalMdxComponents } from "@/components/mdx-components";

interface StoritevClientPageProps {
  data: ServicesQuery;
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function StoritevClientPage(props: StoritevClientPageProps) {
  const { data } = useTina({ ...props });
  const service = data.services;

  // const faqs = service.faq?.map((faq) => (
  //   <li
  //     key={faq?.question}
  //     className="collapse collapse-arrow bg-white/50 backdrop-blur-sm rounded-xl shadow-lg mb-4"
  //   >
  //     <input
  //       type="checkbox"
  //       name="my-accordion-2"
  //     />
  //     <div className="collapse-title text-xl font-medium">{faq?.question}</div>
  //     <div className="collapse-content prose">
  //       <p>{faq?.answer}</p>
  //     </div>
  //   </li>
  // ));

  return (
    <>
      <section>
        <header className="relative mb-32">
          {service.heroImage && (
            <div className="relative h-[50vh] overflow-hidden">
              <Image
                data-tina-field={tinaField(service, "heroImage")}
                className="object-cover"
                src={service.heroImage}
                alt=""
                fill
                priority
              />
            </div>
          )}

          <div className="container mx-auto px-4 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
                <h1
                  data-tina-field={tinaField(service, "title")}
                  className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 text-center"
                >
                  {service.title}
                </h1>
                {service.subtitle && (
                  <p
                    data-tina-field={tinaField(service, "subtitle")}
                    className="text-xl md:text-2xl text-foreground/80 text-center max-w-2xl mx-auto"
                  >
                    {service.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div
            data-tina-field={tinaField(service, "body")}
            className="prose prose-lg max-w-4xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
          >
            <TinaMarkdown
              content={service.body}
              components={generalMdxComponents()}
            ></TinaMarkdown>
          </div>
          {/* commented out FAQ, not used */}
          {/* {faqs && (
            <div
              data-tina-field={tinaField(service, "faq")}
              className="max-w-4xl mx-auto mt-16"
            >
              <h2 className="text-3xl font-serif font-bold mb-8 text-center">FAQ</h2>
              <ul className="space-y-4">{faqs}</ul>
            </div>
          )} */}
        </div>
      </section>
    </>
  );
}
