const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, required: true },
    status: { type: String, default: "pending", required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    partId: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
