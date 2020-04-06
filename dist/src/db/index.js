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
const sequelize_1 = require("sequelize");
const config_js_1 = __importDefault(require("./config.js"));
const dbConfig = config_js_1.default[process.env.NODE_ENV || 'development'];
const db = new sequelize_1.Sequelize(Object.assign(Object.assign({}, dbConfig), { pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    } }));
exports.startDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.authenticate();
        if (process.env.SEQUELIZE_SYNC) {
            console.log('executing sequelize sync');
            yield db.sync();
        }
        if (process.env.NODE_ENV !== 'test') {
            console.log('Database connection has been established successfully.');
        }
    }
    catch (err) {
        console.error('Unable to connect to the database:', err.message);
        process.exit(1);
    }
});
exports.default = db;
//# sourceMappingURL=index.js.map