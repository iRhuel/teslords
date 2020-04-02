"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const api_1 = __importDefault(require("./api"));
const middleware_1 = require("../middleware");
const rootRouter = express_1.Router();
rootRouter.get('/', (req, res) => {
    res.send('status: OK');
});
rootRouter.use('/auth', auth_1.default);
rootRouter.use('/api', middleware_1.useJWTAuth, api_1.default);
exports.default = rootRouter;
//# sourceMappingURL=index.js.map