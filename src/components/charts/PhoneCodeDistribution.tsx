import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface PhoneCodeDistributionProps {
  continent: { name: string; countries: { name: string; phone: string }[] };
}

const PhoneCodeDistribution: React.FC<PhoneCodeDistributionProps> = ({
  continent,
}) => {
  const data = continent.countries.reduce(
    (acc, country) => {
      const phone = country.phone || "Unknown";
      const existing = acc.find((item) => item.phone === phone);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ phone, count: 1 });
      }
      return acc;
    },
    [] as { phone: string; count: number }[],
  );

  return (
    <div className="h-[400px] rounded-lg bg-[#292353] p-6 shadow-lg">
      <h3 className="mb-6 text-lg font-semibold text-white">
        Phone Code Distribution in {continent.name}
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="phone" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" stackId="a" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PhoneCodeDistribution;
