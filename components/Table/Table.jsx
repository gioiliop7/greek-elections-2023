import { useState } from "react";

export default function Table({ data }) {
  const deputies = data.deputies;
  const deputiesPerPage = 10;
  const totalPages = Math.ceil(deputies.length / deputiesPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
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
  const currentDeputies = filteredDeputies.slice(startDeputyIndex, endDeputyIndex);

  const showPagination = filteredDeputies.length > deputiesPerPage && totalPages > 1;

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
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Ονοματεπώνυμο
                </th>
                <th scope="col" className="px-6 py-3">
                  Εκλογική Περιφέρεια
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                  Συνδυασμός
                </th>
                <th scope="col" className="px-6 py-3">
                  Θέση
                </th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {currentDeputies.map((deputy, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    {deputy.cand_TvDescr}
                  </td>
                  <td className="px-6 py-4">{deputy.EP_ID}</td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {deputy.PARTY_ID}
                  </td>
                  <td className="px-6 py-4">{deputy.Rank}</td>
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
                    className="px-3 py-1 rounded-md bg-blue-500 text-white"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                )}
                {currentPage < totalPages && endDeputyIndex < filteredDeputies.length && (
                  <button
                    className="px-3 py-1 rounded-md bg-blue-500 text-white"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
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