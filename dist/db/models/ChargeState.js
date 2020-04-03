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
class ChargeState extends sequelize_1.Model {
    static initialize(sequelize) {
        return ChargeState.init({
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize_1.default.INTEGER,
            },
            charge_id: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
                references: {
                    model: 'charges',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            battery_heater_on: {
                allowNull: false,
                type: sequelize_1.default.BOOLEAN,
            },
            battery_level: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            battery_range: {
                allowNull: false,
                type: sequelize_1.default.FLOAT,
            },
            charge_current_request: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            charge_current_request_max: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            charge_enable_request: {
                allowNull: false,
                type: sequelize_1.default.BOOLEAN,
            },
            charge_energy_added: {
                allowNull: false,
                type: sequelize_1.default.FLOAT,
            },
            charge_limit_soc: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            charge_limit_soc_max: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            charge_limit_soc_min: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            charge_limit_soc_std: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            charge_miles_added_ideal: {
                allowNull: false,
                type: sequelize_1.default.FLOAT,
            },
            charge_miles_added_rated: {
                allowNull: false,
                type: sequelize_1.default.FLOAT,
            },
            charge_port_cold_weather_mode: {
                allowNull: false,
                type: sequelize_1.default.BOOLEAN,
            },
            charge_port_door_open: {
                allowNull: false,
                type: sequelize_1.default.BOOLEAN,
            },
            charge_port_latch: {
                allowNull: false,
                type: sequelize_1.default.STRING,
            },
            charge_rate: {
                allowNull: false,
                type: sequelize_1.default.FLOAT,
            },
            charge_to_max_range: {
                allowNull: false,
                type: sequelize_1.default.BOOLEAN,
            },
            charger_actual_current: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            charger_phases: {
                allowNull: true,
                type: sequelize_1.default.INTEGER,
            },
            charger_pilot_current: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            charger_power: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            charger_voltage: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            charging_state: {
                allowNull: false,
                type: sequelize_1.default.STRING,
            },
            conn_charge_cable: {
                allowNull: false,
                type: sequelize_1.default.STRING,
            },
            est_battery_range: {
                allowNull: false,
                type: sequelize_1.default.FLOAT,
            },
            fast_charger_brand: {
                allowNull: false,
                type: sequelize_1.default.STRING,
            },
            fast_charger_present: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            fast_charger_type: {
                allowNull: false,
                type: sequelize_1.default.STRING,
            },
            ideal_battery_range: {
                allowNull: false,
                type: sequelize_1.default.FLOAT,
            },
            managed_charging_active: {
                allowNull: false,
                type: sequelize_1.default.BOOLEAN,
            },
            managed_charging_start_time: {
                allowNull: true,
                type: sequelize_1.default.INTEGER,
            },
            managed_charging_user_canceled: {
                allowNull: false,
                type: sequelize_1.default.BOOLEAN,
            },
            max_range_charge_counter: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            minutes_to_full_charge: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            not_enough_power_to_heat: {
                allowNull: true,
                type: sequelize_1.default.BOOLEAN,
            },
            scheduled_charging_pending: {
                allowNull: false,
                type: sequelize_1.default.BOOLEAN,
            },
            scheduled_charging_start_time: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            time_to_full_charge: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            timestamp: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            trip_charging: {
                allowNull: false,
                type: sequelize_1.default.BOOLEAN,
            },
            usable_battery_level: {
                allowNull: false,
                type: sequelize_1.default.INTEGER,
            },
            user_charge_enable_request: {
                allowNull: true,
                type: sequelize_1.default.BOOLEAN,
            },
        }, {
            sequelize: sequelize,
            tableName: 'charge_states',
            timestamps: true,
            paranoid: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        });
    }
    static associate() {
        ChargeState.belongsTo(_1.Charge, { onUpdate: 'cascade', onDelete: 'cascade' });
        _1.Charge.hasMany(ChargeState, { onUpdate: 'cascade', onDelete: 'cascade' });
    }
}
exports.default = ChargeState;
//# sourceMappingURL=ChargeState.js.map