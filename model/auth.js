import mongoose from "mongoose";


const auth_Model = new mongoose.Schema(
    {
        email            : { type: String, },
        password         : { type: Number },
        confirmPassword  : {type: String}, 
        firstName        : { type: String },  
        lastName         : { type: String },  
        followers        : {type : Array },
        admin            : {type : Boolean, default: true}
    },
    {timestamps: true}
);

export const Auth = mongoose.model("Auth", auth_Model);