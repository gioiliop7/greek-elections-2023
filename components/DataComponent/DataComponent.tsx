import { ElectionData } from "@/utils/types";
import Table from "@/components/Table/Table";
import dynamic from "next/dynamic";

export default function DataComponent({ data }: { data: ElectionData }) {
  const ColumnChart = dynamic(() => import("../ColumnChart/ColumnChart"), {
    ssr: false,
  });
  const PieChart = dynamic(() => import("../PieChart/PieChart"), {
    ssr: false,
  });
  const LineChart = dynamic(() => import("../LineChart/LineChart"), {
    ssr: false,
  });
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full max-w-[90%] mx-auto">
        <div className="w-2/3">
          <ColumnChart data={data} />
        </div>
        <div className="w-1/3">
          <PieChart data={data} />
          <LineChart data={data} />
        </div>
      </div>

      <div className="py-8">
        <Table data={data} />
      </div>
    </>
  );
}
