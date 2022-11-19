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
const constants_1 = require("../constants");
const response_1 = require("../constants/response");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ").reverse()[0]; //? Bearer ~~ 에서 토큰만 파싱
    if (!token)
        return res.status(constants_1.sc.UNAUTHORIZED).send((0, response_1.fail)(constants_1.sc.UNAUTHORIZED, constants_1.rm.EMPTY_TOKEN));
    try {
        let userId = 1;
        // if (token !== "-1") {
        //   const decoded = jwtHandler.verify(token); //? jwtHandler에서 만들어둔 verify로 토큰 검사
        //   //? 토큰 에러 분기 처리
        //   if (decoded === tokenType.TOKEN_EXPIRED)
        //     return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.EXPIRED_TOKEN));
        //   if (decoded === tokenType.TOKEN_INVALID)
        //     return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
        //   //? decode한 후 담겨있는 userId를 꺼내옴
        //   userId = (decoded as JwtPayload).userId;
        //   if (!userId) return res.status(sc.UNAUTHORIZED).send(fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
        // }
        //? 얻어낸 userId 를 Request Body 내 userId 필드에 담고, 다음 미들웨어로 넘김( next() )
        req.body.userId = userId;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(constants_1.sc.INTERNAL_SERVER_ERROR).send((0, response_1.fail)(constants_1.sc.INTERNAL_SERVER_ERROR, constants_1.rm.INTERNAL_SERVER_ERROR));
    }
});
//# sourceMappingURL=auth.js.map