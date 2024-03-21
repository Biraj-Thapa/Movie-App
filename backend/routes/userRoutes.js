import express  from "express";
import { createUser,loginUser,logoutCurrentUser,getAllUsers} from "../controllers/userController.js";

const router= express.Router();

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser)
router.post("/logout", logoutCurrentUser)

export default router;