const mongoose = require("mongoose");

const UsernameSchema = new mongoose.Schema({
    displayName: { type: String},
    email: { type: String},
    password: { type: String},
    token: { type: String }
});

const Username = mongoose.model("Username", UsernameSchema);

module.exports = Username;