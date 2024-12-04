const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
});

const Part = mongoose.model('Part', partSchema);

module.exports = Part;
