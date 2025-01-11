import React from "react";

import type { Country } from "~/types";

interface CountryListProps {
  countries: Country[];
  onSelectCountry: (country: Country) => void;
}

export const CountryList: React.FC<CountryListProps> = ({
  countries,
  onSelectCountry,
}) => (
  <div className="col-span-2 h-[400px] rounded-lg bg-[#292353] p-6 shadow-lg">
    <h3 className="mb-6 text-lg font-semibold text-white">Countries</h3>
    <div className="custom-scrollbar h-[320px] space-y-2 overflow-y-auto pr-2">
      {countries.map((country) => (
        <div
          key={country.code}
          onClick={() => onSelectCountry(country)}
          className="flex cursor-pointer items-center justify-between rounded-lg bg-[#342E6A] p-4 transition-colors hover:bg-[#5148a6]"
        >
          <span className="flex items-center space-x-3">
            <span className="text-xl">{country.emoji}</span>
            <span className="font-medium text-white">{country.name}</span>
          </span>
          <div className="flex items-center space-x-4">
            <span className="rounded bg-[#292353] px-2 py-1 text-sm text-gray-100">
              {country.currency}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
