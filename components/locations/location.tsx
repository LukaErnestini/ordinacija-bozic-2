"use client";

import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import ScrollGallery from "../scroll-gallery";
import { tinaField } from "tinacms/dist/react";
import { LocationQuery } from "@/tina/__generated__/types";

export function LocationComponent(data: LocationQuery) {
  const location = data.location;
  const { images, label, addressStructured, phone, officeHours, mail, googleMapsEmbedSrc } = location;
  return (
    <div>
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {images && (
            <div
              className="relative rounded-xl overflow-hidden"
              data-tina-field={tinaField(location, "images")}
            >
              <ScrollGallery
                interval={5000}
                className="w-full h-full"
                images={images.filter((i): i is string => !!i)}
              />
            </div>
          )}

          <div className="space-y-8">
            <h2
              className="text-3xl font-bold"
              data-tina-field={tinaField(location, "label")}
            >
              {label}
            </h2>

            {/* Contact Information */}
            <div className="grid gap-6 xs:grid-cols-2 items-start">
              <div
                className="flex gap-3"
                data-tina-field={tinaField(location, "addressStructured")}
              >
                <MapPin className="w-5 h-5 mt-1 text-primary" />
                <div>
                  {addressStructured && (
                    <>
                      <div>{addressStructured.street}</div>
                      <div>{addressStructured.postalCode} {addressStructured.city}</div>
                    </>
                  )}
                </div>
              </div>

              <div
                className="flex gap-3"
                data-tina-field={tinaField(location, "phone")}
              >
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  {phone.map((number) => (
                    <a
                      key={number}
                      href={`tel:${number}`}
                      className="block hover:text-primary transition-colors"
                    >
                      {number}
                    </a>
                  ))}
                </div>
              </div>

              <div
                className="flex gap-3"
                data-tina-field={tinaField(location, "mail")}
              >
                <Mail className="w-5 h-5 text-primary" />
                <a
                  href={`mailto:${mail}`}
                  className="hover:text-primary transition-colors break-all"
                >
                  {mail}
                </a>
              </div>

              <div
                className="flex gap-3"
                data-tina-field={tinaField(location, "officeHours")}
              >
                <Clock className="w-5 h-5 mt-1 text-primary" />
                <TinaMarkdown content={officeHours} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="h-[400px] rounded-xl overflow-hidden"
          data-tina-field={tinaField(location, "googleMapsEmbedSrc")}
        >
          <iframe
            src={googleMapsEmbedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
