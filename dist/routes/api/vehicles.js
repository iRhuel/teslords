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
const vehicleRoutes = express_1.Router();
vehicleRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { data } = yield utils_1.Tesla.getVehicles({ token: (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '' });
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }
}));
exports.default = vehicleRoutes;
//# sourceMappingURL=vehicles.js.map