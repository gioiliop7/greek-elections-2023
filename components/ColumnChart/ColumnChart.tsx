import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getPartyName, getPartyColor } from "@/utils/parties";
import { formatPercentage } from "@/utils/formatters";
import { ElectionData, FullData } from "@/utils/types";

interface PartyType {
  PARTY_ID: number;
  Edres: number;
  Perc: number;
  VOTES: number;
}

type ElectionPageProps = {
  data: ElectionData;
  countries: Boolean;
};

function ColumnChart({ data, countries }: ElectionPageProps) {
  const full = data.full as FullData;
  const text = countries ? "Ψήφοι" : "%";
  const parties = full.party;
  let chartData;
  if (!countries) {
    chartData = parties
      .filter((party: PartyType) => party.Perc > 2.5)
      .map((party: PartyType) => ({
        name: getPartyName(party.PARTY_ID),
        data: [formatPercentage(party.Perc) as any],
        color: getPartyColor(party.PARTY_ID),
      }));
  } else {
    chartData = parties.map((party: PartyType) => ({
      name: getPartyName(party.PARTY_ID),
      data: [party.VOTES],
      color: getPartyColor(party.PARTY_ID)
        ? getPartyColor(party.PARTY_ID)
        : "#000",
    }));
  }

  const [series, setSeries] = useState(chartData);

  const [options, setOptions] = useState<any>({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "90%",
        endingShape: "rounded",
        borderRadius: 8,
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
        text: text,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => {
          if (countries) {
            return `${val} Ψήφοι`;
          } else {
            return `${val}%`;
          }
        },
      },
    },
  });

  return (
    <>
      {!countries && (
        <>
          <p className="text-center mb-6">
            Το διάγραμμα παρακάτω απεικονίζει τα κόμματα με ποσοστό μεγαλύτερο
            του 2.5
          </p>
        </>
      )}
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={550}
        />
      </div>
    </>
  );
}

export default ColumnChart;
