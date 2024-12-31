import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

interface LocationProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  address: any;
  phone: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  officeHours: any;
  mail: string;
  googleMapsEmbedSrc: string;
}

export function LocationComponent({ label, address, phone, officeHours, mail, googleMapsEmbedSrc }: LocationProps) {
  return (
    <>
      <div className="w-full max-w-md rounded-lg border bg-white shadow-sm p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{label}</h3>
        </div>
        <div className="mb-6 aspect-video w-full rounded-lg overflow-hidden">
          <iframe
            src={googleMapsEmbedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-start">
            <MapPin className="mr-2 h-5 w-5 text-gray-500 flex-shrink-0" />
            <TinaMarkdown content={address} />
          </div>
          <div className="flex">
            <Phone className="mr-2 h-5 w-5 text-gray-500 flex-shrink-0" />
            <div className="flex flex-col justify-center">
              {phone.map((number) => (
                <a
                  key={number}
                  href={`tel:${number}`}
                  className="text-gray-600"
                >
                  {number}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Mail className="mr-2 h-5 w-5 text-gray-500 flex-shrink-0" />
            <a
              href={`mailto:${mail}`}
              className="text-gray-600"
            >
              {mail}
            </a>
          </div>
          <div className="flex items-start">
            <Clock className="mr-2 h-5 w-5 text-gray-500 flex-shrink-0" />
            <TinaMarkdown content={officeHours} />
          </div>
        </div>
      </div>
    </>
  );
}
