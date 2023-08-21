const mongoose = require("mongoose")

const blackSchema = new mongoose.Schema({
    blacklist: { type: [String], require: true },

})

const blacklist = mongoose.model("blacklist", blackSchema);

module.exports = blacklist;