const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    service: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Completed",
      ],
      default: "Pending",
    },

    assignedTo: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);