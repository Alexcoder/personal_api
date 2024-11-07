import { OhodoTracker,  } from "../model/ohodoTracker.js";
// import { io } from "../index.js";
import dotenv from "dotenv";
// import { v2 as cloudinary } from "cloudinary"; 


dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

export const createOhodoTracker = async(req, res) =>{
  console.log("newOhodoTracker" , req?.body)
  const newHouseTrackerReport = {
    buildingStage : req.body.buildingStage,
    itemRequired  : req.body.itemRequired,
    itemQuantity  : req.body.itemQuantity,
    amount        : req.body.amount,
  };
  try {
    const created = await new OhodoTracker(newHouseTrackerReport).save();
     res.status(200).json(created); 
    } catch (err) {
        res.status(400).json(err)
    }   
};

export const getOhodoTracker = async(req, res) =>{
   try{
        const data = await OhodoTracker.find()
        res.status(200).json(data)
   }catch(err){
    res.status(400).json(err)
   }
  // const { page } = req.query  ;
  // console.log("page", page)
  // const LIMIT = 10 ;
  // const startIndex = ( Number(page)-1 ) * LIMIT;
  // try {
  //     const totalEquipment = await OhodoTracker.countDocuments({})
  //     const equipment = await OhodoTracker.find().sort({_id : -1}).limit(LIMIT).skip(startIndex);
  //     res.status(200).json({
  //       data: equipment ,
  //       currentPage : Number(page),
  //       numberOfPages: Math.ceil( totalEquipment / LIMIT ),
  //     });
  //   } catch (err) {
  //     res.status(400).json(err)
  //   }   
};


export async function getOhodoTrackerByID(req, res){  
   const { ohodoTrackerID, } = req.params ;
  try {
      const ohodoTracker = await OhodoTracker.findById(ohodoTrackerID);
      res.status(200).json({ ohodoTracker })
    } catch (err) {
      res.status(400).json(err)
    }   
  };



  
  export const getOhodoTrackerByCategory = async(req, res)=>{    
    const searchQuery = new RegExp(req.body.category, "i")
    try {
      const data = await OhodoTracker.find({ category : searchQuery});
      io.emit("postByCategory", data)
      res.status(200).json(data)
    } catch (err) {
      res.status(400).json(err)
    }   
  };
  

 
  export const updateOhodoTracker = async (req, res) =>{    
    try {
      const updated = await OhodoTracker.findByIdAndUpdate(req.params.houseTrackerID, { $set : req.body }, { new : true });
      res.status(200).json(updated)
    } catch (err) {
      res.status(400).json(err)
    }   
  };
  
  export const deleteOhodoTracker = async(req, res) =>{ 
    try {
      await OhodoTracker.findByIdAndDelete(req?.params.ohodoTrackerID);
      res.status(200).json("Post deleted")
    } catch (err) {
        res.status(400).json(err)
    }   
};