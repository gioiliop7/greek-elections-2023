import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getPartyName, getPartyColor } from "@/utils/parties";
import { formatPercentage } from "@/utils/formatters";
import { ElectionData, FullData } from "@/utils/types";

interface PartyType {
  PARTY_ID: number;
  Edres: number;
  Perc: number;
  // Add more properties as needed
}

type ElectionPageProps = {
  data: ElectionData;
};

function ColumnChart({ data }: ElectionPageProps) {
  const full = data.full as FullData;
  const parties = full.party;

  const chartData = parties
    .filter((party: PartyType) => party.Edres > 0)
    .map((party: PartyType) => ({
      name: getPartyName(party.PARTY_ID),
      data: [formatPercentage(party.Perc)],
      color: getPartyColor(party.PARTY_ID),
    }));

  const [series, setSeries] = useState(chartData);

  const [options, setOptions] = useState<any>({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "80%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Κόμμα"],
    },
    yaxis: {
      title: {
        text: "%",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={550}
      />
    </div>
  );
}

export default ColumnChart;
