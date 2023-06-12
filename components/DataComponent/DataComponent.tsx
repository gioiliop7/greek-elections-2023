import { ElectionData } from "@/utils/types";
import Table from "@/components/Table/Table";
import dynamic from "next/dynamic";

export default function DataComponent({
  data,
  countries,
}: {
  data: ElectionData;
  countries: Boolean;
}) {
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
      <div className="flex flex-col xl:flex-row w-full max-w-[90%] mx-auto">
        <div className="w-full lg:w-2/3 px-20 md:px-0">
          <ColumnChart data={data} countries={countries} />
        </div>
        <div className="w-full xl:w-1/3 flex flex-col items-center gap-4">
          <PieChart data={data} />
          <LineChart data={data} />
        </div>
      </div>
      {!countries && (
        <>
          <div className="py-8 max-w-[50%] md:max-w-full mx-auto">
            <Table data={data} />
          </div>
        </>
      )}
    </>
  );
}
