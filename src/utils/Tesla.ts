import axios from 'axios';

const { TESLA_API_URL, CLIENT_ID, CLIENT_SECRET, APP_USER_AGENT } = process.env;

export default class Tesla {
  oauth = {
    password(email: string, password: string) {
      const url = `${TESLA_API_URL}oauth/token`;

      return axios.post(
        url,
        {},
        {
          headers: { 'User-Agent': APP_USER_AGENT, 'Content-Type': 'application/json' },
          params: {
            grant_type: 'password',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            email,
            password,
          },
        },
      );
    },
    token() {},
  };

  vehicles(token: string) {
    return axios.get(`${TESLA_API_URL}api/1/vehicles`, { headers: { Authorization: token } });
  }
}
