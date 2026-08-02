import {
  Users,
  FolderKanban,
  IndianRupee,
  Clock3,
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";

import RevenueChart from "../components/dashboard/RevenueChart";
import ProjectModal from "../components/ProjectModal";
import { useOutletContext } from "react-router-dom";

function Dashboard() {

    const [clientCount, setClientCount] = useState(0);
    const [projectCount, setProjectCount] = useState(0);
    const [pendingProjects, setPendingProjects] = useState(0);
    const [recentProjects, setRecentProjects] = useState([]);
const { openProjectModal, setOpenProjectModal } = useOutletContext();

    useEffect(() => {
  const fetchClientCount = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/clients/count",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClientCount(res.data.count);
    } catch (error) {
      console.error(error);
    }
  };




  const fetchProjectCount = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/projects/count",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProjectCount(res.data.count);
  } catch (error) {
    console.error(error);
  }
};



const fetchProjectStatus = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/projects/status-counts",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setPendingProjects(res.data.pending);

  } catch (error) {
    console.error(error);
  }
};



const fetchRecentProjects = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/projects",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRecentProjects(res.data.projects.slice(0, 5));

  } catch (error) {
    console.error(error);
  }
};


fetchClientCount();
fetchProjectCount();
fetchProjectStatus();
fetchRecentProjects();

}, []);

  const stats = [
    {
      title: "Total Clients",
      value: clientCount,
      icon: Users,
      color: "text-violet-600",
    },
    {
      title: "Projects",
      value: projectCount,
      icon: FolderKanban,
      color: "text-blue-600",
    },
    {
      title: "Revenue",
      value: "₹4.2L",
      icon: IndianRupee,
      color: "text-green-600",
    },
    {
      title: "Pending Tasks",
      value: pendingProjects,
      icon: Clock3,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Revenue Overview + Activity */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Revenue */}

       <div className="xl:col-span-2">
    <RevenueChart />
</div>

        {/* Recent Activity */}

        <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">

          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            Recent Activity
          </h2>

        <div className="space-y-5">

  {recentProjects.map((project) => (

    <div
      key={project._id}
      className="flex items-center gap-3"
    >
      <span className="w-3 h-3 rounded-full bg-violet-500"></span>

<p>
  <span className="font-semibold">{project.projectName}</span>
  {" • "}
  {project.client?.companyName}
</p>   

    </div>

  ))}

</div>
        </div>

      </div>

      {/* Statistics Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="text-4xl font-bold mt-3">
                    {item.value}
                  </h2>

                </div>

                <div className={`p-4 rounded-2xl bg-slate-100 ${item.color}`}>
                  <Icon size={28} />
                </div>

              </div>

            </div>

          );

        })}

      </div>
      {openProjectModal && (
  <ProjectModal 
    setOpenProjectModal={setOpenProjectModal}
  />
)}

    </div>
  );
}

export default Dashboard;