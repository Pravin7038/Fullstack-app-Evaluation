const express = require("express");
const route = express.Router();
const Post = require("../models/postModel")
const auth = require("../middleware/authMiddleware")
route.get("/",async(req,res)=>{

    try {

        const posts = await Post.find().limit(3);

        res.send(posts)

        
    } catch (error) {

        res.send(error)
    }
})
route.post("/add",auth,async(req,res)=>{
    try {
        
        await Post.create({...req.body,creator:req.userid,name:req.username});

        res.send({msg:"Post created"})
        
    } catch (error) {
        
        res.send(error)
    }
})

route.patch("/update/:id",auth,async(req,res)=>{

    try {

        const post = await Post.findOne({ _id: req.params.id });

        if (post.creator.toString() === req.userid) {

            await Post.findByIdAndUpdate({ _id: req.params.id }, req.body,{new:true})

            res.send({msg:"post is updated"});

        }
        else {

            res.send("you are not admin of the Post");

        }



    } catch (error) {

        res.send({  error })

    }
})

route.delete("/delete/:id", auth, async (req, res) => {


    try {

        const post = await Post.findOne({ _id: req.params.id });
        console.log(post)

        if (post.creator.toString() === req.userid) {

            await Post.findOneAndDelete({ _id: req.params.id },{new:true});

            res.send({msg:"post is deleted"});

        }
        else {

            res.send("You are not admin of the post");

        }





    } catch (error) {

        res.send({ "msg": "error" })

    }
})

module.exports = route;