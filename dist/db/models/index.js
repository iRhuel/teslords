"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
const models = {};
const isModelDefinition = (val) => {
    return 'initialize' in val;
};
const initialize = (model) => {
    if (isModelDefinition(model)) {
        model.initialize(__1.default);
        models[model.name] = model;
    }
};
// import and initialize models here
const User_1 = __importDefault(require("./User"));
exports.User = User_1.default;
initialize(User_1.default);
const Vehicle_1 = __importDefault(require("./Vehicle"));
exports.Vehicle = Vehicle_1.default;
initialize(Vehicle_1.default);
const Token_1 = __importDefault(require("./Token"));
exports.Token = Token_1.default;
initialize(Token_1.default);
const Charge_1 = __importDefault(require("./Charge"));
exports.Charge = Charge_1.default;
initialize(Charge_1.default);
const ChargeState_1 = __importDefault(require("./ChargeState"));
exports.ChargeState = ChargeState_1.default;
initialize(ChargeState_1.default);
for (const model of Object.values(models)) {
    if (model.associate) {
        model.associate(__1.default);
    }
    if (model.associateBehaviors) {
        model.associateBehaviors();
    }
}
//# sourceMappingURL=index.js.map