import express from "express";
import {
     getHouseTracker,
     getHouseTrackerById, 
     getHouseTrackerByCategory,
     createHouseTracker,
     updateHouseTracker,
     deleteHouseTracker
    } from "../apiAction/houseTracker.js";

const router = express.Router();

router.post( "/", createHouseTracker );
router.get("/" , getHouseTracker );
router.get(`/find/:HouseTrackerID`, getHouseTrackerById );
router.put( `/update/:HouseTrackerID`, updateHouseTracker );
// router.patch( `/reply/:idMainEquipment`, "replyEquipment" );
router.delete( `/delete/:HouseTrackerID`, deleteHouseTracker );

export default router;
