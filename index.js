import express from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
// import { Server } from "socket.io";
// import {createServer} from "http";

import hseRoute from "./route/hse.js";
import equipmentRoute from "./route/equipment.js";

// https://abrican-api.onrender.com

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

//ROUTES
app.use("/api/hse", hseRoute);
app.use("/api/equipment", equipmentRoute);

const PORT = process.env.PORT || 8000;

function connect(){
    try{
     mongoose.connect(process.env.CONNECTION_URL)
     console.log("Alex Server Is Up")
    }
    catch(err){
        throw(err)
    }
};

app.listen(PORT, connect());