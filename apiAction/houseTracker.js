import { HouseTracker, HouseTrackerV1 } from "../model/houseTracker.js";
import { Auth } from "../model/auth.js";
import dotenv from "dotenv";


dotenv.config();
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
    budget      : [ ]
   }

  try{
    // const isExisting = await HouseTrackerV1.findOne({_id: req?.params.groupId})
    // if(!isExisting){
      const foundUser = await Auth.findOne({email: req?.body.user.email});
     const newlyCreated = await new HouseTrackerV1(dataToCreate).save();
      if(foundUser){
        foundUser.group.push({
          groupId           : newlyCreated?._id,
          monthGroupCreated : newlyCreated?.monthCreated,
          yearGroupCreated  : newlyCreated?.yearCreated,
          dayGroupCreated   : newlyCreated?.dayCreated,  
        })
        await foundUser.save()
      }
      res.status(200).json("Group Created Successfully")
    // }else{
    //   return res.status(200).json("Group already exist")
    // }
  }catch(err){
    res.status(400).json(err)
  }
}
export const verifyStatusV1 = async(req, res)=>{
 console.log("createHouseTrackerV1", req?.body) 
  const  newBudget   ={
    purpose : req?.body.purpose,
    detail  : req?.body.detail,
    amountRequired : req?.body.amount,
    amountArray    : [{ amount: req?.body.amount, date: req?.body.date}],
    creator : { 
      id   : req?.body.creator, 
      email: req?.body.email, 
      firstName: req?.body.firstName,
      lastName : req?.body.lastName,
      username : req?.body.username,
      date : req?.body.date,
    },
   validator :{ }
 }
  try{
      const isExisting = await HouseTrackerV1.findOne({_id : req?.body.groupId.toString()});
      if(isExisting){
        isExisting.budget.push(newBudget)
        const updated = await isExisting.save()
        return res.status(200).json(updated)
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
      //  const existing = await HouseTracker.findOne({ month: req?.body.month, year: req?.body.year });
      //  const existing = await HouseTracker.findOne({ _id: req?.body.groupId.toString() });
       const existing = await HouseTracker.findOne({ _id: "673d980b6501517ffb7b4257" });
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
export const getHouseTrackerV1 = async(req, res) =>{
   try{
        const allGroups = await HouseTrackerV1.find()
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
  

 
  export const verifyStatus = async (req, res) =>{ 
    console.log("postId", req?.params.houseTrackerID)   
    console.log("expenseId", req?.body.expenseId)   
    try {
      const find = await HouseTracker.findOne({_id:req.params.houseTrackerID});
      if(find){
        const expenseList = find.budget.map(budget=>(
        budget.expenseList
       )).flat();
       const expenseItem = expenseList.find(item=> item._id.toString().includes(req?.body.expenseId))
      expenseItem.status = req?.body.status;
      find.individualExpense.push({
        creator  : req?.body.creator,
        username : req?.body.username,
        email    : req?.body.email,
        firstName: req?.body.firstName,
        lastName : req?.body.lastName,
        requestor: req?.body.requestor,
        itemId   : req?.body.itemId, 
        detail   : req?.body.detail,
        purpose  : req?.body.purpose,
        amount   : req?.body.amount,
        date     : req?.body.date,  
      })
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