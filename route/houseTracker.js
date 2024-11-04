import express from "express";
import {
     getHouseTracker,
     getHouseTrackerById, 
     getHouseTrackerByCategory,
     createHouseTracker,
     updateHouseTracker,
     deleteHouseTracker,
     deleteHouseTrackerBudget,
     createHouseTrackerExpense,
    } from "../apiAction/houseTracker.js";

const router = express.Router();

router.get("/" , getHouseTracker );
router.get(`/find/:houseTrackerID`, getHouseTrackerById );
router.post( "/", createHouseTracker );
router.put( `/update/:houseTrackerID`, updateHouseTracker );
// router.patch( `/reply/:idMainEquipment`, "replyEquipment" );
router.delete( `/delete/:houseTrackerID`, deleteHouseTracker );
router.delete( `/deleteBudget/:houseTrackerID/:budgetID`, deleteHouseTrackerBudget );

router.post( "/createRequest", createHouseTrackerExpense );
export default router;
