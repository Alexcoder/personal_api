import { Auth,  } from "../model/auth.js";
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import nodemailer from "nodemailer"

dotenv.config()

// Transporter setup for nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail", // or use another email provider's settings
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});



const hash =(password)=> bcrypt.hash(password, 10)
const compare =(enteredPassword, storedPassword)=> bcrypt.compare(enteredPassword, storedPassword);

export const register = async(req, res) =>{
  console.log("register", req?.body? "arrived": "");
//
//   const mailOptions = {
//   from: process.env.EMAIL,
//   to: req?.body.email,
//   subject: "Complete your registration",
//   // html: `<p>Click <a href="${registrationLink}">here</a> to complete your registration.</p>`,
//   html: `<p>Click <a href="${"registrationLink"}">here</a> to complete your registration.</p>`,
// };
//
  const newUser ={
    email     : req?.body.email,
    firstName : req?.body.firstName,
    lastName  : req?.body.lastName,
    password  : req?.body.password,
    followers : [], 
  }
  try {
     const existingUser = await Auth.findOne({email : req?.body.email});
    //  await transporter.sendMail(mailOptions);
     if(existingUser){
      return res.status(400).json("User Already Exist")
     }
    //  res.status(200).json({ message: "Registration email sent!" });

     const hashPassword = await hash(req?.body.password)
     const savedUser = await new Auth({...newUser, hashPassword}).save();
     res.status(200).json({
      _id       : savedUser._id,
      email     : savedUser.email,
      firstName : savedUser.firstName,
      lastName  : savedUser.lastName, 
      admin     : savedUser.admin ,
    }) 
    } catch (err) {
        res.status(400).json(err)
    }   
};

export const login = async(req, res) =>{
  console.log("login", req?.body? "arrived": "")

  try {
     const existingUser = await Auth.findOne({email : req?.body.email});
     if(!existingUser){ return res.status(400).json("User Does Not Exist") }
     const comparePassword = await compare(req?.body.password, existingUser?.hashPassword)
     if (!comparePassword){ return res.status(400).json("You entered wrong password") }
     if(comparePassword){
        res.status(200).json({
         _id       : existingUser?._id,
         email     : existingUser?.email,
         firstName : existingUser?.firstName,
         lastName  : existingUser?.lastName, 
         admin     : existingUser?.admin ,
       }) 
      }
    } catch (err) {
        res.status(400).json(err)
    }   
};

export const fetch = async(req, res) =>{
  try {
     const res = await Auth.find()
       res.status(200).json(res) 
    } catch (err) {
        res.status(400).json(err)
    }   
};

