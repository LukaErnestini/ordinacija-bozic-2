import client from "@/tina/__generated__/client";
import Link from "next/link";
import { Components } from "tinacms/dist/rich-text";

export const components: Components<{
  EmployeeLink: { staff: string };
}> = {
  async EmployeeLink(props) {
    const { data } = await client.queries.staff({ relativePath: props.staff.split("/").slice(-1)[0] });
    // return <pre>{JSON.stringify(staff, null, 2)}</pre>;
    return (
      <>
        <Link
          className="uppercase"
          href={`predstavitev/${data.staff._sys.filename}`}
        >
          {data.staff.name}
        </Link>
        <span className="ml-2">{data.staff.title}</span>
      </>
    );
  }
};
