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
  // console.log("newHouseTracker" , req?.body)
  const newHouseTrackerReport = {
    purpose  : req.body.purpose,
    detail   : req.body.detail,
    amount   : req.body.amount,
    date     : req.body.date,
    month     : req.body.month,
  };
  try {
    const created = await new HouseTracker(newHouseTrackerReport).save();
     res.status(200).json(created); 
    } catch (err) {
        res.status(400).json(err)
    }   
};

export const createHouseTrackerExpense = async(req, res) =>{
  console.log("createTrackerExpense" , req?.body ? "arrived" : "")
  const newHouseTrackerReport = {
    familyName : "",
    month  : req?.body.month,
    year  : req?.body.year,
    creator    : "123454",  
    budget     : [
           {
            purpose         : req?.body.purpose,
            detail          : req?.body.detail,
            amount  : [ {required: req?.body.amountRequired, date: req?.body.date} ],
            amountSpent     : [ ],
            date            : req?.body.date,
           }
    ] ,
  };
  const updateDetail={
    purpose         : req?.body.purpose,
    detail          : req?.body.detail,
    amount  : [ {required: req?.body.amountRequired, date: req?.body?.date} ],
    amountSpent     : [ ],
    date            : req?.body?.date,
  };

  try {
       const existing = await HouseTracker.findOne({ month: req?.body.month, year: req?.body.year });
       if(!existing){
          const createNew = await new HouseTracker(newHouseTrackerReport).save()
          res.status(200).json(createNew)
          }
          else{
         const updated = await HouseTracker.updateOne(
           { month: req?.body.month},
           { $push : {budget: updateDetail}, },
            {new:true} 
          )
           res.status(200).json(updated); 
       }
    } catch(err){
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
   const { houseTrackerID, } = req.params ;
  try {
      const houseTracker = await HouseTracker.findById(houseTrackerID);
      res.status(200).json({ houseTracker })
    } catch (err) {
      res.status(400).json(err)
    }   
  };



  
  export const getHouseTrackerByCategory = async(req, res)=>{    
    const searchQuery = new RegExp(req.body.category, "i")
    try {
      const data = await HouseTracker.find({ category : searchQuery});
      io.emit("postByCategory", data)
      res.status(200).json(data)
    } catch (err) {
      res.status(400).json(err)
    }   
  };
  

 
  export const updateHouseTracker = async (req, res) =>{    
    try {
      const updated = await HouseTracker.findByIdAndUpdate(req.params.houseTrackerID, { $set : req.body }, { new : true });
      res.status(200).json(updated)
    } catch (err) {
      res.status(400).json(err)
    }   
  };
  
  export const deleteHouseTracker = async(req, res) =>{ 
    const postId = req?.params.houseTrackerID.id
    const budgetId = req?.params.houseTrackerID.budgetId
    console.log(req.params.houseTrackerID)
    try {
        await HouseTracker.findByIdAndDelete(postId);
        res.status(200).json("Post deleted")
    } catch (err) {
        res.status(400).json(err)
    }   
};