import express from "express";
import {
     getHSEReports,
     getHSEReportById, 
     getHSEReportByCategory,
     createHSEReport,
     updateHSEReport,
     deleteHSEReport
    } from "../apiAction/ohodoTracker.js";

const router = express.Router();

router.post( `/`, createHSEReport );
router.get( `/` , getHSEReports );
router.get( `/find/:HSEId/:comHSEId`, getHSEReportById );
router.put( `/update/:HSEId`, updateHSEReport );
// router.patch( `/reply/:idMainHSE`, "replyHSE" );
router.delete( `/delete/:HSEId`, deleteHSEReport );

export default router;
