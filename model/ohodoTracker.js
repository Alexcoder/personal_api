import mongoose from "mongoose";

const ohodoTracker_Model = new mongoose.Schema(
    {
        stage           : {type : String},
        itemRequired    : {type : String},
        quantity        : {type : String},
        individualShare : {type : Number },
        amount          : {type : Number},
    },
    {timeseries: true}
);

export const OhodoTracker = mongoose.model("OhodoTracker", ohodoTracker_Model);

