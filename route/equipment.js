import express from "express";
import {
     getEquipment,
     getEquipmentById, 
     getEquipmentByCategory,
     createEquipment,
     updateEquipment,
     deleteEquipment
    } from "../apiAction/equipment.js";

const router = express.Router();

router.post( "/", createEquipment );
router.get("/" , getEquipment );
router.get(`/find/:EquipmentId`, getEquipmentById );
router.put( `/update/:EquipmentId`, updateEquipment );
// router.patch( `/reply/:idMainEquipment`, "replyEquipment" );
router.delete( `/delete/:equipmentID`, deleteEquipment );

export default router;
