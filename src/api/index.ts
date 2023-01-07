import express from "express";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import uuid from "uuid";
import { logger, stream } from "../config/winston";

global.logger = logger;
// const baseURL = '/api';

// initialization
const api = express();

// settings
api.set("port", process.env.PORT || 5000);

// middleware
api.use(morgan("dev"));
api.use(morgan("combined", { stream }));
api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (_, file, cb) => {
    console.log(file.path);
    cb(null, uuid.v4() + path.extname(file.originalname));
  },
});
api.use(
  multer({ storage }).fields([
    { name: "image", maxCount: 1 },
    { name: "fav_img", maxCount: 1 },
  ])
);

export default api;
