import mongoose from "mongoose";

const stopCard_Model = new mongoose.Schema(
    {
        observerName        : {type : String},
        segment             : {type: String},
        observationDate     : {type: String, default: new Date()},
        siteName            : {type: String},
        observationTime     : {type: String},
        contractorName      : {type: String},
        observationDuration : {type: String},
        clientName          : {type: String},
    },
    {timeseries: true}
);

export const StopCard = mongoose.model("StopCard", stopCard_Model);

