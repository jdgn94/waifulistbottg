"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const i18n_1 = require("i18n");
const i18n = new i18n_1.I18n({
    locales: ["en", "es"],
    defaultLocale: "en",
    directory: path_1.default.join(__dirname, "../i18n"),
});
exports.default = i18n;
