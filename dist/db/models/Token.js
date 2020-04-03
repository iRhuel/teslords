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
const sequelize_1 = __importStar(require("sequelize"));
const User_1 = __importDefault(require("./User"));
class Token extends sequelize_1.Model {
    static initialize(sequelize) {
        return Token.init({
            id: {
                allowNull: false,
                autoIncrement: true,
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
            access_token: {
                allowNull: false,
                type: sequelize_1.default.TEXT,
            },
            token_type: {
                allowNull: false,
                type: sequelize_1.default.STRING,
            },
            refresh_token: {
                allowNull: false,
                type: sequelize_1.default.TEXT,
            },
            expires_in: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
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
        Token.belongsTo(User_1.default, { onUpdate: 'cascade', onDelete: 'cascade' });
        User_1.default.hasOne(Token, { onUpdate: 'cascade', onDelete: 'cascade' });
    }
    getAuthHeader() {
        return `Bearer ${this.access_token}`;
    }
}
exports.default = Token;
//# sourceMappingURL=Token.js.map