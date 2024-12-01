import mongoose from "mongoose";




const validatorSchema = new mongoose.Schema({
    id        : {type: String, default: ""},
    email     : {type: String, default: ""},
    firstName : {type: String, default: ""},
    lastName  : {type: String, default: ""},
    username  : {type: String, default: ""},
    date      : {type: String, default: ""},
})




const houseTracker_Model = new mongoose.Schema(
    {
        dayCreated    : { type: String, },
        monthCreated  : { type: String, },
        yearCreated   : { type: Number },
        groupCreator  : { type: String }, 
        groupName     : { type: String,} ,
        groupAdmin : [{
                       id       : { type: String },
                       name     : { type: String },
                       email     : { type: String },
                       username     : { type: String },
                       joinDate : {type : String }
        }],
        groupMember  : [{
                    id       : { type: String },
                    name     : { type: String },
                    email     : { type: String },
                    username     : { type: String },
                    joinDate : {type : String }
        }],
        budget : [{
                    purpose        : { type: String, default:"" },
                    detail         : { type: String, default:"" },
                    amountRequired : { type : Number, default: 0}, 
                    amountArray    : [{ amount: {type: Number, default: 0}, date: {type:String, default: ""},}],
                    creator        : { type: String, },
                    email        : { type: String, },
                    firstName       : { type: String},
                    lastName        : { type: String},
                    username        : { type: String},
                    amountSpent    : { type: Number, default: 0 },
                    status: {type: String, default:"pending"},
                    validator    : { type: validatorSchema, },
                    date        : { type: String, },

        }],
        expenseList  : [ {
                    purpose        : { type: String, default:"" },
                    detail         : { type: String, default:"" },
                    amountRequired : { type : Number, default: 0}, 
                    amountArray    : [{ amount: {type: Number, default: 0}, date: {type:String, default: ""},}],
                    creator        : { type: String, },
                    email        : { type: String, },
                    firstName       : { type: String},
                    lastName        : { type: String},
                    username        : { type: String},
                    amountSpent    : { type: Number, default: 0 },
                    status: {type: String, default:"pending"},
                    validator     : { type: validatorSchema, },
                    date          : { type: String }
                    } ],
    },
    {timestamps: true}
);

export const HouseTracker = mongoose.model("HouseTracker", houseTracker_Model);