const Project = require("../models/Project");

// Add Project
const addProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("client")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Project Count
const getProjectCount = async (req, res) => {
  try {
    const count = await Project.countDocuments();

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Project
const updateProject = async (req, res) => {
  try {

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Project
const deleteProject = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getProjectStatusCounts = async (req, res) => {
  try {
    const pending = await Project.countDocuments({ status: "Pending" });

    const inProgress = await Project.countDocuments({
      status: "In Progress",
    });

    const completed = await Project.countDocuments({
      status: "Completed",
    });

    res.status(200).json({
      success: true,
      pending,
      inProgress,
      completed,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addProject,
  getProjects,
  getProjectCount,
  updateProject,
  deleteProject,
  getProjectStatusCounts,
};