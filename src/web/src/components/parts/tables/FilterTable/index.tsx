import React, { useState } from "react";

function FilterTable() {
  const [rowID, setRowID] = useState("");
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTableRowElement>,
    id: string
  ) => {
    event.stopPropagation();
    switch (event.key) {
      case "ArrowUp":
        console.log("ArrowUp");
        console.log("id: ", id);
        event.preventDefault();
        if (rowID === "1") return;
        setRowID((prevRowID) => String(Number(prevRowID) - 1));
        break;
      case "ArrowDown":
        console.log("ArrowDown");
        console.log("id: ", id);
        event.preventDefault();
        if (rowID === "4") return;
        setRowID((prevRowID) => String(Number(prevRowID) + 1));
        break;
      default:
        break;
    }
  };
  const handleClick = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id: string
  ) => {
    event.preventDefault();
    setRowID(id);
  };
  const dummyCompanyRows = [
    {
      id: "1",
      user: "test name 1",
      role: "Admin",
      createdAt: "12/09/2020",
      status: "active",
    },
    {
      id: "2",
      user: "test name 2",
      role: "Admin",
      createdAt: "12/09/2020",
      status: "active",
    },
    {
      id: "3",
      user: "test name 3",
      role: "Admin",
      createdAt: "12/09/2020",
      status: "active",
    },
    {
      id: "4",
      user: "test name 4",
      role: "Admin",
      createdAt: "12/09/2020",
      status: "active",
    },
  ];
  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-full">
      <div className="py-8">
        <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
          <h2 className="text-2xl leading-tight">Users</h2>
          <div className="text-end">
            <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
              <div className=" relative ">
                <input
                  type="text"
                  id='"form-subscribe-Filter'
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="name"
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
              >
                Filter
              </button>
            </form>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr
                  id="1"
                  onKeyDown={(e) => handleKeyDown(e, "1")}
                  className={rowID === "1" ? "bg-orange-200" : ""}
                  tabIndex={0}
                >
                  <th
                    scope="col"
                    className="px-5 py-1 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-1 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-1 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Created at
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-1 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-1 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  ></th>
                </tr>
              </thead>
              <tbody className="text-left">
                {dummyCompanyRows.map((row) => (
                  <tr
                    id={row.id}
                    key={row.id}
                    onKeyDown={(e) => handleKeyDown(e, row.id)}
                    onClick={(e) => handleClick(e, row.id)}
                    className={`focus:outline-none ${
                      rowID === row.id ? "bg-sky-50" : "bg-white"
                    }`}
                    tabIndex={0}
                  >
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      <div className="flex items-center">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {row.user}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {row.role}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {row.createdAt}
                      </p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">{row.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 text-sm">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
                >
                  <svg
                    width="9"
                    fill="currentColor"
                    height="8"
                    className=""
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 "
                >
                  1
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
                >
                  2
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100"
                >
                  3
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
                >
                  4
                </button>
                <button
                  type="button"
                  className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
                >
                  <svg
                    width="9"
                    fill="currentColor"
                    height="8"
                    className=""
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterTable;
