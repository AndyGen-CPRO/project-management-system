const mongoose = require("mongoose");

const inboxSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String,  required: true },
    body: { type: String},
    dataSent: { type: Date, default: Date.now },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: false },
})

const Inbox = mongoose.model('Inbox', inboxSchema);

module.exports = Inbox;