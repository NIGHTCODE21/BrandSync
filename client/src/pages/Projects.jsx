import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import ProjectModal from "../components/ProjectModal";

function Projects() {
  const [projects, setProjects] = useState([]);

  

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
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

      setProjects(res.data.projects);

    } catch (error) {
      console.error(error);
    }
  };

  const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
};

const [selectedProject, setSelectedProject] = useState(null);
const { openProjectModal, setOpenProjectModal } = useOutletContext();
console.log(openProjectModal);
const [search, setSearch] = useState("");

const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this project?"
  );

  if (!confirmDelete) return;

  try {

    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/projects/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchProjects();

    alert("Project deleted successfully");

  } catch (error) {

    console.error(error);

    alert("Failed to delete project");

  }

};

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800">
        Projects
      </h1>

      <p className="text-slate-500 mt-2 mb-8">
        Manage all branding projects.
      </p>

     <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        <input
  type="text"
  placeholder="Search projects..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full md:w-80 mb-6 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
/>

  <table className="w-full">

    <thead className="bg-slate-100">

      <tr className="text-left">

        <th className="p-5">Project</th>
        <th className="p-5">Client</th>
        <th className="p-5">Budget</th>
        <th className="p-5">Status</th>
        <th className="p-5 text-center">Actions</th>

      </tr>

    </thead>

    <tbody>

     {projects
    .filter((project) =>
      project.projectName.toLowerCase().includes(search.toLowerCase()) ||
      project.client?.companyName.toLowerCase().includes(search.toLowerCase()) ||
      project.status.toLowerCase().includes(search.toLowerCase()) ||
      (project.service || "").toLowerCase().includes(search.toLowerCase())
    )

.map((project) => (

       <tr
  key={project._id}
  className="border-t hover:bg-slate-50 transition"
>

          <td className="p-5 font-semibold">
            {project.projectName}
          </td>

          <td className="p-5">
            {project.client?.companyName || "N/A"}
          </td>

          <td className="p-5">
  ₹{Number(project.budget).toLocaleString("en-IN")}
</td>

          <td className="p-5">

            <span
  className={`px-3 py-1 rounded-full text-sm ${
    statusStyles[project.status] || "bg-slate-100 text-slate-700"
  }`}
>
  {project.status}
</span>

          </td>

          <td className="py-4">
  <div className="flex items-center gap-4">
   <button
  onClick={() => {
    setSelectedProject(project);
    setOpenProjectModal(true);
  }}
  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
>
  <Pencil size={16} />
  Edit
</button>

  <button
  onClick={() => handleDelete(project._id)}
  className="flex items-center gap-1 text-red-600 hover:text-red-800"
>
  <Trash2 size={16} />
  Delete
</button>
  </div>
</td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

{openProjectModal && (
  <ProjectModal
    setOpenProjectModal={setOpenProjectModal}
    project={selectedProject}
    fetchProjects={fetchProjects}
  />
)}

    </div>

    
  );
  
}

export default Projects;