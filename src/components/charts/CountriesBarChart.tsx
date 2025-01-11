import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import type { CountriesBarChartProps } from "~/types";

export const CountriesBarChart: React.FC<CountriesBarChartProps> = ({
  continents,
}) => {
  const chartData = continents?.map((cont) => ({
    name: cont.name,
    countries: cont.countries.length,
  }));
  return (
    <div className="h-[400px] rounded-lg bg-[#292353] p-6 shadow-lg">
      <h3 className="mb-6 text-lg font-semibold text-white">
        Countries per Continent
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
            <Bar dataKey="countries" fill="#698EEF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
