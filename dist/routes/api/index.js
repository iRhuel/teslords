"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicles_1 = __importDefault(require("./vehicles"));
const token_1 = __importDefault(require("./token"));
const apiRoutes = express_1.Router();
apiRoutes.use('/vehicles', vehicles_1.default);
apiRoutes.use('/token', token_1.default);
exports.default = apiRoutes;
//# sourceMappingURL=index.js.map