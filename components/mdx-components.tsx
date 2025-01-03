import { StaffQuery } from "@/tina/__generated__/types";
import Link from "next/link";
import { Components } from "tinacms/dist/rich-text";

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
