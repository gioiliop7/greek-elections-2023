import { Comfortaa } from "next/font/google";
import styles from "@/styles/Home.module.css";

import Header from "@/components/Header/Header";
import Summary from "@/components/Summary/Summary";
import BlueBar from "@/components/BlueBar/BlueBar";
import DataComponent from "@/components/DataComponent/DataComponent";

import { calculatePercentage } from "@/utils/helpers";
import { fetchData } from "@/utils/fetchdata";

import {
  Statistics,
  FullData,
  Party,
  ParliamentParty,
  ElectionData,
} from "@/utils/types";

import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

const inter = Comfortaa({ subsets: ["greek"] });

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
  const [initialData, setInitialData] = useState(data);
  const [ep, setEp] = useState(99999);

  const statistics = data.stats as Statistics;
  const [epName, setEpName] = useState(statistics.Descr);
  const full = data.full as FullData;
  const parties = full?.party as Party[];
  const parliamentParties: ParliamentParty[] = [];
  // console.log(statistics);
  //TODO ΕΚΛΟΓΙΚΑ ΤΜΗΜΑΤΑ ΟΤΑΝ ΒΓΕΙ Η ΠΛΑΤΦΟΡΜΑ ΓΙΑΤΙ ΔΕΝ ΚΑΤΑΛΑΒΑΙΝΩ ΤΙΣ ΜΕΤΑΒΛΗΤΕΣ.
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
      const data = await fetchData(ep);
      const stats = data.stats as Statistics;
      const name = stats.Descr;
      setEpName(name);
      setInitialData(data);
    };

    fetchDataAsync();
  }, [ep]);

  return (
    <>
      <Header />
      <main className={`${styles.main} ${inter.className}`}>
        <div className="flex flex-col lg:flex-row w-full">
          <div className="w-3/5 bg-endeavour-50 h-screen">
            <BlueBar
              ep={ep}
              setEp={setEp}
              setEpName={setEpName}
              name={epName}
              data={initialData} 
            />
            <div className="overflow-y-auto h-[75%] py-12">
              <DataComponent data={initialData} />
            </div>
          </div>
          <div className="w-2/5 bg-endeavour-100 h-screen">
            <Summary generalData={generalData} parties={parliamentParties} />
          </div>
        </div>
      </main>
    </>
  );
}
