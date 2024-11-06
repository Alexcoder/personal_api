import express from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
// import { Server } from "socket.io";
// import {createServer} from "http";

import authRoute from "./route/auth.js";
import ohodoRoute from "./route/ohodoTracker.js";
import houseTrackerRoute from "./route/houseTracker.js";

// https://personal-api-amc2.onrender.com

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

//ROUTES
app.use("/api/auth", authRoute);
app.use("/api/ohodoTracker", ohodoRoute);
app.use("/api/houseTracker", houseTrackerRoute);

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