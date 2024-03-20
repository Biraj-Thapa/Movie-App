import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser=asyncHandler(async(req,res)=>{
    const{userName,email,password}=req.body;
    console.log(userName);
    console.log(email);
    console.log(password);
})

export {createUser} ;

    