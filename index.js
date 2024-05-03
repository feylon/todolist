import Express from "express";
import cors from "cors"
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import login from "./login.js"
import sign from "./sign.js";
import todo from "./todo.js";
(async ()=>{
    try {
    // await mongoose.connect("mongodb://localhost:27017/test");
     await mongoose.connect("mongodb+srv://jamshid14092002:3tGLCosvg3eKCyX8@cluster0.miks1ok.mongodb.net/?retryWrites=true&w=majority", {});
   
    console.log("Ulanish hosil qilindi");
    } catch (error) {
        console.log("Ulanishda xatolik mavjud ", error)
    }
})()

const app = Express();
app.use(Express.json());
app.use(cors());
app.use("/todo", todo)
app.use("/sign",sign)
app.use("/login",login)
let i = [1,2,4,5,6,7,8,9,10]
app.get("/",(req, res)=>{
res.send(i)

});
dotenv.config()
console.log(process.env.PORT, " port ishga tushdi")
app.listen(process.env.PORT)