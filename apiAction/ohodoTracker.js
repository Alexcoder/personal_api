import { StopCard,  } from "../model/ohodoTracker.js";
// import { io } from "../index.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary"; 


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createHSEReport = async (req, res) =>{
  // console.log("newHSE" , req.body)
  if(!req.body.post){
    return res.status(400).json("Please enter HSE detail")
  }
  try {
      const newHSEReport = new StopCard({
        observerName        : req.bod.observerName,
        segment             : req.body.segment,
        observationDate     : req.body.observationDate,
        siteName            : req.body.siteName,
        observationTime     : req.body.observationTime,
        contractorName      : req.body.contractorName,
        observationDuration : req.body.observationDuration,
        clientName          : req.body.clientName,
      });
     const createHSEReport = await newHSEReport.save();
     res.status(200).json(createHSEReport); 
    } catch (err) {
        res.status(400).json(err)
    }   
};

export const getHSEReports = async(req, res) =>{
  const { page } = req.query  ;
  // console.log("page", page)
  const LIMIT = 10 ;
  const startIndex = ( Number(page)-1 ) * LIMIT;
  try {
      const totalStopCards = await StopCard.countDocuments({})
      const stopCards = await StopCard.find().sort({_id : -1}).limit(LIMIT).skip(startIndex);
      res.status(200).json({
        data: stopCards ,
        currentPage : Number(page),
        numberOfPages: Math.ceil( totalStopCards / LIMIT ),
      });
    } catch (err) {
      res.status(400).json(err)
    }   
};


export async function getHSEReportById(req, res){  
   const { stopCardId, } = req.params ;
  try {
      const stopCard = await StopCard.findById(stopCardId);
      res.status(200).json({ stopCard })
    } catch (err) {
      res.status(400).json(err)
    }   
  };



  
  export const getHSEReportByCategory = async(req, res)=>{    
    const searchQuery = new RegExp(req.body.category, "i")
    try {
      const data = await StopCard.find({ category : searchQuery});
      io.emit("postByCategory", data)
      res.status(200).json(data)
    } catch (err) {
      res.status(400).json(err)
    }   
  };
  

 
  export const updateHSEReport = async (req, res) =>{    
    try {
      const updated = await StopCard.findByIdAndUpdate(req.params.stopCardId, { $set : req.body }, { new : true });
      res.status(200).json(updated)
    } catch (err) {
      res.status(400).json(err)
    }   
  };
  
  export const deleteHSEReport = async(req, res) =>{   
    try {
     const removePost = await StopCard.findByIdAndDelete(req.params.stopCardId);
      res.status(200).json("Post deleted")
    } catch (err) {
        res.status(400).json(err)
    }   
};