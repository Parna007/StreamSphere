import { Router } from "express";
const router = Router();
import { GetGroupedMovies } from "../controllers/movie.controllers.js";

router.get("/grouped", GetGroupedMovies);


export default router;
