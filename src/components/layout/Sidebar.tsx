import React from "react";
import { FaGlobe } from "react-icons/fa";
import { useQuery } from "@apollo/client";

import { GET_CONTINENTS } from "~/graphql/queries";
import type { Continent, ContinentsData } from "~/types";

interface SidebarProps {
  selectedContinent: Continent | null;
  onContinentChange: (continent: Continent) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedContinent,
  onContinentChange,
}) => {
  const { data, loading, error } = useQuery<ContinentsData>(GET_CONTINENTS);

  if (loading) {
    return (
      <div className="h-full min-h-screen w-full bg-[#292353] px-4 py-6 shadow-lg">
        <div className="animate-pulse">
          <div className="mb-6 h-8 w-3/4 rounded bg-gray-200"></div>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="mb-3 h-14 rounded-lg bg-gray-100"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full min-h-screen w-full bg-[#292353] px-4 py-6 shadow-lg">
        <div className="rounded-lg bg-red-50 p-4 text-red-500">
          <p>Error loading continents</p>
          <p className="mt-2 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-screen w-full bg-[#292353] px-4 py-6 shadow-lg">
      <div className="sticky top-[30px]">
        <h2 className="mb-6 px-2 text-xl font-semibold text-white">
          Continent
        </h2>
        <div className="space-y-3">
          {data?.continents.map((continent: Continent) => (
            <button
              key={continent.code}
              onClick={() => onContinentChange(continent)}
              className={`flex w-full items-center justify-between rounded-lg p-4 transition-colors ${
                selectedContinent?.code === continent.code
                  ? "bg-[#5148a6] text-white"
                  : "bg-[#342E6A] text-gray-400 hover:bg-[#5148a6]"
              }`}
            >
              <span className="flex items-center">
                <FaGlobe className={`mr-3 text-white`} />
                {continent.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
