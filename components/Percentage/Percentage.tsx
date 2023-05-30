import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ElectionData, FullData, Statistics } from "@/utils/types";
import { calculatePercentage } from "@/utils/helpers";


type ElectionPageProps = {
  data: ElectionData;
};

function Percentage({ data }: ElectionPageProps) {
  const full = data.full as FullData;
  const stats = data.stats as Statistics;
  const countTm = stats.CountTm;
  const NumTm = full.NumTm;
  const percentage = calculatePercentage(countTm,NumTm)
  const [series ] = useState([percentage]);

  const [options] = useState<any>({
    chart: {
      height: 50,
      type: 'radialBar',
      offsetY: 0,
    },
    plotOptions: {
      radialBar: {
        startAngle: -100,
        endAngle:100,
        dataLabels: {
          name: {
            fontSize: '14px',
            color: undefined,
            offsetY:60,
          },
          value: {
            offsetY: 20,
            fontSize: '15px',
            color: undefined,
            formatter: function (val: number) {
              return val + '%';
            },
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: ['Ενσωμάτωση'],
  });

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="radialBar" height={100} />
    </div>
  );
};

export default Percentage;
