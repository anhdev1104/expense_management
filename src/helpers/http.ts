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
  }

  async get(url: string, params?: any) {
    try {
      const response = await this.api.get(url, { params });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}

export default Http;
