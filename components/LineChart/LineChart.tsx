import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ElectionData, FullData } from "@/utils/types";
import { calculatePercentage } from "@/utils/helpers";

type ElectionPageProps = {
  data: ElectionData;
};

function PieChart({ data }: ElectionPageProps) {
  const full = data.full as FullData;
  const akyra = full?.Akyra;
  const egkyra = full?.Egkyra;
  const leyka = full?.Leyka;
  const grammenoi = full?.Gramenoi;
  const participation = egkyra + leyka + akyra;
  const percentageOfPartipation = calculatePercentage(participation, grammenoi);
  const percentageOfAkyra = calculatePercentage(akyra, participation);
  const percentageOfLeyka = calculatePercentage(leyka, participation);
  const percentageOfEgkyra = calculatePercentage(egkyra, participation);

  const [series, setSeries] = useState([
    percentageOfAkyra,
    percentageOfLeyka,
    percentageOfEgkyra,
  ]);

  const [options, setOptions] = useState<any>({
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Συμμετοχή",
            formatter: function () {
              // By default, this function returns the average of all series. The below is just an example to show the use of a custom formatter function
              return participation;
            },
            color: "#373d3f",
          },
        },
      },
    },
    labels: ["Άκυρα", "Λευκά", "Έγκυρα"],
    colors: ["#002b24", "#077368", "#62beb6"], // Add colors here
  });
  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={350}
      />
    </div>
  );
}

export default PieChart;
