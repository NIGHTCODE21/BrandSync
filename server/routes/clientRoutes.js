const express = require("express");
const router = express.Router();

const {
  addClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
  getClientCount,
} = require("../controllers/clientController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, addClient)
  .get(protect, getClients);

router.get("/count", protect, getClientCount);


router
  .route("/:id")
  .get(protect, getClientById)
  .put(protect, updateClient)
  .delete(protect, deleteClient);


module.exports = router;