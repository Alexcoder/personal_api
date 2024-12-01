import express from "express";
import {
     getHouseTrackerById, 
     createHouseTracker,
     deleteHouseTracker,
     deleteHouseTrackerBudget,
     createHouseTrackerExpense,
     createGroup,
     verifyStatus,
     getHouseTrackerByGroup,
     getAllHouseTracker,

     updateOutdated,
    } from "../apiAction/houseTracker.js";

const router = express.Router();

router.get("/" , getAllHouseTracker );
router.get("/v1/:creator" , getHouseTrackerByGroup );
router.get(`/find/:houseTrackerID`, getHouseTrackerById );
router.post( "/", createHouseTracker );
router.post( "/createGroup/:groupId", createGroup );
router.put( `/verifyStatus/:houseTrackerID`, verifyStatus );
// router.patch( `/reply/:idMainEquipment`, "replyEquipment" );
router.delete( `/delete/:houseTrackerID`, deleteHouseTracker );
router.delete( `/deleteBudget/:houseTrackerID/:budgetID`, deleteHouseTrackerBudget );

router.post( "/createRequest", createHouseTrackerExpense );

router.put( "/updateOutdated", updateOutdated );
export default router;
