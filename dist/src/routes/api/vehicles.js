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
    // const token = await req.currentUser.getToken();
    // console.log('success', token);
    // return res.json({ token });
    const token = req.currentUser.Token;
    if (!token) {
        return res.boom.unauthorized('no access_token');
    }
    else {
        try {
            const { data } = yield utils_1.Tesla.getVehicles({ token: token.getAuthHeader() });
            const vehicles = yield req.currentUser.getVehicles();
            const intIds = vehicles.map((vehicle) => vehicle.id);
            const createPromises = [];
            for (const extVehicle of data.response) {
                if (!intIds.includes(extVehicle.id)) {
                    console.log(Object.assign(Object.assign({}, extVehicle), { user_id: req.currentUser.id }));
                    // createPromises.push(Vehicle.create({ ...extVehicle, user_id: req.currentUser.id }));
                }
            }
            const newVehicles = yield Promise.all(createPromises);
            return res.json(vehicles.concat(newVehicles));
        }
        catch (err) {
            return res.send(err);
        }
    }
}));
exports.default = vehicleRoutes;
//# sourceMappingURL=vehicles.js.map