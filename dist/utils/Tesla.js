"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var _a = process.env, TESLA_API_URL = _a.TESLA_API_URL, CLIENT_ID = _a.CLIENT_ID, CLIENT_SECRET = _a.CLIENT_SECRET;
var Tesla = /** @class */ (function () {
    function Tesla() {
        this.oauth = {
            password: function (email, password) {
                var url = TESLA_API_URL + "oauth/token";
                return axios_1.default.post(url, {}, {
                    headers: { 'User-Agent': 'teslords', 'Content-Type': 'application/json' },
                    params: {
                        grant_type: 'password',
                        client_id: CLIENT_ID,
                        client_secret: CLIENT_SECRET,
                        email: email,
                        password: password,
                    },
                });
            },
            token: function () { },
        };
    }
    Tesla.prototype.vehicles = function (token) {
        return axios_1.default.get(TESLA_API_URL + "api/1/vehicles", { headers: { Authorization: token } });
    };
    return Tesla;
}());
exports.default = Tesla;
//# sourceMappingURL=Tesla.js.map