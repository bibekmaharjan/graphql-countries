"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { Sidebar } from "~/components/layout/Sidebar";
import { CountryList } from "~/components/CountryList";
import { CountryModal } from "~/components/CountryModal";
import { GET_CONTINENT_DATA, GET_CONTINENTS } from "~/graphql/queries";
import { CountriesBarChart } from "~/components/charts/CountriesBarChart";
import PhoneCodeDistribution from "~/components/charts/PhoneCodeDistribution";
import CurrencyDistributionChart from "~/components/charts/CurrencyDIstributionChart";
import { LanguageDistributionChart } from "~/components/charts/LanguageDIstributionChart";

import type {
  Country,
  Continent,
  ContinentData,
  ContinentDataVariables,
  CountriesBarChartProps,
} from "~/types";

const Dashboard: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(
    null,
  );

  const { data: continentData, loading } = useQuery<
    ContinentData,
    ContinentDataVariables
  >(GET_CONTINENT_DATA, {
    variables: { code: selectedContinent?.code },
    skip: !selectedContinent,
  });

  const { data: continentsData } =
    useQuery<CountriesBarChartProps>(GET_CONTINENTS);

  const handleContinentChange = (continent: Continent): void => {
    setSelectedContinent(continent);
  };

  return (
    <div className="flex h-full min-h-screen w-full">
      <div className="w-64 flex-shrink-0">
        <Sidebar
          selectedContinent={selectedContinent}
          onContinentChange={handleContinentChange}
        />
      </div>

      <div className="w-full flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Global Demographics Dashboard
          </h1>
          {selectedContinent && (
            <p className="mt-2 text-gray-400">
              Exploring {selectedContinent.name}
            </p>
          )}
        </header>

        {loading ? (
          <div className="flex h-96 items-center justify-center rounded-lg bg-[#292353] shadow-lg">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-blue-500" />
          </div>
        ) : continentData?.continent ? (
          <div className="grid w-full grid-cols-2 gap-6">
            <CountriesBarChart continents={continentsData?.continents} />
            <LanguageDistributionChart continent={continentData.continent} />
            <CurrencyDistributionChart continent={continentData.continent} />
            <PhoneCodeDistribution continent={continentData.continent} />
            <CountryList
              countries={continentData.continent.countries}
              onSelectCountry={setSelectedCountry}
            />
          </div>
        ) : (
          <div className="py-20 text-center text-gray-500">
            <p className="text-lg">
              Select a continent to view its demographics
            </p>
          </div>
        )}

        {selectedCountry && (
          <CountryModal
            country={selectedCountry}
            onClose={() => setSelectedCountry(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
