import { StaffQuery } from "@/tina/__generated__/types";
import Link from "next/link";
import { Components, TinaMarkdownContent } from "tinacms/dist/rich-text";
import Image from "next/image";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export interface StaffPrefetchedData {
  [key: string]: StaffQuery["staff"];
}

export const createStaffMdxComponents = (
  staffData: StaffPrefetchedData
): Components<{
  EmployeeLink: { staff: string };
}> => ({
  EmployeeLink(props) {
    // EXAMPLE OF props: { "staff": "content/staff/jan-bozic.mdx" }
    const relativePath = props.staff.split("/").slice(-1)[0].split(".")[0];
    const staff = staffData[relativePath];

    if (!staff) return null;

    return (
      <div>
        <Link
          className="uppercase"
          href={`predstavitev/${staff._sys.filename}`}
        >
          {staff.name}
        </Link>
        <span className="ml-2">{staff.title}</span>
      </div>
    );
  }
});

export const generalMdxComponents = (): Components<{
  FeatureGrid: {
    props?: string;
    item1Title: string;
    item1Image: string;
    item1Body: TinaMarkdownContent;
    item2Title: string;
    item2Image: string;
    item2Body: TinaMarkdownContent;
    item3Title: string;
    item3Image: string;
    item3Body: TinaMarkdownContent;
    item4Title: string;
    item4Image: string;
    item4Body: TinaMarkdownContent;
  };
}> => ({
  FeatureGrid(props) {
    const items = [
      { title: props.item1Title, image: props.item1Image, body: props.item1Body },
      { title: props.item2Title, image: props.item2Image, body: props.item2Body },
      { title: props.item3Title, image: props.item3Image, body: props.item3Body },
      { title: props.item4Title, image: props.item4Image, body: props.item4Body }
    ];

    return (
      <div className="p-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-start space-x-4"
            >
              {item.image && (
                <div className="relative w-8 h-8 lg:w-16 lg:h-16 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex flex-col space-y-2">
                <h3 className="text-2xl font-serif font-bold text-primary">{item.title}</h3>
                <div className="prose prose-invert max-w-sm">
                  <TinaMarkdown content={item.body} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
});
