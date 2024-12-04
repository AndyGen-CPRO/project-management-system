const mongoose = require("mongoose");

const inboxSchema = new mongoose.Schema({
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    title: { type: String,  required: true },
    body: { type: String},
    dateSent: { type: Date, default: Date.now },
    invitationToken: { type: String, unique: true, required: true },
    status: { type:String, default: "pending" }
})

const Inbox = mongoose.model('Inbox', inboxSchema);

module.exports = Inbox;