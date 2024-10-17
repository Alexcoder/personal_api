import mongoose from "mongoose";


const houseTracker_Model = new mongoose.Schema(
    {
        category : {type: String},
        purpose  : {type : String, },
        detail   : {type: String},
        amount   : {type: Number},
        date     : {type: String, default: new Date()},
    },
    {timeseries: true}
);

export const HouseTracker = mongoose.model("HouseTracker", houseTracker_Model);