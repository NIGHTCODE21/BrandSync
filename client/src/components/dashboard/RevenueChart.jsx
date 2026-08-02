import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function RevenueChart() {
  const data = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 25000 },
    { month: "May", revenue: 32000 },
    { month: "Jun", revenue: 42000 },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 h-full">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Revenue Overview
        </h2>

        <p className="text-slate-500 mt-1">
          Monthly business growth
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#E5E7EB"
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#7C3AED"
            strokeWidth={4}
            dot={{
              r: 6,
              fill: "#7C3AED",
            }}
            activeDot={{
              r: 8,
            }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default RevenueChart;