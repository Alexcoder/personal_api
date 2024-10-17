import express from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
// import { Server } from "socket.io";
// import {createServer} from "http";

import hseRoute from "./route/ohodoTracker.js";
import equipmentRoute from "./route/houseTracker.js";

// https://personal-api-amc2.onrender.com

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

//ROUTES
app.use("/api/ohodoTracker", hseRoute);
app.use("/api/houseTracker", equipmentRoute);

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