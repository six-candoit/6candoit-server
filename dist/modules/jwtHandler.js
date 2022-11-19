"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/modules/jwtHandler.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const dotenv = require('dotenv');
dotenv.config();
//* 받아온 userId를 담는 access token 생성
const sign = (userId) => {
    const payload = {
        userId,
    };
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
    return accessToken;
};
//* token 검사!
const verify = (token) => {
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        if (error.message === "jwt expired") {
            return constants_1.tokenType.TOKEN_EXPIRED;
        }
        else if (error.message === "invalid token") {
            return constants_1.tokenType.TOKEN_INVALID;
        }
        else {
            return constants_1.tokenType.TOKEN_INVALID;
        }
    }
    return decoded;
};
exports.default = {
    sign,
    verify,
};
//# sourceMappingURL=jwtHandler.js.map