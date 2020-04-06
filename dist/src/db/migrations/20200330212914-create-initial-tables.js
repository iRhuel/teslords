'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            salt: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            hash: {
                allowNull: true,
                type: Sequelize.TEXT,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
        yield queryInterface.createTable('tokens', {
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
                    model: {
                        tableName: 'users',
                    },
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
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
        yield queryInterface.createTable('vehicles', {
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'users',
                    },
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
                type: Sequelize.INTEGER,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
        yield queryInterface.createTable('charges', {
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
                    model: {
                        tableName: 'vehicles',
                    },
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
        yield queryInterface.createTable('charge_states', {
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
                    model: {
                        tableName: 'charges',
                    },
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
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.dropTable('charge_states');
        yield queryInterface.dropTable('charges');
        yield queryInterface.dropTable('vehicles');
        yield queryInterface.dropTable('tokens');
        yield queryInterface.dropTable('users');
    }),
};
//# sourceMappingURL=20200330212914-create-initial-tables.js.map