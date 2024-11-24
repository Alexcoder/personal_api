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
     createHouseTrackerGroup,
     updateHouseTrackerV1Budget,
     getHouseTrackerV1,
    } from "../apiAction/houseTracker.js";

const router = express.Router();

router.get("/" , getHouseTracker );
router.get("/v1/:creator" , getHouseTrackerV1 );
router.get(`/find/:houseTrackerID`, getHouseTrackerById );
router.post( "/", createHouseTracker );
router.put( `/update/:houseTrackerID`, updateHouseTracker );
router.post( "/v1/:groupId", createHouseTrackerGroup );
router.put( `/update/:houseTrackerIDV1`, updateHouseTrackerV1Budget );
// router.patch( `/reply/:idMainEquipment`, "replyEquipment" );
router.delete( `/delete/:houseTrackerID`, deleteHouseTracker );
router.delete( `/deleteBudget/:houseTrackerID/:budgetID`, deleteHouseTrackerBudget );

router.post( "/createRequest", createHouseTrackerExpense );
export default router;
