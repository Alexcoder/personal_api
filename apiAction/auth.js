import { Auth,  } from "../model/auth.js";
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import nodemailer from "nodemailer"
import { HouseTracker } from "../model/houseTracker.js";

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
      group     : existingUser?.group,
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
         group     : existingUser?.group,
       }) 
      }
    } catch (err) {
        res.status(400).json(err)
    }   
};

export const fetchAll = async(req, res) =>{
  try {
     const existingUser = await Auth.find()
       res.status(200).json(existingUser) 
    } catch (err) {
        res.status(400).json(err)
    }   
};
export const fetchOne = async(req, res) =>{
  // console.log("fetchoneReq", req?.params.userId)
  try {
     const existingUser = await Auth.findOne({_id: req?.params.userId})
       res.status(200).json({
        _id       : existingUser?._id,
        email     : existingUser?.email,
        firstName : existingUser?.firstName,
        lastName  : existingUser?.lastName, 
        admin     : existingUser?.admin ,
        group     : existingUser?.group,
      }) 
    } catch (err) {
        res.status(400).json(err)
    }   
};

export const addUserToGroup = async(req, res) =>{
  const newGroup={
    groupId : req?.body.groupId,
    monthGroupCreated : req?.body.monthCreated, 
    yearGroupCreated  : req?.body.yearCreated, 
    dayGroupCreated   : req?.body.dayCreated, 
  }
  const newGroupMember={
    id        : req?.params.userId,
    name      : `${req?.body.user.firstName} ${req?.body.user.lastName}`,
    email     : req?.body.user.email,
    username  : req?.body.user.username,
    joinDate  : req.body.joinDate,
  }
  try {
     const existingUser = await Auth.findOne({_id: req?.params.userId})
     const existingGroup = await HouseTracker.findOne({_id: req?.body.groupId})
     const isUserInGroup = existingUser.group.some(item=> item?.groupId===req?.body.groupId)
    //  console.log("isUserInGroup", isUserInGroup)
     console.log("existingGroup", existingGroup? "group exist" : "")
     console.log("existingUser", existingUser? "user exist" : "")
     if(existingUser  && !isUserInGroup){
     existingUser.group.push(newGroup)
     existingGroup.groupMember.push(newGroupMember)
     await existingUser.save()
     await existingGroup.save()
     return res.status(200).json({
      _id       : existingUser?._id,
      email     : existingUser?.email,
      firstName : existingUser?.firstName,
      lastName  : existingUser?.lastName, 
      admin     : existingUser?.admin ,
      group     : existingUser?.group,
      message: "You Have Been Added Successfully"
    }) 
     }else{
      return res.status(200).json({message : "User Is Already A Member"})
     }
    } catch (err) {
        res.status(400).json(err)
    }   
};

