"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = __importDefault(require("uuid"));
const winston_1 = require("../config/winston");
global.logger = winston_1.logger;
// const baseURL = '/api';
// initialization
const api = (0, express_1.default)();
// settings
api.set("port", process.env.PORT || 5000);
// middleware
api.use((0, morgan_1.default)("dev"));
api.use((0, morgan_1.default)("combined", { stream: winston_1.stream }));
api.use((0, cors_1.default)());
api.use(express_1.default.json());
api.use(express_1.default.urlencoded({ extended: false }));
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "public/uploads"),
    filename: (_, file, cb) => {
        console.log(file.path);
        cb(null, uuid_1.default.v4() + path_1.default.extname(file.originalname));
    },
});
api.use((0, multer_1.default)({ storage }).fields([
    { name: "image", maxCount: 1 },
    { name: "fav_img", maxCount: 1 },
]));
exports.default = api;
