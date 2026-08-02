const express = require("express");
const router = express.Router();

const {
  addProject,
  getProjects,
  getProjectCount,
  updateProject,
  deleteProject,
  getProjectStatusCounts,
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");

// Get Project Count
router.get("/count", protect, getProjectCount);

// Add Project & Get All Projects
router
  .route("/")
  .post(protect, addProject)
  .get(protect, getProjects);

router.get("/status-counts", protect, getProjectStatusCounts);

router
  .route("/:id")
  .put(protect, updateProject)
  .delete(protect, deleteProject);

module.exports = router;