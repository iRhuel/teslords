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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const Tesla_1 = __importDefault(require("../utils/Tesla"));
const models_1 = require("../db/models");
const middleware_1 = require("../middleware");
const authRoutes = express_1.Router();
/**
 * POST create new user
 */
authRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const email = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email;
    const password = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.password;
    if (!email || !password) {
        return res.status(422).send(`${email ? 'password' : 'email'} is required`);
    }
    const user = yield models_1.User.create({ email });
    yield user.setPassword(password);
    return res.status(http_status_codes_1.CREATED).json(user.toAuthJSON());
}));
/**
 * POST login user
 */
authRoutes.post('/login', middleware_1.useLocalAuth, (req, res) => {
    var _a;
    return res.json((_a = req.user) === null || _a === void 0 ? void 0 : _a.toAuthJSON());
});
// tesla auth
authRoutes.post('/', middleware_1.useJWTAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const email = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.email;
    const password = (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.password;
    try {
        const { data } = yield Tesla_1.default.auth(email, password);
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
}));
exports.default = authRoutes;
//# sourceMappingURL=auth.js.map