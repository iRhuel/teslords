import Sequelize, { Model } from 'sequelize';
import { BaseAttributes, User } from '.';
import { TeslaVehicle } from '../../utils/Tesla';

export default interface Vehicle extends BaseAttributes, TeslaVehicle {
  user_id: number;
}

export default class Vehicle extends Model {
  static initialize(sequelize: Sequelize.Sequelize) {
    return Vehicle.init(
      {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.BIGINT,
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
        vehicle_id: {
          allowNull: false,
          autoIncrement: false,
          type: Sequelize.INTEGER,
        },
        vin: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        display_name: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        option_codes: {
          allowNull: true,
          type: Sequelize.TEXT,
        },
        color: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        state: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        in_service: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        id_s: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        calendar_enabled: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        api_version: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        backseat_token: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        backseat_token_updated_at: {
          allowNull: true,
          type: Sequelize.NUMBER,
        },
      },
      {
        sequelize: sequelize,
        tableName: 'vehicles',
        timestamps: true,
        paranoid: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    );
  }

  static associate() {
    Vehicle.belongsTo(User, { onUpdate: 'cascade', onDelete: 'cascade', foreignKey: 'user_id' });
    User.hasMany(Vehicle, { onUpdate: 'cascade', onDelete: 'cascade' });
  }
}
