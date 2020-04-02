"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
exports.useLocalAuth = (req, res, next) => {
    return passport_1.default.authenticate('local', { session: false }, (err, user) => {
        var _a, _b;
        if (err) {
            return next(err);
        }
        const email = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email;
        const password = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.password;
        if (!email || !password) {
            return res.status(422).send(`${email ? 'password' : 'email'} is required`);
        }
        if (user) {
            req.user = user;
            return next();
        }
        return res.status(401);
    })(req, res, next);
};
exports.useJWTAuth = (req, res, next) => {
    return passport_1.default.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (user) {
            req.user = user;
            return next();
        }
        return res.status(401);
    })(req, res, next);
};
//# sourceMappingURL=requireAuth.js.map