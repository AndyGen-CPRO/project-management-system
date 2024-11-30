const mongoose = require("mongoose");

const taskAssignmentSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedDate:  { type: Date, default: Date.now }
})

const TaskAssignment = mongoose.model('TaskAssignment', taskAssignmentSchema);

module.exports = TaskAssignment;