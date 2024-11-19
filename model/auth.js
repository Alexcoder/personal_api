import mongoose from "mongoose";


const auth_Model = new mongoose.Schema(
    {
        email            : { type: String, },
        username         : { type: String  },
        password         : { type: String },
        hashPassword     : { type : String }, 
        confirmPassword  : { type: String}, 
        firstName        : { type: String },  
        lastName         : { type: String },  
        followerRequest  : [{ 
            reqId  : { type: String },
            date   : { type: String },
            status : { type: String, default:"pending"} 
        }],  
        followers        : { type : Array },
        admin            : { type : Boolean, default: true}
    },
    {timestamps: true}
);

export const Auth = mongoose.model("Auth", auth_Model);