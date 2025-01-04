import client from "@/tina/__generated__/client";
import ServicesSmall from "../components/services/services-small";
import Image from "next/image";

export default async function Home() {
  const services = await client.queries.servicesConnection();
  const imageSrc = (await client.queries.global({ relativePath: "global.json" })).data.global.landingImage;

  if (!services) {
    return null;
  }

  return (
    <div className="-mt-nav mx-auto">
      {imageSrc && (
        <Image
          className="mx-auto"
          src={imageSrc}
          alt=""
          width={2048}
          height={1365}
        />
      )}
      <ServicesSmall {...services}></ServicesSmall>
    </div>
  );
}
