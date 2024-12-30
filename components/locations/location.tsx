import { MapPin, Phone, Clock, Mail } from "lucide-react";

interface LocationProps {
  name: string;
  address: string;
  phone: string;
  hours: string;
  email: string;
  mapUrl: string;
}

const Location: React.FC<LocationProps> = ({ name, address, phone, hours, email, mapUrl }) => (
  <div className="w-full max-w-md rounded-lg border bg-white shadow-sm p-6">
    <div className="mb-6">
      <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
    </div>
    <div className="mb-6 aspect-video w-full rounded-lg overflow-hidden">
      <iframe
        src={mapUrl}
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
        <p className="text-gray-600">{address}</p>
      </div>
      <div className="flex items-center">
        <Phone className="mr-2 h-5 w-5 text-gray-500 flex-shrink-0" />
        <p className="text-gray-600">{phone}</p>
      </div>
      <div className="flex items-center">
        <Mail className="mr-2 h-5 w-5 text-gray-500 flex-shrink-0" />
        <p className="text-gray-600">{email}</p>
      </div>
      <div className="flex items-start">
        <Clock className="mr-2 h-5 w-5 text-gray-500 flex-shrink-0" />
        <p className="text-gray-600 whitespace-pre-line">{hours}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 pt-4">
        <a
          href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
          className="btn btn-primary flex-1"
        >
          <Phone className="h-4 w-4 mr-2" />
          Pokličite nas
        </a>
        <a
          href={`mailto:${email}`}
          className="btn btn-secondary flex-1"
        >
          <Mail className="h-4 w-4 mr-2" />
          Pišite nam
        </a>
      </div>
    </div>
  </div>
);

export default Location;
