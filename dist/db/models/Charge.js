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
class Charge extends sequelize_1.Model {
    static initialize(sequelize) {
        return Charge.init({
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.default.INTEGER,
            },
            vehicle_id: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
                references: {
                    model: 'vehicles',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
        }, {
            sequelize: sequelize,
            tableName: 'tokens',
            timestamps: true,
            paranoid: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        });
    }
    static associate() {
        Charge.belongsTo(_1.User, { onUpdate: 'cascade', onDelete: 'cascade' });
        _1.User.hasMany(Charge, { onUpdate: 'cascade', onDelete: 'cascade' });
    }
}
exports.default = Charge;
//# sourceMappingURL=Charge.js.map