"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const { TESLA_API_URL, CLIENT_ID, CLIENT_SECRET, APP_USER_AGENT } = process.env;
const teslaAPIEndpts = ['vehicles'];
class Tesla {
    getConfig(request) {
        return {
            headers: { Authorization: request.token },
            data: request.payload,
        };
    }
    auth(email, password, grantType = 'password') {
        const url = `${TESLA_API_URL}oauth/token`;
        return axios_1.default.post(url, null, {
            headers: { 'User-Agent': APP_USER_AGENT, 'Content-Type': 'application/json' },
            params: {
                grant_type: grantType,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                email,
                password,
            },
        });
    }
    getVehicles(config) {
        return axios_1.default.get(`${TESLA_API_URL}api/1/vehicles`, this.getConfig(config));
    }
    getChargeStates(id, config) {
        return axios_1.default.get(`${TESLA_API_URL}api/1/vehicles/${id}/data_request/charge_state`, this.getConfig(config));
    }
    wakeUpVehicle(config, id) {
        return axios_1.default.post(`${TESLA_API_URL}api/1/vehicles/${id}/wake_up`, this.getConfig(config));
    }
}
exports.default = new Tesla();
//# sourceMappingURL=Tesla.js.map