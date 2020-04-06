"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const yargs = __importStar(require("yargs"));
const tesla_wakeup_1 = __importDefault(require("./tesla.wakeup"));
yargs.command('tesla:wakeup [user_id]', 'wakeup primary vehicle for user id', (yargs) => {
    yargs.positional('user_id', {
        describe: 'the number id for the user whose vehicle will be woken up',
    });
}, tesla_wakeup_1.default).argv;
//# sourceMappingURL=index.js.map