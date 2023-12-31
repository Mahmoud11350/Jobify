import * as dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

cloudinary.config({
  cloud_name: "fullstack-mern-developer",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const app = express();
import { connect } from "mongoose";

// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import notFound from "./middleware/notFoundError.js";
import errorHandler from "./middleware/errorHandler.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";

// pre middlewares
if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
}
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", [authMiddleware], userRoutes);
app.use("/api/v1/jobs", [authMiddleware], jobsRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// post middleware
app.use(notFound);
app.use(errorHandler);
const start = async () => {
  try {
    await connect(process.env.MONGOCLUSTER);
    app.listen(
      process.env.PORT,
      console.log(`server is running on port ${process.env.PORT}`)
    );
  } catch (error) {}
};

start();
