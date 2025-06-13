import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

interface Location {
  officeHours: TinaMarkdownContent | null;
  phone: string[];
  googleMapsEmbedSrc: string;
  name: string;
  email: string;
}

interface FooterProps {
  locations: Location[];
}

export default function Footer({ locations }: FooterProps) {
  return (
    <footer className="bg-neutral-800 text-white pb-12 pt-16">
      <div className="max-w-7xl mx-auto">
        <div className="container mx-auto px-6">
          {locations.map((location, locationIndex) => (
            <div
              key={locationIndex}
              className="pb-12 mb-8"
            >
              <div className="divider divider-primary uppercase text-lg font-semibold">{location.name}</div>
              <div className="flex flex-wrap lg:flex-nowrap gap-10 lg:gap-12">
                {/* Office Hours & Contact Section */}
                <div className="flex flex-wrap xs:flex-nowrap flex-row justify-around grow gap-6 lg:gap-8">
                  <div className="min-h-min grow sm:grow-0 basis-1/2">
                    <h2 className="text-2xl font-bold mb-6 text-primary">Kdaj smo tu za vas</h2>
                    <div className="space-y-3">
                      {location.officeHours && <TinaMarkdown content={location.officeHours} />}
                    </div>
                  </div>

                  {/* Contact Us Section */}
                  <div className="min-h-min grow sm:grow-0 basis-1/2">
                    <h2 className="text-2xl font-bold mb-6 text-primary">Stopite v stik</h2>
                    <div className="space-y-3 flex flex-col">
                      {location.phone.map((phone, index) => (
                        <a
                          href={`tel:${phone}`}
                          key={index}
                          className="hover:text-primary transition-colors text-lg"
                        >
                          {phone}
                        </a>
                      ))}
                      <a
                        className="break-all hover:text-primary transition-colors text-lg"
                        href={`mailto:${location.email}`}
                      >
                        {location.email}
                      </a>
                    </div>
                  </div>
                </div>
                {/* Google Maps Section */}
                <div className="grow lg:max-w-md xl:max-w-lg h-64 lg:h-80">
                  <iframe
                    src={location.googleMapsEmbedSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    className="rounded-2xl shadow-lg"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="container mx-auto mt-12 pt-8 border-t border-neutral-700 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
            <p className="text-base">© {new Date().getFullYear()} Ordinacija Božič. Vse pravice pridržane.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className="hover:text-white transition-colors text-base"
              >
                Zasnova in razvoj: 43SOFT
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
