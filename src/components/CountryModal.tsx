import React from "react";
import type { Country } from "~/types";

interface CountryModalProps {
  country: Country;
  onClose: () => void;
}

export const CountryModal: React.FC<CountryModalProps> = ({
  country,
  onClose,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div className="w-full max-w-md rounded-lg bg-[#292353] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {country.emoji} {country.name}
        </h2>
        <span className="text-white">{country.native}</span>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-white">Languages</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {country.languages.map((lang) => (
              <span
                key={lang.code}
                className="rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800"
              >
                {lang.name} ({lang.native})
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white">Details</h3>
          <div className="mt-2 space-y-2">
            <p className="text-white">Currency: {country.currency}</p>
            <p className="text-white">Phone: {country.phone}</p>
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="mt-6 w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
      >
        Close
      </button>
    </div>
  </div>
);
