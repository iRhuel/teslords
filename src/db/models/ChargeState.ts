import Sequelize, { Model } from 'sequelize';
import { BaseAttributes } from '.';
import { TeslaChargeState } from '../../utils/Tesla';

export default interface ChargeState extends BaseAttributes, TeslaChargeState {
  charge_id: number;
}

export default class ChargeState extends Model {
  static initialize(sequelize: Sequelize.Sequelize) {
    return ChargeState.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        charge_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'charges',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        battery_heater_on: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        battery_level: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        battery_range: {
          allowNull: false,
          type: Sequelize.FLOAT,
        },
        charge_current_request: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        charge_current_request_max: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        charge_enable_request: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        charge_energy_added: {
          allowNull: false,
          type: Sequelize.FLOAT,
        },
        charge_limit_soc: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        charge_limit_soc_max: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        charge_limit_soc_min: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        charge_limit_soc_std: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        charge_miles_added_ideal: {
          allowNull: false,
          type: Sequelize.FLOAT,
        },
        charge_miles_added_rated: {
          allowNull: false,
          type: Sequelize.FLOAT,
        },
        charge_port_cold_weather_mode: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        charge_port_door_open: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        charge_port_latch: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        charge_rate: {
          allowNull: false,
          type: Sequelize.FLOAT,
        },
        charge_to_max_range: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        charger_actual_current: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        charger_phases: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        charger_pilot_current: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        charger_power: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        charger_voltage: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        charging_state: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        conn_charge_cable: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        est_battery_range: {
          allowNull: false,
          type: Sequelize.FLOAT,
        },
        fast_charger_brand: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        fast_charger_present: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        fast_charger_type: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        ideal_battery_range: {
          allowNull: false,
          type: Sequelize.FLOAT,
        },
        managed_charging_active: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        managed_charging_start_time: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        managed_charging_user_canceled: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        max_range_charge_counter: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        minutes_to_full_charge: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        not_enough_power_to_heat: {
          allowNull: true,
          type: Sequelize.BOOLEAN,
        },
        scheduled_charging_pending: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        scheduled_charging_start_time: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        time_to_full_charge: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        timestamp: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        trip_charging: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        usable_battery_level: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        user_charge_enable_request: {
          allowNull: true,
          type: Sequelize.BOOLEAN,
        },
      },
      {
        sequelize: sequelize,
        tableName: 'charge_states',
        timestamps: true,
        paranoid: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    );
  }
}
