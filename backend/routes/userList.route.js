import express from "express";
import { addToList, getMyList } from "../controllers/userList.controllers.js";

const router = express.Router();

router.post("/add", addToList); // POST /api/list/add
router.get("/:userId", getMyList); // GET /api/list/:userId

export default router;
