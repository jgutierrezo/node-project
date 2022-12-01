import express from "express";
import {
  getMovies,
  getMovie,
  updateMovieById,
  deleteMovieById,
  addNewMovie,
  getFormUI,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/ui-form", getFormUI);

router.post("/", addNewMovie);

router.get("/", getMovies);

router.get("/:id", getMovie);

router.put("/:id", updateMovieById);

router.delete("/:id", deleteMovieById);

export default router;
