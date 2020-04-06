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
const utils_1 = require("../src/utils");
const models_1 = require("../src/db/models");
exports.default = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findByPk(args.user_id, { include: [models_1.Token, models_1.Vehicle] });
    if (!user) {
        throw new Error(`No user found for id ${args.user_id}`);
    }
    else if (!user.Token) {
        throw new Error(`No token for user ${args.user_id}`);
    }
    else if (!user.Vehicles) {
        throw new Error(`No vehicle for user ${args.user_id}`);
    }
    else {
        try {
            const requestConfig = { token: user.Token.access_token };
            const resp = yield utils_1.Tesla.wakeUpVehicle(requestConfig, user.Vehicles[0].id);
            console.log('GOOD!', resp.data);
        }
        catch (err) {
            console.log('BAD!', err.message);
        }
    }
});
//# sourceMappingURL=tesla.wakeup.js.map