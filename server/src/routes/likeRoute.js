import { addLike, removeLike, listLike } from "../controllers/likeController.js";
import express from "express";
const likeRouter = express.Router();

likeRouter.post("/add", addLike);
likeRouter.get("/list", listLike);
likeRouter.post("/remove", removeLike);

export default likeRouter;
