import Sequelize, { Model, Association, HasManyGetAssociationsMixin } from 'sequelize';
import { BaseAttributes, ChargeState, User } from '.';

export default interface Charge extends BaseAttributes {
  vehicle_id: number;
  charge_state_start_id?: number;
  charge_state_end_id?: number;
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
        charge_state_start_id: {
          allowNull: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'charge_states',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        charge_state_end_id: {
          allowNull: true,
          type: Sequelize.INTEGER,
          references: {
            model: 'charge_states',
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
        name: { singular: 'charge', plural: 'charges' },
      },
    );
  }

  static associations: {
    charge_states: Association<Charge, ChargeState>;
  };

  static associate() {
    Charge.belongsTo(User, { onUpdate: 'cascade', onDelete: 'cascade', foreignKey: 'user_id' });
    User.hasMany(Charge, { onUpdate: 'cascade', onDelete: 'cascade' });
  }

  getChargeStates!: HasManyGetAssociationsMixin<ChargeState>;
}
