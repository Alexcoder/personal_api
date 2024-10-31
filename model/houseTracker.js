import mongoose from "mongoose";


const houseTracker_Model = new mongoose.Schema(
    {
        familyName : { type: String, },
        month      : { type: String, },
        creator    : {type: String},  
        budget     : [
               {
                purpose         : {type: String, required: true},
                detail          : {type: String, },
                amountRequired : [ {amount: {type : Number}, date: {type: Date}, }],
                amountSent : [ {amount: {type : Number}, date: {type: Date}, }],
                amountSpent     : [ {amount: {type : Number}, date: {type: Date}, }],
                date            : {type: Date, },
               }
        ] ,
    },
    {timestamps: true}
);

export const HouseTracker = mongoose.model("HouseTracker", houseTracker_Model);