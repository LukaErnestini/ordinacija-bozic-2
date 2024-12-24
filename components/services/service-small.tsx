import { ServicesConnectionEdges, ServicesConnectionQuery } from "@/tina/__generated__/types";
import Image from "next/image";

interface Service {
  title: string;
  shortDescription: string;
  link: string;
  icon: string;
}

interface ServiceSmallProps {
  service: Service;
}

export default function ServiceSmall(service: ServicesConnectionEdges) {
  const { title, shortDescription, link, icon } = service;

  return (
    <div className="flex flex-col items-center text-center max-w-[300px]">
      <Image
        src={icon}
        alt={title}
        className="w-16 h-16 mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-3 text-sm">{shortDescription}</p>
      <a
        href={link}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        Read more
      </a>
    </div>
  );
}
