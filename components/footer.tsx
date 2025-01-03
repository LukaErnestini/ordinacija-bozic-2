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
    <footer className="bg-neutral-800 text-white pb-16 pt-8">
      <div className="max-w-7xl mx-auto">
        <div className="container mx-auto px-6">
          {locations.map((location, locationIndex) => (
            <div
              key={locationIndex}
              className="pb-6"
            >
              <div className="divider divider-primary uppercase">{location.name}</div>
              <div className="flex flex-wrap gap-8">
                {/* Office Hours Section */}
                <div className="flex flex-wrap flex-row justify-around grow gap-4">
                  <div className="min-h-min grow xs:grow-0">
                    <h2 className="text-2xl font-bold mb-4">Urnik</h2>
                    <div className="space-y-2">
                      {location.officeHours && <TinaMarkdown content={location.officeHours} />}
                    </div>
                  </div>

                  {/* Contact Us Section */}
                  <div className="min-h-min grow xs:grow-0">
                    <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
                    <div className="space-y-2 flex flex-col">
                      {location.phone.map((phone, index) => (
                        <a
                          href={`tel:${phone}`}
                          key={index}
                        >
                          {phone}
                        </a>
                      ))}
                      <a href={`mailto:${location.email}`}>{location.email}</a>
                    </div>
                  </div>
                </div>
                {/* Google Maps Section */}
                <div className="grow">
                  <iframe
                    src={location.googleMapsEmbedSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
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
        <div className="container mx-auto mt-8 pt-8 border-t border-neutral-700 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400">
            <p>© {new Date().getFullYear()} LOREM IPSUM. ALL RIGHT RESERVED</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="/accessibility"
                className="hover:text-white"
              >
                ACCESSIBILITY STATEMENT
              </a>
              <span>|</span>
              <a
                href="#"
                className="hover:text-white"
              >
                SITE DESIGN: 43SOFT
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
