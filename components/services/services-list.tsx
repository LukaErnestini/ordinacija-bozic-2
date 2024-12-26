import Image from "next/image";

type Service = {
  title: string;
  shortDescription: string;
  type: string;
  icon: string;
};

export default function ServicesList({ services }: { services: Service[] }) {
  // Group services by type
  const groupedServices = services.reduce((acc, service) => {
    const type = service.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {Object.entries(groupedServices).map(([type, services]) => (
        <div
          key={type}
          className="mb-16"
        >
          <h2 className="text-xl font-bold text-secondary-content mb-12 uppercase text-center">{type}</h2>
          <div className="space-y-12 flex flex-col items-center">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex gap-8 lg:gap-16 w-full max-w-3xl"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={service.icon}
                    alt=""
                    height={64}
                    width={64}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold  mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
