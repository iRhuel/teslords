import Sequelize, { Model } from 'sequelize';
import { BaseAttributes } from '.';

export default interface Token extends BaseAttributes {
  user_id: number;
  access_token: string;
  token_type: string;
  refresh_token: string;
}

export default class Token extends Model {
  static initialize(sequelize: Sequelize.Sequelize) {
    return Token.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        access_token: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        token_type: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        refresh_token: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        expires_in: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize: sequelize,
        tableName: 'tokens',
        timestamps: true,
        paranoid: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    );
  }
}
