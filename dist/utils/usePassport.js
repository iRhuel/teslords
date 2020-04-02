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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const models_1 = require("../db/models");
const { APP_SECRET } = process.env;
const getToken = (req) => {
    const { headers: { authorization }, } = req;
    const splitToken = authorization ? authorization.split(' ') : [];
    if (splitToken[0] === 'Token' || splitToken[0] === 'Bearer') {
        return splitToken[1];
    }
    else {
        return null;
    }
};
exports.default = () => {
    passport_1.default.use(new passport_local_1.default.Strategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findOne({ where: { email } });
            if (!user || !user.validatePassword(password)) {
                return done({ 'email or password': 'is invalid' });
            }
            else {
                return done(null, user);
            }
        }
        catch (err) {
            return done(err);
        }
    })));
    passport_1.default.use(new passport_jwt_1.default.Strategy({
        jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromExtractors([passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(), getToken]),
        secretOrKey: APP_SECRET || 'secret',
    }, (jwt, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findByPk(jwt.id);
            if (!user) {
                done({ user: 'Not found' });
            }
            else {
                return done(null, user);
            }
        }
        catch (err) {
            done(err);
        }
    })));
};
//# sourceMappingURL=usePassport.js.map