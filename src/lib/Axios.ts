import Config from '../config';
import axios from 'axios';
import {ApiEndpoints} from '../store/ApiEndpoints';
import {load} from '../utils/storage';
import {store} from '../store';

var state = store.getState();
store.subscribe(() => {
  // console.log("State data is");
  // console.log(store.getState());
  state = store.getState();
});
export const Axios = axios.create({
  baseURL: Config.API_URL,
});

const authRoutes: string[] = [
  ApiEndpoints.auth.login,
  ApiEndpoints.auth.register,
  ApiEndpoints.auth.verifyOtp,
  ApiEndpoints.forgotPassword.forgotPassword,
  ApiEndpoints.forgotPassword.updatePassword,
  ApiEndpoints.support.areas,
  ApiEndpoints.support.init,
  ApiEndpoints.support.getGender,
  ApiEndpoints.auth.uniqueCheck,
  ApiEndpoints.auth.resendOTP,
];

Axios.interceptors.request.use(
  async function (config) {
    config.headers = config.headers ?? {};

    if (state.auth.token != null) {
      const {lat, long} = await load(Config.USER_LOCATION);
      config.headers = {
        ...config.headers,
        language: state.auth.language,
        Authorization: `Bearer ${state.auth.token}`,
        latitude: lat,
        longitude: long,
      };
    }
    // if (
    //   !authRoutes.find(
    //     route => route === config.url || config.headers?.withToken,
    //   )
    // ) {
    //   // const { token } = await load(Config.USER_SESSION);
    // const { lat, long } = await load(Config.USER_LOCATION);

    //   if (true) {
    //     // config.headers.Authorization = `Bearer ${token}`;
    // config.headers = {
    //   ...config.headers,
    //   'language': 'en',
    //   'Authorization': `Bearer ${'token'}`,
    //   'latitude': lat,
    //   'longitude': long

    // }
    //   } else {
    // config.headers = {
    //   ...config.headers,
    //   'language': 'en',
    //   'latitude': lat,
    //   'longitude': long

    // }
    //   }
    // }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
