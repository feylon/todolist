import mongoose from "mongoose";
import JWT from "jsonwebtoken";

import { Router } from "express";

const todo = mongoose.models.todo || mongoose.model("todo", mongoose.Schema({
    content:String,
    active:Boolean,
    time:{type:Date, default:Date.now}
}))

const router = Router();
router.post("/add", async(req, res)=>{
    const {content, active} = req.body;
    if(content == "") return res.status(400).send("Xato so'rov");
    try{
   await todo.create({active,content});
 return res.status(200).send({created:true});      
    }
    catch(err){
        console.log("saqlashda xatolik")
    }
});
router.get("/get", async(req, res)=>{
    let data = await todo.find({});
    res.status(200).send(data)
});
router.post("/edit/:id", async(req, res)=>{
console.log(req.params.id)
let data = await todo.findById(req.params.id)
await todo.findByIdAndUpdate(req.params.id,{
    active:!data.active
})
res.status(200).send({edited:true});
})


router.delete("/delete/:id", async(req, res)=>{
    console.log(req.params.id)
    await todo.findByIdAndDelete(req.params.id)
    res.status(200).send({deleted:true});
    })
export default router;