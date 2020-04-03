"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const _1 = require(".");
class Vehicle extends sequelize_1.Model {
    static initialize(sequelize) {
        return Vehicle.init({
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: sequelize_1.default.INTEGER,
            },
            user_id: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            vehicle_id: {
                allowNull: false,
                autoIncrement: false,
                type: sequelize_1.default.INTEGER,
            },
            vin: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            display_name: {
                allowNull: true,
                type: sequelize_1.default.STRING,
            },
            option_codes: {
                allowNull: true,
                type: sequelize_1.default.TEXT,
            },
            color: {
                allowNull: true,
                type: sequelize_1.default.STRING,
            },
            state: {
                allowNull: false,
                type: sequelize_1.default.STRING,
            },
            in_service: {
                allowNull: false,
                type: sequelize_1.default.BOOLEAN,
            },
            id_s: {
                allowNull: true,
                type: sequelize_1.default.STRING,
            },
            calendar_enabled: {
                allowNull: false,
                type: sequelize_1.default.BOOLEAN,
            },
            api_version: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            backseat_token: {
                allowNull: true,
                type: sequelize_1.default.STRING,
            },
            backseat_token_updated_at: {
                allowNull: true,
                type: sequelize_1.default.NUMBER,
            },
        }, {
            sequelize: sequelize,
            tableName: 'vehicles',
            timestamps: true,
            paranoid: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        });
    }
    static associate() {
        Vehicle.belongsTo(_1.User, { onUpdate: 'cascade', onDelete: 'cascade' });
        _1.User.hasMany(Vehicle, { onUpdate: 'cascade', onDelete: 'cascade' });
    }
}
exports.default = Vehicle;
//# sourceMappingURL=Vehicle.js.map