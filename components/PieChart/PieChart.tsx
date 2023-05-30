import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ElectionData, FullData } from "@/utils/types";

type ElectionPageProps = {
  data: ElectionData;
};

function PieChart({ data }: ElectionPageProps) {
  const full = data.full as FullData;
    const akyra = full?.Akyra;
    const egkyra = full?.Egkyra;
    const leyka = full?.Leyka;
    const grammenoi = full?.Gramenoi;
    const participation = akyra + egkyra + leyka;
    const nope = grammenoi - participation;

  const [series] = useState<number[]>([participation, nope]);
  const [options] = useState<any>({
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Συμμετοχή','Αποχή'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  });

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="pie" width={380} />
    </div>
  );
};


export default PieChart;
