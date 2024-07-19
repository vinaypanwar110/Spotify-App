import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoute.js";
import likeRouter from "./src/routes/likeRoute.js";
import router from "./src/routes/authRoutes.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
// middlewares
app.use(express.json());
app.use(cors());

// intialising routes
app.use("/song",songRouter);
app.use("/album",albumRouter);
app.use("/like",likeRouter);
app.use("/auth",router);

app.get("/", (req, res) => res.send("API WORKING"));
app.listen(port, () => console.log(`server start at ${port}`));
