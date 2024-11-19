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
                    email          : { type: String },
                    username       : { type: String },
                    amountSpent    : { type: Number },
                    date           : {type: String}, 
                    status: {type: String, default:"pending"},
                    validatorId    : { type: String } ,
                    validatorName  : { type: String } ,
                    validationDate : { type: String } ,
                    } ],
                 amountSent    : [ {
                    purpose    : { type: String, required: true},
                    detail     : { type: String },
                    amountSent : { type: Number }, 
                    creator    : { type: String },
                    firstName  : { type: String },
                    lastName   : { type: String },
                    email   : { type: String },
                    username   : { type: String },
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