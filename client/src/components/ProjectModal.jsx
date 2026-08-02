import { useEffect, useState } from "react";
import axios from "axios";

function ProjectModal({
  setOpenProjectModal,
  project,
  fetchProjects,
}) {
  const [clients, setClients] = useState([]);

const [projectName, setProjectName] = useState("");
const [client, setClient] = useState("");
const [service, setService] = useState("");
const [budget, setBudget] = useState("");
const [startDate, setStartDate] = useState("");
const [deadline, setDeadline] = useState("");
const [assignedTo, setAssignedTo] = useState("");
const [description, setDescription] = useState("");
const [status, setStatus] = useState("Pending");

useEffect(() => {

  const fetchClients = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
       `${import.meta.env.VITE_API_URL}/api/clients`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClients(res.data.clients);

    } catch (error) {
      console.error(error);
    }

  };

  fetchClients();

}, []);

useEffect(() => {
  if (project) {
    setProjectName(project.projectName || "");
    setClient(project.client?._id || "");
    setService(project.service || "");
    setBudget(project.budget || "");
    setStartDate(project.startDate?.substring(0, 10) || "");
    setDeadline(project.deadline?.substring(0, 10) || "");
    setAssignedTo(project.assignedTo || "");
    setDescription(project.description || "");
    setStatus(project.status || "Pending");
  }
}, [project]);

const handleSubmit = async () => {
    try {
    const token = localStorage.getItem("token");

    const projectData = {
  projectName,
  client,
  service,
  budget,
  startDate,
  deadline,
  assignedTo,
  description,
  status,
};

if (project) {
  await axios.put(
    `${import.meta.env.VITE_API_URL}/api/projects/${project._id}`,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Project updated successfully");
} else {
  await axios.post(
     `${import.meta.env.VITE_API_URL}/api/projects`,
    projectData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Project created successfully");
}
fetchProjects();
    setOpenProjectModal(false);

    setProjectName("");
setClient("");
setService("");
setBudget("");
setStartDate("");
setDeadline("");
setAssignedTo("");
setDescription("");
setStatus("Pending");




  } catch (error) {
    console.error(error);
alert(project ? "Failed to update project" : "Failed to create project");  }
};
    
    return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-slate-800 mb-6">
  {project ? "Edit Project" : "Create New Project"}
</h2>

       <div className="grid grid-cols-2 gap-5">

  {/* Project Name */}
  <input
    type="text"
    placeholder="Project Name"
    value={projectName}
    onChange={(e) => setProjectName(e.target.value)}
    className="col-span-2 w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
  />

  {/* Client */}
  <select
    value={client}
    onChange={(e) => setClient(e.target.value)}
    className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
  >
    <option value="">Select Client</option>

    {clients.map((item) => (
      <option key={item._id} value={item._id}>
        {item.companyName}
      </option>
    ))}
  </select>

  {/* Service */}
  <select
    value={service}
    onChange={(e) => setService(e.target.value)}
    className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
  >
    <option value="">Select Service</option>
    <option>Website Development</option>
    <option>Logo Design</option>
    <option>Brand Identity</option>
    <option>SEO</option>
    <option>Social Media Marketing</option>
  </select>

  {/* Budget */}
  <input
    type="number"
    placeholder="Budget"
    value={budget}
    onChange={(e) => setBudget(e.target.value)}
    className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
  />

  {/* Assigned To */}
  <input
    type="text"
    placeholder="Assigned To"
    value={assignedTo}
    onChange={(e) => setAssignedTo(e.target.value)}
    className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
  />

  {/* Start Date */}
  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
  />

  {/* Deadline */}
  <input
    type="date"
    value={deadline}
    onChange={(e) => setDeadline(e.target.value)}
    className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
  />

  {/* Status */}
<select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>

  

  {/* Description */}
  <textarea
    placeholder="Project Description"
    rows="4"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="col-span-2 w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
  />

</div>

        <div className="flex justify-end gap-4 mt-8">

          <button
  onClick={() => setOpenProjectModal(false)}
  className="px-6 py-3 rounded-xl border"
>
  Cancel
</button>

        <button
  onClick={handleSubmit}
  className="px-6 py-3 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition"
>
  {project ? "Update Project" : "Create Project"}
</button>

        </div>

      </div>

    </div>
  );
}

export default ProjectModal;