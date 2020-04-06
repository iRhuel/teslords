import axios, { AxiosRequestConfig } from 'axios';

const { TESLA_API_URL, CLIENT_ID, CLIENT_SECRET, APP_USER_AGENT } = process.env;

const teslaAPIEndpts = <const>['vehicles'];

type TeslaAPIEndpt = typeof teslaAPIEndpts[number];

type TeslaAPIRequest = {
  token: string;
  payload?: any;
};

export interface TeslaVehicle {
  id: number;
  vehicle_id: number;
  vin: string;
  display_name: string;
  option_codes: string;
  color: string | null;
  state: 'online' | string;
  in_service: boolean;
  id_s: string | null;
  calendar_enabled: boolean;
  api_version: number;
  backseat_token: string | null;
  backseat_token_updated_at: string | null;
}

export interface TeslaChargeState {
  battery_heater_on: boolean;
  battery_level: number;
  battery_range: number;
  charge_current_request: number;
  charge_current_request_max: number;
  charge_enable_request: true;
  charge_energy_added: number;
  charge_limit_soc: number;
  charge_limit_soc_max: number;
  charge_limit_soc_min: number;
  charge_limit_soc_std: number;
  charge_miles_added_ideal: number;
  charge_miles_added_rated: number;
  charge_port_cold_weather_mode: boolean;
  charge_port_door_open: boolean;
  charge_port_latch: 'Engaged' | string;
  charge_rate: number;
  charge_to_max_range: boolean;
  charger_actual_current: number;
  charger_phases: number | null;
  charger_pilot_current: number;
  charger_power: number;
  charger_voltage: number;
  charging_state: 'Connected' | 'Disconnected' | 'Complete' | string;
  conn_charge_cable: string;
  est_battery_range: number;
  fast_charger_brand: string;
  fast_charger_present: number;
  fast_charger_type: string;
  ideal_battery_range: number;
  managed_charging_active: boolean;
  managed_charging_start_time: number | null;
  managed_charging_user_canceled: boolean;
  max_range_charge_counter: number;
  minutes_to_full_charge: number;
  not_enough_power_to_heat: boolean | null;
  scheduled_charging_pending: boolean;
  scheduled_charging_start_time: number | null;
  time_to_full_charge: number;
  timestamp: number;
  trip_charging: boolean;
  usable_battery_level: number;
  user_charge_enable_request: boolean | null;
}

interface AuthResp {
  access_token: string;
  token_type: 'bearer' | string;
  expires_in: number;
  refresh_token: string;
  created_at: number;
}
interface VehiclesResp {
  response: TeslaVehicle[];
  count: number;
}
interface ChargeStateResp {
  response: TeslaChargeState;
}

class Tesla {
  getConfig(request: TeslaAPIRequest): AxiosRequestConfig {
    return {
      headers: { Authorization: request.token },
      data: request.payload,
    };
  }

  auth(email: string, password: string, grantType: 'password' | 'refresh_token' = 'password') {
    const url = `${TESLA_API_URL}oauth/token`;

    return axios.post<AuthResp>(url, null, {
      headers: { 'User-Agent': APP_USER_AGENT, 'Content-Type': 'application/json' },
      params: {
        grant_type: grantType,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        email,
        password,
      },
    });
  }

  getVehicles(config: TeslaAPIRequest) {
    return axios.get<VehiclesResp>(`${TESLA_API_URL}api/1/vehicles`, this.getConfig(config));
  }

  getChargeStates(id: string, config: TeslaAPIRequest) {
    return axios.get<ChargeStateResp>(
      `${TESLA_API_URL}api/1/vehicles/${id}/data_request/charge_state`,
      this.getConfig(config),
    );
  }

  wakeUpVehicle(config: TeslaAPIRequest, id: number | string) {
    return axios.post(`${TESLA_API_URL}api/1/vehicles/${id}/wake_up`, this.getConfig(config));
  }
}

export default new Tesla();
