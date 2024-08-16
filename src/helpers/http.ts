import { logoutAuth, refreshToken } from '@/redux/auth/authSlice';
import { store } from '@/redux/store';
import axios, { AxiosInstance } from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Http {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8080/api/v1',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.api.interceptors.request.use(
      async config => {
        const accessToken = store.getState().auth.data?.accessToken;
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        const refreshTokenz = cookies.get('refreshToken');

        if (error.response.data === 'Token không hợp lệ!' && error.response.status === 403) {
          try {
            const response = await this.api.post('/refreshToken', {
              token: refreshTokenz,
            });

            store.dispatch(refreshToken(response.data));
            this.api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

            return this.api(originalRequest);
          } catch (error) {
            store.dispatch(logoutAuth());
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get(url: string, type: string = '') {
    try {
      const response = await this.api.get(`${url}${type && `/${type}`}`);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async post(url: string, data: any) {
    try {
      const response = await this.api.post(url, data);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async put(url: string, data: any) {
    try {
      const response = await this.api.put(url, data);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  async delete(url: string, id: string) {
    try {
      const response = await this.api.delete(`${url}/${id}`);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}

export default Http;
