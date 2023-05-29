import { ElectionData } from "@/utils/types";
import Table from "@/components/Table/Table";

export default function BlueBar({ data }: { data: ElectionData }) {
  return (
    <>
      <Table data={data} />
    </>
  );
}
