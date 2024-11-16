import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '../../utils';

export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

interface ApiClientOptions extends AxiosRequestConfig {
  url: string;
  headers?: Record<string, string>;
}

export const ApiClient = async ({
  url,
  headers,
  ...config
}: ApiClientOptions) => {
  const token = getToken();
  try {
    const res = await axios({
      url: `${BASE_URL}/${url}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      ...config,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
export const GetApiClient = async ({
  url,
  headers,
  params, 
  ...config
}: ApiClientOptions): Promise<AxiosResponse> => {
  const token = getToken();
  try {
    const res = await axios({
      url: `${BASE_URL}/${url}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
        Authorization: `Bearer ${token}`,
      },
      params, 
      ...config,
    });
    return res;
  } catch (err) {
    throw err;
  }
};