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
router.get(`/find/:houseTrackerID`, getHouseTrackerById );
router.put( `/update/:houseTrackerID`, updateHouseTracker );
// router.patch( `/reply/:idMainEquipment`, "replyEquipment" );
router.delete( `/delete/:houseTrackerID`, deleteHouseTracker );

export default router;
