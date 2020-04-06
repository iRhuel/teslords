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
const express_1 = require("express");
const utils_1 = require("../../utils");
const models_1 = require("../../db/models");
const tokenRoutes = express_1.Router();
tokenRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const email = (_a = req.body) === null || _a === void 0 ? void 0 : _a.email;
    const password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
    if (!email || !password) {
        return res.boom.badData(`${!email ? 'email' : 'password'} is required`);
    }
    try {
        const { data } = yield utils_1.Tesla.auth(email, password);
        const token = yield models_1.Token.create(Object.assign(Object.assign({}, data), { created_at: new Date(data.created_at), user_id: req.currentUser.id }));
        return res.json(token.toJSON());
    }
    catch (err) {
        return res.boom.badImplementation(err.message);
    }
}));
tokenRoutes.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.currentUser.Token) {
        return res.boom.badRequest('no access_token');
    }
    else {
        try {
            yield req.currentUser.Token.destroy();
            return res.status(204).send();
        }
        catch (err) {
            return res.send(err);
        }
    }
}));
exports.default = tokenRoutes;
//# sourceMappingURL=token.js.map