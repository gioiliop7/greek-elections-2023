import Header from "@/components/Header/Header";
import Summary from "@/components/Summary/Summary";
import BlueBar from "@/components/BlueBar/BlueBar";
import DataComponent from "@/components/DataComponent/DataComponent";

import { calculatePercentage } from "@/utils/helpers";
import { fetchCountries, fetchData } from "@/utils/fetchdata";

import {
  Statistics,
  FullData,
  Party,
  ParliamentParty,
  ElectionData,
} from "@/utils/types";

import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import VideoPlayer from "@/components/Video/Video";

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchData();
  return {
    props: { data },
  };
};

type ElectionPageProps = {
  data: ElectionData;
};

export default function Home({ data }: ElectionPageProps) {
  const statistics = data.stats as Statistics;
  const full = data.full as FullData;
  const parties = full?.party as Party[];
  const parliamentParties: ParliamentParty[] = [];

  const [initialData, setInitialData] = useState(data);
  const [ep, setEp] = useState(99999);
  const [epName, setEpName] = useState(statistics.Descr);
  const [countries, setCountries] = useState(false);
  const [countryID, setCountryID] = useState(0);

  const eklogikaTmhmataCounter = statistics?.CountTm;
  const edresEpikrateias = statistics?.Edres;
  const akyra = full?.Akyra;
  const egkyra = full?.Egkyra;
  const leyka = full?.Leyka;
  const grammenoi = full?.Gramenoi;
  const participation = egkyra + leyka + akyra;
  const epikrateiaName = statistics?.Descr;
  const percentageOfPartipation = calculatePercentage(participation, grammenoi);
  const percentageOfAkyra = calculatePercentage(akyra, participation);
  const percentageOfLeyka = calculatePercentage(leyka, participation);
  const percentageOfEgkyra = calculatePercentage(egkyra, participation);
  const generalData = {
    epikrateiaName,
    percentageOfPartipation,
    percentageOfAkyra,
    percentageOfLeyka,
    percentageOfEgkyra,
    akyra,
    leyka,
    egkyra,
    grammenoi,
    participation,
  };
  parties.forEach(
    (element: {
      Edres: number;
      EdresEpik: number;
      PARTY_ID: number;
      Perc: number;
      Rank: number;
      VOTES: number;
    }) => {
      const edres = element.Edres;
      const edresEpik = element.EdresEpik;
      const edresCounter = edres + edresEpik;
      const id = element.PARTY_ID;
      const percent = element.Perc;
      const rank = element.Rank;
      const votes = element.VOTES;
      if (edresCounter > 0)
        parliamentParties.push({
          id: id,
          percent: percent,
          rank: rank,
          edres: edresCounter,
          votes: votes,
        });
    }
  );
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        let data;
        if (ep !== 57) {
          data = await fetchData(ep);
        } else {
          data = await fetchCountries(countryID);
        }

        const stats = data.stats as Statistics;
        if (stats) {
          const name = stats.Descr;
          setEpName(name);
          setInitialData(data);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchDataAsync();
  }, [ep, countryID]);

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row w-full relative">
        <div className="w-full lg:w-3/5 bg-endeavour-50 lg:h-[160vh]">
          <BlueBar
            ep={ep}
            setEp={setEp}
            setEpName={setEpName}
            countries={countries}
            setCountries={setCountries}
            setCountryID={setCountryID}
            countryID={countryID}
            name={epName}
            data={initialData}
          />
        <VideoPlayer src={"https://www.ert.gr/webtv/ert/tv/live-glm/ert-news.html"} />
          <div className="overflow-y-auto h-[75%] py-12">
            <DataComponent data={initialData} countries={countries} />
          </div>
        </div>
        <div className="w-full lg:w-2/5 bg-endeavour-100 lg:min-h-screen py-0 sm:py-5">
          <Summary generalData={generalData} parties={parliamentParties} />
        </div>
      </div>
    </>
  );
}
