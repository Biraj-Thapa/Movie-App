import express  from "express";
const app=express()
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

dotenv.config()
connectDB()

const port=process.env.PORT || 4000

app.use("/api/v1/users",userRoutes);


app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})


