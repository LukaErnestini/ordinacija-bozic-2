import client from "@/tina/__generated__/client";
import CategoriesSmall from "../components/services/categories-small";
import Image from "next/image";

export default async function Home() {
  // const services = await client.queries.servicesConnection();
  const categories = await client.queries.serviceCategoryConnection();
  const imageSrc = (await client.queries.global({ relativePath: "global.json" })).data.global.landingImage;

  return (
    <div className="-mt-nav mx-auto flex flex-col gap-12">
      {imageSrc && (
        <Image
          className="mx-auto"
          src={imageSrc}
          alt=""
          width={2048}
          height={1365}
        />
      )}
      <h2 className="text-center text-4xl font-semibold capitalize mb-8">Naše storitve</h2>
      <CategoriesSmall {...categories}></CategoriesSmall>
    </div>
  );
}
