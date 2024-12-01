import express from "express";
import {
     fetchOne,
     fetchAll,
     login,
     register,
     addUserToGroup,
    } from "../apiAction/auth.js";

const router = express.Router();

router.get("/" , fetchAll );
router.post( "/login", login );
router.post( "/register", register );
router.put( "/addUserToGroup/:userId", addUserToGroup );
router.get( "/fetchOneUser/:userId", fetchOne );

export default router;
