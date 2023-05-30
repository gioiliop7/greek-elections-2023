import { ParliamentParty, GeneralData } from "@/utils/types";
import { formatPercentage } from "@/utils/formatters";
import { getPartyLogo } from "@/utils/parties";
import Image from "next/image";

import parliament from "../../assets/images/parliament.svg";

export default function Summary({
  parties,
  generalData,
}: {
  parties: ParliamentParty[];
  generalData: GeneralData;
}) {
  const partyElements = parties.map((party) => (
      <div
        className="md:w-2/6 px-4 py-3 text-center rounded-xl bg-white"
        key={party.id}
      >
        <p className="text-endeavour-950 text-2xl font-medium">{party.edres}</p>
        <p className="text-endeavour-950 font-medium">
          {formatPercentage(party.percent)} - {party.votes}
        </p>
        <Image
          className="w-full max-w-[50%] mx-auto p-3"
          src={getPartyLogo(party.id)}
          alt={`${party.id}`}
        />
      </div>
  ));
  return (
    <>
      {/* <h2 className="text-2xl text-endeavour-700 text-center p-5">
        Greek Elections 2023
      </h2> */}
      <hr className="mb-2 border-endeavour-700" />
      <div className="px-5 py-2">
        <h2 className="text-2xl font-bold text-endeavour-700 text-center">
          {generalData.epikrateiaName}
        </h2>
        <div className="flex flex-wrap mt-4">
          <p className="w-1/2 text-endeavour-700 text-center mb-3">
            Εγγεγραμμένοι:{generalData.grammenoi}
          </p>
          <p className="w-1/2 text-endeavour-700 text-center">
            Συμμετοχή:{generalData.participation}{" "}
            {`(${generalData.percentageOfPartipation}%)`}
          </p>
          <p className="w-1/3 text-endeavour-700 text-center">
            Έγκυρα:{generalData.egkyra} {`(${generalData.percentageOfEgkyra}%)`}
          </p>
          <p className="w-1/3 text-endeavour-700 text-center">
            Λευκά:{generalData.leyka} {`(${generalData.percentageOfLeyka}%)`}
          </p>
          <p className="w-1/3 text-endeavour-700 text-center">
            Άκυρα:{generalData.akyra} {`(${generalData.percentageOfAkyra}%)`}
          </p>
        </div>
      </div>
      <hr className="mb-8 border-endeavour-700"  />
      <div className="container mx-auto sm:px-4">
        <Image className="w-full mx-auto max-w-[15%] mb-6" src={parliament} alt="parliament" />
        <div className="flex gap-5 justify-center flex-wrap ">
          {partyElements}
        </div>
      </div>
    </>
  );
}
