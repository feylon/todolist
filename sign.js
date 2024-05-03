import { Router } from "express";
import mongoose from "mongoose";


let User = mongoose.models.user || mongoose.model("user", new mongoose.Schema(
    {
        name:String,
        password:String,
        login:String
    }
));

const router = Router();
router.post("/",async (req, res)=>{
    console.log(req.body, 1)
const {name, password, login} = req.body;
if(!name && !password && !login) return res.status(400).send("Xato so'rov")
let data = await User.find({login});
console.log(data)
if(data.length != 0) return res.status(401).send("Ro'yxatdan o'tgan foydalanuvchi");
let save = new User({name,password,login});
save = await save.save()
console.log(save)
return res.status(201).send({created:true});    
});
export default router;