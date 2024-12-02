import { HouseTracker } from "../model/houseTracker.js";
import { Auth } from "../model/auth.js";
import dotenv from "dotenv";


dotenv.config();
export const getAllHouseTracker=async(req, res)=>{
  try{
   const data =  await HouseTracker.find()
   res.status(200).json(data)
  }catch(err){
    console.log(err)
  }
}


export const createGroup = async(req, res)=>{
  // console.log("newGroup", req?.params.groupId)
  const dataToCreate = {
    dayCreated  : req?.body.day,
    monthCreated: req?.body.month,
    yearCreated : Number(req?.body.year),
    groupCreator: req?.body.creator, 
    groupName   : req?.body.groupName, 
    groupAdmin  : [{id : req?.body.creator, name: `${req?.body.user.firstName} ${req?.body.user.lastName}`, 
                    email : req?.body.user.email, username : req?.body.user.username, joinDate: req?.body.date}],
    groupMember : [{id : req?.body.creator, name: `${req?.body.user.firstName} ${req?.body.user.lastName}`, 
                    email : req?.body.user.email, username : req?.body.user.username, joinDate: req?.body.date}],
    budget      : [ ],
    expensenseList : [],
   }

  try{
      const foundUser = await Auth.findOne({email: req?.body.user.email});
      const newlyCreated = await new HouseTracker(dataToCreate).save();
      if(foundUser){ //Add User to Group
        foundUser.group.push({
          groupId           : newlyCreated?._id,
          monthGroupCreated : newlyCreated?.monthCreated,
          yearGroupCreated  : newlyCreated?.yearCreated,
          dayGroupCreated   : newlyCreated?.dayCreated,  
        })
        await foundUser.save() //Update User Info
        res.status(200).json("Group Created Successfully")
      // }
    }else{
      return res.status(200).json("Group already exist")
    }
  }catch(err){
    res.status(400).json(err)
  }
}

export const verifyStatus = async(req, res)=>{
 console.log("verify post.id", req?.params) 
 console.log("verify group.id", req?.body.groupId) 
  const validator = { 
    id   : req?.body.user?.creator, 
    email: req?.body.user?.email, 
    firstName: req?.body.user?.firstName,
    lastName : req?.body.user?.lastName,
    username : req?.body.user?.username,
    date : req?.body.date,
  }
  try{
      const isExisting = await HouseTracker.findOne({_id : req?.params.postId});
      if(isExisting){
       const foundExpense = isExisting?.expenseList.find(expense=> expense?._id.toString()===req?.body.expenseId)
          foundExpense.status=req?.body.status
          foundExpense.validator=validator
        const verified = await isExisting.save()
        return res.status(200).json(verified)
      }else{
        return res.status(200).json("group not found")
      }
  }catch(err){
    res.status(400).json(err)
  }
}

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
  // console.log("createTrackerExpense" , req?.body ? "arrived" : "")
  const updateDetail={
      purpose         : req?.body.purpose,
      detail          : req?.body.detail,
      amountRequired  : req?.body.amountRequired, 
      creator         : req?.body.creator,
      firstName       : req?.body.firstName,
      lastName        : req?.body.lastName,
      email           : req?.body.email, 
      username        : req?.body.username || "",
      date: req?.body.date,
      amountSpent     : 0,
     } 

  try {
       const existing = await HouseTracker.findOne({ _id: req?.body.groupId });
       if(existing){
           existing.expenseList.push(updateDetail)
           await existing.save()
          res.status(200).json(existing)
          }
    } catch(err){
        res.status(400).json(err)
    }   
};

export const getHouseTrackerByGroup = async(req, res) =>{
   try{
        const allGroups = await HouseTracker.find()
        const user = await Auth.findOne({_id: req?.params.creator})
        const grouped = {}

        for(const group of user?.group){
          console.log("user.group", user?.group.length)
          const filter = await allGroups.find(item=> item?._id.toString()===group?.groupId.toString());
          if(filter){
            grouped[group?.groupId] = {...filter}
          }
        }
// console.log("grouped", grouped)
        res.status(200).json(grouped)
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
          { $pull : { expenseList:{_id: budgetId}} },
          {new: true}
        );
        res.status(200).json(updated)
    } catch (err) {
        res.status(400).json(err)
    }   
};

export const updateExpenseList = async(req, res)=>{
  // console.log("updateOutdated",req.body)
  try{
    const group = await HouseTracker.findOne({_id: req?.params.groupId})
    if(group){
      const expenseItem = group.expenseList.find(expenseItem=> expenseItem?._id.toString()===req?.body.expenseId)
      expenseItem.amountRequired = req?.body.amountRequired
      expenseItem.detail         = req?.body.detail? req?.body.detail : expenseItem.detail
      await group.save()
      return res.status().json(group)
    }  
  }catch(err){
    console.log(err)
  }
}
