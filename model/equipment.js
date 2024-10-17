import mongoose from "mongoose";


const equipment_Model = new mongoose.Schema(
    {
        department              : {type: String},
        equipmentName           : {type : String},
        equipmentCodeName       : {type: String},
        equipmentSerialNumber   : {type: String},
        equipmentType           : {type: String},
        date                    : {type: String, default: new Date()},
    },
    {timeseries: true}
);

export const Equipment = mongoose.model("Equipment", equipment_Model);