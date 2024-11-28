import express from "express";
import {
     getHouseTracker,
     getHouseTrackerById, 
     getHouseTrackerByCategory,
     createHouseTracker,
     verifyStatus,
     deleteHouseTracker,
     deleteHouseTrackerBudget,
     createHouseTrackerExpense,
     createGroup,
     verifyStatusV1,
     getHouseTrackerV1,
    } from "../apiAction/houseTracker.js";

const router = express.Router();

router.get("/" , getHouseTracker );
router.get("/v1/:creator" , getHouseTrackerV1 );
router.get(`/find/:houseTrackerID`, getHouseTrackerById );
router.post( "/", createHouseTracker );
router.put( `/verifyStatus/:houseTrackerID`, verifyStatus );
router.post( "/v1/:groupId", createGroup );
router.put( `/verifyStatus/:houseTrackerIDV1`, verifyStatusV1 );
// router.patch( `/reply/:idMainEquipment`, "replyEquipment" );
router.delete( `/delete/:houseTrackerID`, deleteHouseTracker );
router.delete( `/deleteBudget/:houseTrackerID/:budgetID`, deleteHouseTrackerBudget );

router.post( "/createRequest", createHouseTrackerExpense );
export default router;
