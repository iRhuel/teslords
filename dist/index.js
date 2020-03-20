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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importing the dependencies
require('dotenv').config();
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var Tesla_1 = __importDefault(require("./utils/Tesla"));
var TeslaAPI = new Tesla_1.default();
console.log(process.env.TESLA_API_URL || 'noUrl');
// consts
var PORT = 3000;
// defining the Express app
var app = express_1.default();
// defining an array to work as the database (temporary solution)
var resp = 'hello world';
// adding Helmet to enhance your API's security
app.use(helmet_1.default());
// using bodyParser to parse JSON bodies into JS objects
app.use(body_parser_1.default.json());
// enabling CORS for all requests
app.use(cors_1.default());
// adding morgan to log HTTP requests
app.use(morgan_1.default('combined'));
app.post('/auth', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, resp_1, err_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                email = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email;
                password = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.password;
                if (!email || !password) {
                    res.send('no email or password!');
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, TeslaAPI.oauth.password(email, password)];
            case 2:
                resp_1 = _c.sent();
                res.send(resp_1.data);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _c.sent();
                res.send(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/vehicles', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, resp_2, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req === null || req === void 0 ? void 0 : req.headers.authorization;
                if (!token) {
                    res.send('no token!');
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log('token', token);
                return [4 /*yield*/, TeslaAPI.vehicles(token)];
            case 2:
                resp_2 = _a.sent();
                res.send(resp_2.data);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.send(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// starting the server
app.listen(PORT, function () {
    console.log("listening on port " + PORT);
});
//# sourceMappingURL=index.js.map