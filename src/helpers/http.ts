import axios, { AxiosInstance } from 'axios';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';

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
        const accessToken = cookies.get('accessToken');
        // const refreshToken = cookies.get('refreshToken');
        if (accessToken) {
          // const decodedToken: any = jwtDecode(accessToken);

          // const currentTime = Date.now() / 1000; // Convert to seconds
          // if (decodedToken.exp - currentTime < 30) {
          //   try {
          //     const refreshResponse = await this.api.post('/refreshToken', {
          //       token: refreshToken,
          //     });
          //     console.log('🚀 ~ Http ~ constructor ~ refreshResponse:', refreshResponse);
          //   } catch (error) {
          //     return Promise.reject(error);
          //   }
          // }

          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
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
