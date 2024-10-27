import mongoose from "mongoose";


const houseTracker_Model = new mongoose.Schema(
    {
        familyName : { type: String, required: true },
        month      : { type: String, required: true },
        creator    : {type: mongoose.Schema.Types.ObjectId, required: true},  
        budget     : [
               {
                purpose         : {type: String, required: true},
                detail          : {type: String, },
                amountPresented : [ {amount: {type : Number}, date: {type: Date}, }],
                amountSpent     : [ {amount: {type : Number}, date: {type: Date}, }],
                date            : {type: Date, },
               }
        ] ,
    },
    {timestamps: true}
);

export const HouseTracker = mongoose.model("HouseTracker", houseTracker_Model);