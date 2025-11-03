import client from "../config/database.js"
import {type Request,type Response} from "express"
import { hashPassword ,checkPasswordStrength} from "./passwordHelpers.js";

//Get All users
export const getAllUsers = async (req:Request,res:Response)=>{
    try{
        const users = await client.user.findMany({
            where: { isDeleted: false },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                emailAddress: true,
                isDeleted: true,
            },
        });
        console.log(users)
        return res.status(200).json(users)
    }catch(error){
        console.error("Error occured during fetching users:",error)
        return res.status(500).json({ message:"Something Went Wrong" });
    
    }
}

//New User Registration Function
export const registerUser = async (req:Request, res:Response)=>{
    try{
        const {firstName,lastName,emailAddress,username,password}=req.body;

        if(! firstName || ! lastName || ! emailAddress || !username || ! password){
            console.log("All fields required");
            return res.status(400).json({message:"Something Went Wrong"})
        }
        //I check if email exists in db
        const existingUser = await client.user.findUnique({ where: { emailAddress } });
        if (existingUser) {
            console.log("User already registered");
        return res.status(400).json({ message: "User already registered" });
        }
        //Check how strong user's password is
        const passwordStrength = await checkPasswordStrength(password);
        if(!passwordStrength || passwordStrength.score < 3){
            return res.status(400).json({message:"Please select a stronger password"})
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await client.user.create({data : {username,firstName,lastName,emailAddress,password:hashedPassword},});
        console.log(`User registed ${newUser.username}`)
        return res.status(201).json({
            status : "Success",
            message: "User Registered Successfully",
            data: {
            id: newUser.id,
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.emailAddress,
            isDeleted: newUser.isDeleted
            }
        });
        
    }catch(error){
        console.error("Error occured during user regitration:",error)
        return res.status(500).json({
            status:"Error",
            message:"Something Went Wrong"
        });
        
    }
   
};
