import { Router } from "express";
const router = Router();
import videoController from "../controllers/video.controllers.js";

const { uploadVideo, uploadMiddleware } = videoController;


router.post("/upload", uploadMiddleware, uploadVideo);

export default router;
