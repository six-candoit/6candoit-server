"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// DAO
const dao_1 = require("../dao");
//* userId로 유저 조회
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = dao_1.userDAO.getUserById(userId);
    return user;
});
const checkUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = dao_1.userDAO.getUserById(userId);
    if (user === null)
        return false;
    return true;
});
const userService = {
    getUser,
    checkUser,
};
exports.default = userService;
//# sourceMappingURL=user.js.map