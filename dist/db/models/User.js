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
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { APP_SECRET } = process.env;
class User extends sequelize_1.Model {
    static initialize(sequelize) {
        return User.init({
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.default.INTEGER,
            },
            email: {
                type: sequelize_1.default.STRING,
                allowNull: false,
            },
            salt: {
                allowNull: true,
                type: sequelize_1.default.TEXT,
            },
            hash: {
                allowNull: true,
                type: sequelize_1.default.TEXT,
            },
        }, {
            sequelize: sequelize,
            tableName: 'users',
            timestamps: true,
            paranoid: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        });
    }
    setPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.salt) {
                const salt = crypto_1.default.randomBytes(16).toString('hex');
                yield this.update({ salt });
            }
            const hash = crypto_1.default.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
            return this.update({ hash });
        });
    }
    validatePassword(password) {
        const hash = crypto_1.default.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return this.hash === hash;
    }
    generateJWT() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 30);
        return jsonwebtoken_1.default.sign({
            email: this.email,
            id: this.id,
            exp: Math.round(expirationDate.getTime() / 1000),
        }, APP_SECRET || 'secret');
    }
    toAuthJSON() {
        return {
            id: this.id,
            email: this.email,
            token: this.generateJWT(),
        };
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map