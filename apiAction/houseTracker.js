import { HouseTracker,  } from "../model/houseTracker.js";
// import { io } from "../index.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary"; 


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createHouseTracker = async(req, res) =>{
  console.log("newEquipment" , req?.body)
  const newEquipmentReport = {
    type    : req.body.type,
    purpose : req.body.purpose,
    detail  : req.body.detail,
    amount  : req.body.amount,
    date    : req.body.date,
  };
  try {
    const created = await new HouseTracker(newEquipmentReport).save();
     res.status(200).json(created); 
    } catch (err) {
        res.status(400).json(err)
    }   
};

export const getHouseTracker = async(req, res) =>{
   try{
        const data = await HouseTracker.find()
        res.status(200).json(data)
   }catch(err){
    res.status(400).json(err)
   }
  // const { page } = req.query  ;
  // console.log("page", page)
  // const LIMIT = 10 ;
  // const startIndex = ( Number(page)-1 ) * LIMIT;
  // try {
  //     const totalEquipment = await HouseTracker.countDocuments({})
  //     const equipment = await HouseTracker.find().sort({_id : -1}).limit(LIMIT).skip(startIndex);
  //     res.status(200).json({
  //       data: equipment ,
  //       currentPage : Number(page),
  //       numberOfPages: Math.ceil( totalEquipment / LIMIT ),
  //     });
  //   } catch (err) {
  //     res.status(400).json(err)
  //   }   
};


export async function getHouseTrackerById(req, res){  
   const { equipmentId, } = req.params ;
  try {
      const equipment = await HouseTracker.findById(equipmentId);
      res.status(200).json({ equipment })
    } catch (err) {
      res.status(400).json(err)
    }   
  };



  
  export const getHouseExpenseByCategory = async(req, res)=>{    
    const searchQuery = new RegExp(req.body.category, "i")
    try {
      const data = await HouseExpense.find({ category : searchQuery});
      io.emit("postByCategory", data)
      res.status(200).json(data)
    } catch (err) {
      res.status(400).json(err)
    }   
  };
  

 
  export const updateHouseExpense = async (req, res) =>{    
    try {
      const updated = await HouseExpense.findByIdAndUpdate(req.params.equipmentID, { $set : req.body }, { new : true });
      res.status(200).json(updated)
    } catch (err) {
      res.status(400).json(err)
    }   
  };
  
  export const deleteHouseExpense = async(req, res) =>{ 
    try {
      await HouseExpense.findByIdAndDelete(req?.params.equipmentID);
      res.status(200).json("Post deleted")
    } catch (err) {
        res.status(400).json(err)
    }   
};