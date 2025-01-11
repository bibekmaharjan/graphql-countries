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

import type { Continent } from "~/types";

interface CurrencyDistributionChartProps {
  continent: Continent | null;
}

interface TooltipData {
  count: number;
  currency: string;
  percentage: string;
}

const CurrencyDistributionChart: React.FC<CurrencyDistributionChartProps> = ({
  continent,
}) => {
  const getCurrencyDistribution = () => {
    if (!continent?.countries) return [];

    const currencyCount = continent.countries.reduce(
      (acc, country) => {
        if (country.currency) {
          const currencies = country?.currency?.split(",");
          currencies.forEach((currency) => {
            const trimmedCurrency = currency.trim();
            acc[trimmedCurrency] = (acc[trimmedCurrency] ?? 0) + 1;
          });
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(currencyCount)
      .map(([currency, count]) => ({
        currency,
        count,
        percentage: ((count / continent.countries.length) * 100).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  const currencyData = getCurrencyDistribution();

  const CustomTooltip: React.FC<{
    active?: boolean;
    payload?: { payload: TooltipData }[];
  }> = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div className="rounded border border-gray-200 bg-white p-2 shadow">
          <p className="font-medium">{payload[0]?.payload?.currency}</p>
          <p>Countries: {payload[0]?.payload.count}</p>
          <p>Percentage: {payload[0]?.payload.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-96 w-full rounded-lg bg-[#292353] p-4 shadow">
      <h2 className="mb-4 text-center text-xl font-bold text-white">
        Currency Distribution in {continent?.name ?? "Region"}
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={currencyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="currency"
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="#3b82f6" name="Number of Countries" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrencyDistributionChart;
