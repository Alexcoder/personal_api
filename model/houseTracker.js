import mongoose from "mongoose";


const houseTracker_Model = new mongoose.Schema(
    {
        month      : { type: String, },
        year       : { type: Number },
        creator    : {type: String}, 
        overhead   : [{amount :{type: Number}, date:{type: String}, purpose:{type: String}}],  
        budget     : [
               {
                purpose      : {type: String, required: true},
                detail       : {type: String, },
                amount       : [ {required: {type : Number}, date: {type: String}, status: {type: String, default:"pending"}, spent:{type: Number}} ],
                amountSpent  : [ {amount: {type : Number}, date: {type: String}, } ],
                date         : { type: String},
                creator      : { type: String}
               }
        ] ,
    },
    {timestamps: true}
);

export const HouseTracker = mongoose.model("HouseTracker", houseTracker_Model);