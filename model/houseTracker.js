import mongoose from "mongoose";


const houseTracker_Model = new mongoose.Schema(
    {
        month      : { type: String, },
        year       : { type: Number },
        creator    : {type: String}, 
        overhead   : [{amount :{type: Number}, date:{type: String}, purpose:{type: String}}],  
        budget     : [
               {
                 expenseList  : [ {
                    purpose        : { type: String, required: true},
                    detail         : { type: String },
                    amountRequired : { type : Number}, 
                    creator        : { type: String },
                    firstName      : { type: String },
                    lastName       : { type: String },
                    amountSpent    : { type: Number },
                    date: {type: String}, 
                    status: {type: String, default:"pending"}, 
                    } ],
                 amountSent    : [ {
                    purpose    : { type: String, required: true},
                    detail     : { type: String },
                    amountSent : { type: Number }, 
                    creator    : { type: String },
                    firstName  : { type: String },
                    lastName   : { type: String },
                    status     : { type: String, default:"pending"}, 
                    spent      : { type: Number },
                    date       : { type: String }, 
                    } ],
               }
        ] ,
    },
    {timestamps: true}
);

export const HouseTracker = mongoose.model("HouseTracker", houseTracker_Model);