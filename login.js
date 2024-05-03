import { Router } from "express";
import mongoose from "mongoose";
import JWT from "jsonwebtoken";

const router = Router();

let User = mongoose.models.user || mongoose.model("user", new mongoose.Schema(
    {
        name:String,
        password:String,
        login:String
    }
));

router.post("/", async (req, res)=>{
    console.log(req.body)
const {login, password} = req.body;
if( !password && !login) return res.status(400).send("Xato so'rov")
    let data = await User.find({login});
console.log(data)
if(data.length == 0) return res.status(401).send("Parol yoki Login xato")
if(data[0].password != password) return res.status(401).send("Parol yoki Login xato1")

    let token = JWT.sign({user:data._id},"Yashirin so'z",{expiresIn:"1d"});
    res.status(200).send({token : `token`})

}
)
export default router;