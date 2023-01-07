"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRamdomIntegerNumber = (min, max) => {
    const ramdomNumber = Math.round(Math.random() * (max - min) + min);
    return ramdomNumber;
};
exports.default = { getRamdomIntegerNumber };
