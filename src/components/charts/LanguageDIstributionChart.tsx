import React, { useMemo } from "react";

import {
Pie,
  Cell,
  Legend,
  Tooltip,
  PieChart,
  ResponsiveContainer,
} from "recharts";

import type { Continent } from "~/types";

interface LanguageDistributionChartProps {
  continent: Continent;
}

export const LanguageDistributionChart: React.FC<
  LanguageDistributionChartProps
> = ({ continent }) => {
  const data = useMemo(() => {
    const languageCounts = new Map<string, number>();
    continent.countries.forEach((country) => {
      country.languages.forEach((lang) => {
        languageCounts.set(lang.name, (languageCounts.get(lang.name) ?? 0) + 1);
      });
    });
    return Array.from(languageCounts.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [continent]);

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="h-[400px] rounded-lg bg-[#292353] p-6 shadow-lg">
      <h3 className="mb-6 text-lg font-semibold text-white">
        Top Languages in {continent.name}
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
