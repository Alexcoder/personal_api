import { HouseTracker,  } from "../model/houseTracker.js";
// import { io } from "../index.js";
import dotenv from "dotenv";
// import { v2 as cloudinary } from "cloudinary"; 


dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

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
    creator    : req?.body.creator,  
    budget     : [
           {
             expenseList  : [ {
                   purpose         : req?.body.purpose,
                   detail          : req?.body.detail,
                   amountRequired  : req?.body.amountRequired, 
                   creator         : req?.body.creator,
                   firstName       : req?.body.firstName,
                   lastName        : req?.body.lastName,
                   email           : req?.body.email, 
                   username        : req?.body.username, 
     
                   date: req?.body.date,
                  } ],
           }
    ] ,
  };
  const updateDetail={
    expenseList  : [ {
      purpose         : req?.body.purpose,
      detail          : req?.body.detail,
      amountRequired  : req?.body.amountRequired, 
      creator         : req?.body.creator,
      firstName       : req?.body.firstName,
      lastName        : req?.body.lastName,
      email           : req?.body.email, 
      username        : req?.body.username || "",
      date: req?.body.date,
     } ],
    amountSpent     : [ ],
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
        const data = await HouseTracker.find().sort({_id: -1})
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
    console.log("postId", req?.params.houseTrackerID)   
    console.log("expenseId", req?.body.expenseId)   
    try {
      // const updated = await HouseTracker.findByIdAndUpdate(req.params.houseTrackerID, { $set : req.body }, { new : true });
      const find = await HouseTracker.findOne({_id:req.params.houseTrackerID});
      if(find){
       const expenseList = find.budget.map(budget=>(
        budget.expenseList
       )).flat();
       const expenseItem = expenseList.find(item=> item._id.toString().includes(req?.body.expenseId))
      expenseItem.status = req?.body.status
      } //
      const updated = await find.save()
      res.status(200).json(updated)
    } catch (err) {
      res.status(400).json(err)
    }   
  };
  
  export const deleteHouseTracker = async(req, res) =>{ 
    const postId = req?.params.houseTrackerID
    console.log(req.params.houseTrackerID)
    try {
        await HouseTracker.findByIdAndDelete(postId);
        res.status(200).json("Post deleted")
    } catch (err) {
        res.status(400).json(err)
    }   
};
  export const deleteHouseTrackerBudget = async(req, res) =>{ 
    const postId = req?.params.houseTrackerID
    const budgetId = req?.params.budgetID
    try {
       const updated = await HouseTracker.updateOne(
          {_id : postId},
          { $pull : { budget:{_id: budgetId}} },
          {new: true}
        );
        res.status(200).json(updated)
    } catch (err) {
        res.status(400).json(err)
    }   
};