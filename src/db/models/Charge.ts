import Sequelize, { Model } from 'sequelize';
import { BaseAttributes } from '.';

export default interface Charge extends BaseAttributes {
  vehicle_id: number;
}

export default class Charge extends Model {
  static initialize(sequelize: Sequelize.Sequelize) {
    return Charge.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        vehicle_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'vehicles',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
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
