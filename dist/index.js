"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const express_boom_1 = __importDefault(require("express-boom"));
const db_1 = require("./db");
const routes_1 = __importDefault(require("./routes"));
const utils_1 = require("./utils");
const { APP_PORT, APP_SECRET } = process.env;
const app = express_1.default();
app.use(helmet_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use(morgan_1.default('combined'));
app.use(express_boom_1.default());
app.use(express_session_1.default({ secret: APP_SECRET || 'secret', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
db_1.startDB();
utils_1.usePassport();
app.use('/', routes_1.default);
app.listen(APP_PORT, () => {
    console.log(`listening on port ${APP_PORT}`);
});
//# sourceMappingURL=index.js.map