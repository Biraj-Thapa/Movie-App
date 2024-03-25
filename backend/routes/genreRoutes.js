import express from "express";
const router = express.Router();
import {createGenre} from "../controllers/genreController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, authorizeAdmin, createGenre);

export default router;