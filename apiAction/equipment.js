import { Equipment,  } from "../model/equipment.js";
// import { io } from "../index.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary"; 


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createEquipment = async(req, res) =>{
  console.log("newEquipment" , req?.body)
  const newEquipmentReport = {
    department            : req.body.department,
    equipmentName         : req.body.equipmentName,
    equipmentCodeName     : req.body.equipmentCodeName,
    equipmentSerialNumber : req.body.equipmentSerialNumber,
    equipmentType         : req.body.equipmentType,
    date                  : req.body.date,
  };
  try {
    const created = await new Equipment(newEquipmentReport).save();
     res.status(200).json(created); 
    } catch (err) {
        res.status(400).json(err)
    }   
};

export const getEquipment = async(req, res) =>{
   try{
        const data = await Equipment.find()
        res.status(200).json(data)
   }catch(err){
    res.status(400).json(err)
   }
  // const { page } = req.query  ;
  // console.log("page", page)
  // const LIMIT = 10 ;
  // const startIndex = ( Number(page)-1 ) * LIMIT;
  // try {
  //     const totalEquipment = await Equipment.countDocuments({})
  //     const equipment = await Equipment.find().sort({_id : -1}).limit(LIMIT).skip(startIndex);
  //     res.status(200).json({
  //       data: equipment ,
  //       currentPage : Number(page),
  //       numberOfPages: Math.ceil( totalEquipment / LIMIT ),
  //     });
  //   } catch (err) {
  //     res.status(400).json(err)
  //   }   
};


export async function getEquipmentById(req, res){  
   const { equipmentId, } = req.params ;
  try {
      const equipment = await Equipment.findById(equipmentId);
      res.status(200).json({ equipment })
    } catch (err) {
      res.status(400).json(err)
    }   
  };



  
  export const getEquipmentByCategory = async(req, res)=>{    
    const searchQuery = new RegExp(req.body.category, "i")
    try {
      const data = await Equipment.find({ category : searchQuery});
      io.emit("postByCategory", data)
      res.status(200).json(data)
    } catch (err) {
      res.status(400).json(err)
    }   
  };
  

 
  export const updateEquipment = async (req, res) =>{    
    try {
      const updated = await Equipment.findByIdAndUpdate(req.params.equipmentID, { $set : req.body }, { new : true });
      res.status(200).json(updated)
    } catch (err) {
      res.status(400).json(err)
    }   
  };
  
  export const deleteEquipment = async(req, res) =>{ 
    try {
      await Equipment.findByIdAndDelete(req?.params.equipmentID);
      res.status(200).json("Post deleted")
    } catch (err) {
        res.status(400).json(err)
    }   
};