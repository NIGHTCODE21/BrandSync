import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Analytics() {
    const [analytics, setAnalytics] = useState({
  totalRevenue: 0,
  totalClients: 0,
  totalProjects: 0,
  completedProjects: 0,
  revenueByMonth: [],
  projectStatus: [],
  services: [],
});

useEffect(() => {
  fetchAnalytics();
}, []);

const fetchAnalytics = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/analytics",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAnalytics(res.data);

  } catch (error) {
    console.error(error);
  }
};

const COLORS = [
  "#FACC15", // Pending
  "#3B82F6", // In Progress
  "#22C55E", // Completed
];
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800">
        Analytics
      </h1>

      <p className="text-slate-500 mt-2 mb-8">
        Track business performance and insights.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

  <div className="bg-white rounded-3xl p-6 shadow-md">
    <h3 className="text-slate-500">Total Revenue</h3>
    <p className="text-3xl font-bold mt-3">₹{Number(analytics.totalRevenue).toLocaleString("en-IN")}</p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-md">
    <h3 className="text-slate-500">Total Clients</h3>
    <p className="text-3xl font-bold mt-3">{analytics.totalClients}</p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-md">
    <h3 className="text-slate-500">Total Projects</h3>
    <p className="text-3xl font-bold mt-3">{analytics.totalProjects}</p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-md">
    <h3 className="text-slate-500">Completed Projects</h3>
    <p className="text-3xl font-bold mt-3">{analytics.completedProjects}</p>
  </div>

</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

  <div className="bg-white rounded-3xl p-6 shadow-md h-96">
    <h2 className="text-xl font-semibold mb-4">
      Monthly Revenue
    </h2>

   <div className="bg-white rounded-3xl shadow-md p-6 h-96">

  <h2 className="text-xl font-bold mb-5">
    Revenue by Month
  </h2>

  <ResponsiveContainer width="100%" height="90%">

    <BarChart data={analytics.revenueByMonth || []}>

      <XAxis dataKey="month" />

      <YAxis
  tickFormatter={(value) =>
    `₹${(value / 100000).toFixed(1)}L`
  }
/>

      <Tooltip
  formatter={(value) =>
    `₹${Number(value).toLocaleString("en-IN")}`
  }
/>

      <Bar
  dataKey="revenue"
  fill="#8B5CF6"
  radius={[10, 10, 0, 0]}
/>

    </BarChart>

  </ResponsiveContainer>

</div>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-md h-96">
    <h2 className="text-xl font-semibold mb-4">
      Project Status
    </h2>

    <div className="bg-white rounded-3xl shadow-md p-6 h-96">

  <h2 className="text-xl font-bold mb-5">
    Project Status
  </h2>

  <ResponsiveContainer width="100%" height="90%">

    <PieChart>

      <Pie
  data={analytics.projectStatus || []}
        dataKey="value"
        nameKey="name"
        outerRadius={110}
        label
      >

{(analytics.projectStatus || []).map((entry, index) => (
            <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}

      </Pie>

      <Tooltip />

      <Legend />

    </PieChart>

  </ResponsiveContainer>

</div>
  </div>

</div>

<div className="bg-white rounded-3xl shadow-md p-6 mt-8">

  <h2 className="text-xl font-semibold mb-6">
    Top Services
  </h2>

  <div className="space-y-5">

  {(analytics.services || []).map((service) => (

    <div key={service.name}>

      <div className="flex justify-between mb-2">

        <span className="font-medium">
          {service.name}
        </span>

        <span className="font-bold">
          {service.value}
        </span>

      </div>

      <div className="w-full bg-slate-200 rounded-full h-3">

        <div
          className="bg-violet-600 h-3 rounded-full"
          style={{
            width: `${service.value * 20}%`,
          }}
        />

      </div>

    </div>

  ))}

</div>

</div>


    </div>
  );
}

export default Analytics;