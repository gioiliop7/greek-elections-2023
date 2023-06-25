import { ParliamentParty, GeneralData } from "@/utils/types";
import { formatPercentage, formatNumber } from "@/utils/formatters";
import { getPartyLogo } from "@/utils/parties";
import Image from "next/image";
import Copyright from "../Copyright/Copyright";

import parliament from "../../assets/images/parliament.svg";

export default function Summary({
  parties,
  generalData,
}: {
  parties: ParliamentParty[];
  generalData: GeneralData;
}) {
  let othersPercent = 100;
  const partyElements = parties.map((party) => {
    othersPercent = othersPercent - party.percent;
    return (
      <div
        className="w-[60%] sm:w-2/6 sm:px-4 sm:py-3 h-[200px] lg:h-[200px] flex justify-center flex-col text-center rounded-xl bg-white"
        key={party.id}
      >
        <p className="text-endeavour-950 text-2xl font-medium">{party.edres}</p>
        <p className="text-endeavour-950 font-medium">
          {formatPercentage(party.percent)} - {party.votes}
        </p>
        <Image
          className="w-[200px] lg:w-full max-w-[50%] mx-auto p-3"
          src={getPartyLogo(party.id)}
          alt={`${party.id}`}
        />
      </div>
    );
  });
  return (
    <>
      <hr className="mb-2 border-endeavour-700" />
      <div className="px-5 py-2">
        <h2 className="text-2xl font-bold text-endeavour-700 text-center">
          {generalData.epikrateiaName}
        </h2>
        <div className="flex flex-wrap mt-4">
          <p className="w-full md:w-1/2 text-endeavour-700 text-center mb-3">
            Εγγεγραμμένοι: {formatNumber(generalData.grammenoi)}
          </p>
          <p className="w-full md:w-1/2 text-endeavour-700 text-center">
            Συμμετοχή: {formatNumber(generalData.participation)}{" "}
            {`(${generalData.percentageOfPartipation}%)`}
          </p>
          <p className="w-full md:w-1/3 text-endeavour-700 text-center">
            Έγκυρα: {formatNumber(generalData.egkyra)}{" "}
            {`(${generalData.percentageOfEgkyra}%)`}
          </p>
          <p className="w-full md:w-1/3 text-endeavour-700 text-center">
            Λευκά: {formatNumber(generalData.leyka)}{" "}
            {`(${generalData.percentageOfLeyka}%)`}
          </p>
          <p className="w-full md:w-1/3 text-endeavour-700 text-center">
            Άκυρα: {formatNumber(generalData.akyra)}{" "}
            {`(${generalData.percentageOfAkyra}%)`}
          </p>
        </div>
      </div>
      <hr className="mb-8 border-endeavour-700" />
      <div className="container mx-auto md:px-8 py-10 md:py-0">
        <Image
          className="w-full mx-auto max-w-[15%] mb-6"
          src={parliament}
          alt="parliament"
        />
        <div className="flex gap-5 justify-center flex-wrap px-10 sm:px-0">
          {partyElements}
          <div className="w-[60%] sm:w-2/6 px-4 py-3  h-[200px] lg:h-[200px] flex justify-center flex-col text-center  rounded-xl bg-white">
            <p className="text-endeavour-950 text-2xl font-medium">0</p>
            <p className="text-endeavour-950 font-medium">
              {formatPercentage(othersPercent)}
            </p>
            <p className="text-endeavour-950 text-2xl font-medium">Λοιπά</p>
          </div>
        </div>
        <Copyright />
      </div>
    </>
  );
}
