import { useState } from "react";
import { getPartyLogo } from "@/utils/parties";
import { getDistrictName } from "@/utils/ep";

import Image from "next/image";
import { ElectionData } from "@/utils/types";

interface Deputy {
  EP_ID: string;
  PARTY_ID: number;
  VOTES: number;
  Rank: number;
  seat: boolean;
  cand_TvDescr: string;
}

type ElectionPageProps = {
  data: ElectionData;
};

export default function Table({ data }: ElectionPageProps): JSX.Element | null {
  let deputies: Deputy[] = [];
  let Rank: boolean;
  let Votes: boolean;
  const debutiesVotes = data.deputiesVotes;
  const debutiesTrue = data.deputies;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  if (!debutiesTrue) {
    return null;
  }

  if (debutiesVotes) {
    const partiesFull: any = (data.full as any)?.party;
    const EP_ID: string = (debutiesVotes as any).EP_ID;
    const partiesVotes: any = (debutiesVotes as any).party;
    deputies = data.deputies as Deputy[]; // Add type assertion
    Rank = false;
    Votes = true;

    const arrayOfObjects: Deputy[] = [];

    for (let key in partiesVotes) {
      if (Array.isArray(partiesVotes[key])) {
        console.log(key);
        const party: string = key; // Store the current key in the `party` variable
        const currentArray = partiesVotes[key];
        currentArray.forEach((vote: any, index: number) => {
          const objectToRender: Deputy = {
            EP_ID: EP_ID,
            PARTY_ID: parseInt(party),
            VOTES: vote.VOTES,
            Rank: index + 1,
            seat: false,
            cand_TvDescr: "",
          };
          const partyInt: number = parseInt(party);
          const candidateID = vote.CAND_ID;
          const candRank = index + 1;
          objectToRender.Rank = candRank;
          objectToRender.seat = partiesFull.some(
            (element: any) =>
              candRank <= element.Edres && element.PARTY_ID === parseInt(party)
          );

          if (
            deputies[partyInt] &&
            deputies[partyInt][
              candidateID as keyof (typeof deputies)[typeof partyInt]
            ]
          ) {
            objectToRender.cand_TvDescr =
              (
                deputies[partyInt][
                  candidateID as keyof (typeof deputies)[typeof partyInt]
                ] as any
              ).Descr || "";
          }

          arrayOfObjects.push(objectToRender);
        });
      }
    }

    arrayOfObjects.sort((a, b) => b.VOTES - a.VOTES);

    deputies = arrayOfObjects;
  } else {
    Rank = true;
    Votes = false;
    if (data.deputies && Array.isArray(data.deputies)) {
      deputies = data.deputies;
    } else {
      return null; // or handle the null case according to your requirements
    }
  }

  const deputiesPerPage = 10;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  };

  const filteredDeputies = deputies.filter((deputy) =>
    deputy.cand_TvDescr.toLowerCase().includes(searchValue.toLowerCase())
  );

  const totalPages =
    filteredDeputies.length > 0
      ? Math.ceil(filteredDeputies.length / deputiesPerPage)
      : 0;

  const startDeputyIndex = (currentPage - 1) * deputiesPerPage;
  const endDeputyIndex = Math.min(
    startDeputyIndex + deputiesPerPage,
    filteredDeputies.length
  );
  const currentDeputies = filteredDeputies.slice(
    startDeputyIndex,
    endDeputyIndex
  );

  const showPagination =
    filteredDeputies.length > deputiesPerPage && totalPages > 1;

  return (
    <>
      <div className="w-full text-white h-100 flex justify-center">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-endeavour-100">
          <div className="flex items-center justify-end my-4 mx-2">
            <input
              type="text"
              placeholder="Αναζήτηση με όνομα"
              value={searchValue}
              onChange={handleSearchChange}
              className="px-2 py-1 rounded-md bg-gray-200 text-gray-800"
            />
          </div>
          <table className="w-full text-sm text-left text-gray-500">
            {/* Table headers */}
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50">
                  ΟΝΟΜΑΤΕΠΩΝΥΜΟ
                </th>
                <th scope="col" className="px-6 py-3">
                  ΕΚΛΟΓΙΚΗ ΠΕΡΙΦΕΡΕΙΑ
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50">
                  ΣΥΝΔΥΑΣΜΟΣ
                </th>
                {Rank && (
                  <>
                    <th scope="col" className="px-6 py-3">
                      ΘΕΣΗ
                    </th>
                  </>
                )}
                {Votes && (
                  <>
                    <th scope="col" className="px-6 py-3">
                      ΨΗΦΟΙ
                    </th>
                  </>
                )}
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {currentDeputies.map((deputy, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td
                    className={`${
                      deputy.seat ? "font-bold" : ""
                    } px-6 py-4 text-gray-900 whitespace-nowrap bg-gray-50`}
                  >
                    {deputy.cand_TvDescr}
                  </td>
                  <td className="px-6 py-4">
                    {getDistrictName(parseInt(deputy.EP_ID))}
                  </td>
                  <td className="px-6 py-4 bg-gray-50">
                    <Image
                      className="max-w-[40px] mx-auto"
                      src={getPartyLogo(deputy.PARTY_ID)}
                      alt={deputy.PARTY_ID.toString()}
                      width={40}
                      height={40}
                    />
                  </td>
                  {Rank && (
                    <>
                      <td className="px-6 py-4">{deputy.Rank}</td>
                    </>
                  )}
                  {Votes && (
                    <>
                      <td className="px-6 py-4">{deputy.VOTES}</td>
                    </>
                  )}
                </tr>
              ))}
              {currentDeputies.length == 0 && (
                <>
                  <td colSpan={5} className="px-6 py-4 h-[50px] text-center">
                    Δεν υπάρχει όνομα με αυτό τον όρο αναζήτησης
                  </td>
                </>
              )}
            </tbody>
          </table>
          {totalPages > 1 && (
            <>
              <p className="text-endeavour-800 absolute bottom-5 left-5">
                {currentPage} από {totalPages} σελίδες
              </p>
            </>
          )}

          {/* Pagination */}
          {showPagination && (
            <div className="flex justify-center mt-4">
              <div className="flex">
                {currentPage > 1 && (
                  <button
                    className="px-3 py-1 text-2xl text-endeavour-800"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    {"←"}
                  </button>
                )}
                {currentPage < totalPages &&
                  endDeputyIndex < filteredDeputies.length && (
                    <button
                      className="px-3 py-1 text-2xl text-endeavour-800"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      {"→"}
                    </button>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
