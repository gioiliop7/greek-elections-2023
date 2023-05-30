import { useState } from "react";
import { getPartyLogo } from "@/utils/parties";
import { getDistrictName } from "@/utils/ep";

import Image from "next/image";

interface Deputy {
  EP_ID: string;
  PARTY_ID: number;
  VOTES: number;
  Rank: number;
  seat: boolean;
  cand_TvDescr: string;
}

interface TableProps {
  data: {
    deputiesVotes?: {
      EP_ID: string;
      party: {
        [key: string]: {
          CAND_ID: string;
          VOTES: number;
        }[];
      };
    };
    full: {
      party: {
        Edres: number;
        PARTY_ID: number;
      }[];
    };
    deputies: {
      [key: string]: {
        [key: string]: {
          Descr: string;
        };
      };
    };
  };
}

export default function Table({ data }: TableProps) {
  let deputies: Deputy[] = [];
  let Rank: boolean;
  let Votes: boolean;
  const debutiesVotes = data.deputiesVotes;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  if (debutiesVotes) {
    const partiesFull = data.full.party;
    const EP_ID = debutiesVotes.EP_ID;
    const partiesVotes = debutiesVotes.party;
    deputies = data.deputies;
    Rank = false;
    Votes = true;

    const arrayOfObjects: Deputy[] = [];

    for (let key in partiesVotes) {
      if (Array.isArray(partiesVotes[key])) {
        const party = key; // Store the current key in the `party` variable
        const currentArray = partiesVotes[key];
        currentArray.forEach((vote, index) => {
          const objectToRender: Deputy = {
            EP_ID: EP_ID,
            PARTY_ID: parseInt(party),
            VOTES: vote.VOTES,
            Rank: index + 1,
            seat: false,
            cand_TvDescr: "",
          };
          const candidateID = vote.CAND_ID;
          const candRank = index + 1;
          objectToRender.Rank = candRank;
          objectToRender.seat = partiesFull.some(
            (element) =>
              candRank <= element.Edres && element.PARTY_ID === parseInt(party)
          );

          // Retrieve the candidate name from deputies if the key matches the party
          if (deputies[party] && deputies[party][candidateID]) {
            objectToRender.cand_TvDescr =
              deputies[party][candidateID].Descr || "";
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
    deputies = data.deputies;
  }

  const deputiesPerPage = 10;
  const totalPages = Math.ceil(deputies.length / deputiesPerPage);

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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-end my-4 mx-2">
            <input
              type="text"
              placeholder="Search by name"
              value={searchValue}
              onChange={handleSearchChange}
              className="px-2 py-1 rounded-md bg-gray-200 text-gray-800"
            />
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            {/* Table headers */}
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                >
                  Ονοματεπώνυμο
                </th>
                <th scope="col" className="px-6 py-3">
                  Εκλογική Περιφέρεια
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                >
                  Συνδυασμός
                </th>
                {Rank && (
                  <>
                    <th scope="col" className="px-6 py-3">
                      Θέση
                    </th>
                  </>
                )}
                {Votes && (
                  <>
                    <th scope="col" className="px-6 py-3">
                      Ψήφοι
                    </th>
                  </>
                )}
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {currentDeputies.map((deputy, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td
                    className={`${
                      deputy.seat ? "font-bold" : ""
                    } px-6 py-4 text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800`}
                  >
                    {deputy.cand_TvDescr}
                  </td>
                  <td className="px-6 py-4">{getDistrictName(deputy.EP_ID)}</td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
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
            </tbody>
          </table>

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
