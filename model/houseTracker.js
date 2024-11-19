import mongoose from "mongoose";


const houseTracker_Model = new mongoose.Schema(
    {
        month       : { type: String, },
        year        : { type: Number },
        creator     : {type: String}, 
        individualExpense : [ {
                    creator        : { type: String },
                    username       : { type: String },
                    email          : { type: String },
                    firstName      : { type: String },
                    purpose        : { type: String,},
                    detail         : { type: String },
                    lastName       : { type: String },
                    amountSpent    : { type: Number },
                    date           : {type: String}, 
                    } ],

        budget     : [
               {
                 expenseList  : [ {
                    purpose        : { type: String },
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
               }
        ] ,
    },
    {timestamps: true}
);

export const HouseTracker = mongoose.model("HouseTracker", houseTracker_Model);