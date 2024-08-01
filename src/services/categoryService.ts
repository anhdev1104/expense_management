import Http from '@/helpers/http';

const http = new Http();

export const getAllCategory = async (type?: any) => {
  try {
    const response = await http.get(`/category/${type}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
