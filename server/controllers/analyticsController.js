const Client = require("../models/Client");
const Project = require("../models/Project");

const getAnalytics = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments();
    const totalProjects = await Project.countDocuments();

    const completedProjects = await Project.countDocuments({
      status: "Completed",
    });

    const projects = await Project.find().populate("client");

    const pending = projects.filter(
  (p) => p.status === "Pending"
).length;

const inProgress = projects.filter(
  (p) => p.status === "In Progress"
).length;

const completed = projects.filter(
  (p) => p.status === "Completed"
).length;

const projectStatus = [
  { name: "Pending", value: pending },
  { name: "In Progress", value: inProgress },
  { name: "Completed", value: completed },
];
const serviceMap = {};

projects.forEach((project) => {
  if (!project.service) return;

  serviceMap[project.service] =
    (serviceMap[project.service] || 0) + 1;
});

const services = Object.keys(serviceMap).map((key) => ({
  name: key,
  value: serviceMap[key],
}));

const revenueMap = {};

projects.forEach((project) => {

  const month = new Date(project.createdAt).toLocaleString("en-US", {
    month: "short",
  });

  revenueMap[month] =
    (revenueMap[month] || 0) + Number(project.budget);
});

const revenueByMonth = Object.keys(revenueMap).map((month) => ({
  month,
  revenue: revenueMap[month],
}));

    const totalRevenue = projects.reduce(
      (sum, project) => sum + Number(project.budget || 0),
      0
    );

    

    res.status(200).json({
  success: true,
  totalRevenue,
  totalClients,
  totalProjects,
  completedProjects,

  revenueByMonth,
  projectStatus,
  services,
});

} catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = { getAnalytics };