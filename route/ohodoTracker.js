import express from "express";
import {
     getOhodoTrackerReports,
     getOhodoTrackerReportById, 
     getOhodoTrackerReportByCategory,
     createOhodoTrackerReport,
     updateOhodoTrackerReport,
     deleteOhodoTrackerReport
    } from "../apiAction/ohodoTracker.js";

const router = express.Router();

router.post( `/`, createOhodoTrackerReport );
router.get( `/` , getOhodoTrackerReports );
router.get( `/find/:ohodoTrackerID`, getOhodoTrackerReportByID );
router.put( `/update/:ohodoTrackerID`, updateOhodoTrackerReport );
// router.patch( `/reply/:idMainOhodoTracker`, "replyOhodoTracker" );
router.delete( `/delete/:ohodoTrackerID`, deleteOhodoTrackerReport );

export default router;
