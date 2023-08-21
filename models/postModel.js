const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title:{type:String,require:true},
    body:{type:String,require:true},
    device:{type:String,require:true},
    no_of_comments:{type:Number,require:true},
    creator:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    name:{type:String}

})

const Post = mongoose.model("post",postSchema);

module.exports = Post;