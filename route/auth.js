import express from "express";
import {
     fetch,
     login,
     register
    } from "../apiAction/auth.js";

const router = express.Router();

router.get("/" , fetch );
router.post( "/login", login );
router.post( "/register", register );

export default router;
