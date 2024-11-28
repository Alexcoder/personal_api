import mongoose from "mongoose";


const houseTracker_Model = new mongoose.Schema(
    {
        month       : { type: String, },
        year        : { type: Number },
        creator     : {type: String}, 
        groupAdmins  : [{
            adminId  : { type: String },
            adminName: { type: String },
            date     : {type : String }
        }],
        groupMembers  : [{
            memberId  : { type: String },
            memberName: { type: String },
            date     : {type : String }
        }],
        individualExpense : [ {
                    creator        : { type: String },
                    username       : { type: String },
                    email          : { type: String },
                    firstName      : { type: String },
                    lastName       : { type: String },
                    requestor      : { type: String, default:"" },
                    itemId         : { type: String, default:"" },
                     
                    detail         : { type: String },
                    purpose        : { type: String,},
                    amount    : { type: Number },
                    date           : { type: String}, 
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











const validatorSchema = new mongoose.Schema({
    id        : {type: String, default: ""},
    email     : {type: String, default: ""},
    firstName : {type: String, default: ""},
    lastName  : {type: String, default: ""},
    username  : {type: String, default: ""},
    date      : {type: String, default: ""},
})

const creatorSchema = new mongoose.Schema({
    id        : {type: String, default: ""},
    email     : {type: String, default: ""},
    firstName : {type: String, default: ""},
    lastName : {type: String, default: ""},
    username : {type: String, default: ""},
    date      : {type: String, default: ""},
})




const houseTrackerV1_Model = new mongoose.Schema(
    {
        dayCreated    : { type: String, },
        monthCreated  : { type: String, },
        yearCreated   : { type: Number },
        groupCreator  : { type: String }, 
        groupName     : { type: String, required: true} ,
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
                    creator        : { type: creatorSchema, },
                    amountSpent    : { type: Number, default: 0 },
                    status: {type: String, default:"pending"},
                    validator    : { type: validatorSchema, },

        }],
        expenseList  : [ {
                    purpose        : { type: String, default:"" },
                    detail         : { type: String, default:"" },
                    amountRequired : { type : Number, default: 0}, 
                    amountArray    : [{ amount: {type: Number, default: 0}, date: {type:String, default: ""},}],
                    creator        : { type: creatorSchema, },
                    amountSpent    : { type: Number, default: 0 },
                    status: {type: String, default:"pending"},
                    validator    : { type: validatorSchema, },
                    } ],
    },
    {timestamps: true}
);

export const HouseTrackerV1 = mongoose.model("HouseTrackerV1", houseTrackerV1_Model);