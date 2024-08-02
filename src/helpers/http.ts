import axios, { AxiosInstance } from 'axios';

class Http {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:8080/api/v1',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (response) {
        // Do something with response data
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );
  }

  async get(url: string, type: string = '', params?: any) {
    try {
      const response = await this.api.get(`${url}/${type}`, { params });
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
}

export default Http;
