"use client";

import { ServicesQuery } from "@/tina/__generated__/types";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";

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

  const faqs = service.faq?.map((faq) => (
    <li
      key={faq?.question}
      className="collapse collapse-arrow bg-base-200"
    >
      <input
        type="checkbox"
        name="my-accordion-2"
      />
      <div className="collapse-title text-xl font-medium">{faq?.question}</div>
      <div className="collapse-content">
        <p>{faq?.answer}</p>
      </div>
    </li>
  ));

  return (
    <>
      <section>
        <header>
          <Image
            data-tina-field={tinaField(service, "heroImage")}
            className=""
            src={service.heroImage}
            alt=""
            height={1369}
            width={2560}
          ></Image>
          <h1 data-tina-field={tinaField(service, "title")}>{service.title}</h1>
          <p data-tina-field={tinaField(service, "title")}>{service.subtitle}</p>
        </header>
        <div
          data-tina-field={tinaField(service, "body")}
          className="prose"
        >
          <TinaMarkdown content={service.body}></TinaMarkdown>
        </div>
        {faqs && (
          <div
            data-tina-field={tinaField(service, "faq")}
            className="flex"
          >
            <h2>FAQ</h2>
            <ul>{faqs}</ul>
          </div>
        )}
      </section>
      {/* <pre>{JSON.stringify(service, null, 2)}</pre>abvc */}
    </>
  );
}
