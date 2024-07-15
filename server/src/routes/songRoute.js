import { addSong, listSong } from "../controllers/songControllers.js";
import upload from "../middleware/multer.js";
import express from "express";
const songRouter = express.Router();
songRouter.post(
  "/add",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  addSong
);
songRouter.get("/list", listSong);
export default songRouter;
