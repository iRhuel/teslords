import Sequelize, { Model, HasOneGetAssociationMixin, Association, HasManyGetAssociationsMixin } from 'sequelize';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { BaseAttributes, Token, Vehicle, Charge } from '.';

const { APP_SECRET } = process.env;

export default interface User extends BaseAttributes {
  email: string;
  salt: string;
  hash: string;
}

export default class User extends Model {
  static initialize(sequelize: Sequelize.Sequelize) {
    return User.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        salt: {
          allowNull: true,
          type: Sequelize.TEXT,
        },
        hash: {
          allowNull: true,
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize: sequelize,
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        name: { singular: 'user', plural: 'users' },
      },
    );
  }

  static associations: {
    vehicles: Association<User, Vehicle>;
    token: Association<User, Token>;
    charges: Association<User, Charge>;
  };

  static associate(sequelize: Sequelize.Sequelize) {}

  getVehicles!: HasManyGetAssociationsMixin<Vehicle>;
  getToken!: HasOneGetAssociationMixin<Token>;
  getCharges!: HasManyGetAssociationsMixin<Charge>;

  vehicles?: Vehicle[];
  token?: Token;
  charges?: Charge[];

  async setPassword(password: string) {
    if (!this.salt) {
      const salt = crypto.randomBytes(16).toString('hex');
      await this.update({ salt });
    }

    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.update({ hash });
  }

  validatePassword(password: string) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
  }

  generateJWT() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 30);

    return jwt.sign(
      {
        email: this.email,
        id: this.id,
        exp: Math.round(expirationDate.getTime() / 1000),
      },
      APP_SECRET || 'secret',
    );
  }

  toAuthJSON() {
    return {
      id: this.id,
      email: this.email,
      token: this.generateJWT(),
    };
  }
}
