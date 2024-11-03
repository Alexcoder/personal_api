import mongoose from "mongoose";


const houseTracker_Model = new mongoose.Schema(
    {
        month      : { type: String, },
        creator    : {type: String}, 
        overhead   : {type: Number},  
        budget     : [
               {
                purpose         : {type: String, required: true},
                detail          : {type: String, },
                amount  : [ {required: {type : Number}, date: {type: String}, status: {type: String, default:"pending"}, spent:{type: Number}} ],
                amountSpent     : [ {amount: {type : Number}, date: {type: String}, }],
                date            : {type: Date, },
               }
        ] ,
    },
    {timestamps: true}
);

export const HouseTracker = mongoose.model("HouseTracker", houseTracker_Model);