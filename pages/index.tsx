import { Comfortaa } from "next/font/google";
import styles from "@/styles/Home.module.css";

import Header from "@/components/Header";
import Summary from "@/components/Summary/Summary";
import { Statistics, FullData, Party, ParliamentParty } from "@/utils/types";

import { calculatePercentage } from "@/utils/helpers";

import { GetServerSideProps } from "next";

const dev = process.env.NODE_ENV !== "production";
const server = dev ? "http://localhost:3000" : process.env.EKLOGES_PUBLIC_URL;

const inter = Comfortaa({ subsets: ["greek"] });

type ElectionStats = object;
type ElectionFull = object;
type ElectionNet = object;

type ElectionData = {
  stats: ElectionStats | null;
  full: ElectionFull | null;
  deputies: ElectionNet | null;
};

const fetchData = async (): Promise<ElectionData> => {
  const statsOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "stats" }),
  };
  const fullOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "full" }),
  };
  const statsRes = await fetch(`${server}/api/epikrateia`, statsOptions);
  const fullRes = await fetch(`${server}/api/epikrateia`, fullOptions);
  const deputiesRes = await fetch(`${server}/api/deputies`);

  const stats = statsRes.ok ? await statsRes.json() : null;
  const full = fullRes.ok ? await fullRes.json() : null;
  const deputies = deputiesRes.ok ? await deputiesRes.json() : null;
  return { deputies, stats, full };
};

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
  console.log(statistics);
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

  return (
    <>
      <Header />
      <main className={`${styles.main} ${inter.className}`}>
        <div className="flex flex-col lg:flex-row w-full">
          <div className="w-3/5 bg-endeavour-50 h-screen">1</div>
          <div className="w-2/5 bg-endeavour-100 h-screen">
            <Summary generalData={generalData} parties={parliamentParties} />
          </div>
        </div>
      </main>
    </>
  );
}
