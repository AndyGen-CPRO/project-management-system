const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date,  required: true },
    endDate: {type: Date, required: true },
    description: { type: String },
    status: { type: String, default: "on-going"},
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;