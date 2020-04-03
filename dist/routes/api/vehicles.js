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
const vehicleRoutes = express_1.Router();
vehicleRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.currentUser.token;
    if (!token) {
        return res.boom.unauthorized('no access_token');
    }
    else {
        try {
            const { data } = yield utils_1.Tesla.getVehicles({ token: token.getAuthHeader() });
            const vehicles = yield req.currentUser.getVehicles();
            const intIds = vehicles.map(vehicle => vehicle.id);
            const createPromises = [];
            for (const extVehicle of data.response) {
                if (!intIds.includes(extVehicle.id)) {
                    createPromises.push(models_1.Vehicle.create(extVehicle));
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