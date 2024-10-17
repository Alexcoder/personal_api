import express from "express";
import {
     getOhodoTracker,
     getOhodoTrackerByID, 
     getOhodoTrackerByCategory,
     createOhodoTracker,
     updateOhodoTracker,
     deleteOhodoTracker
    } from "../apiAction/ohodoTracker.js";

const router = express.Router();

router.post( `/`, createOhodoTracker );
router.get( `/` , getOhodoTracker );
router.get( `/find/:ohodoTrackerID`, getOhodoTrackerByID );
router.put( `/update/:ohodoTrackerID`, updateOhodoTracker );
// router.patch( `/reply/:idMainOhodoTracker`, "replyOhodoTracker" );
router.delete( `/delete/:ohodoTrackerID`, deleteOhodoTracker );

export default router;
