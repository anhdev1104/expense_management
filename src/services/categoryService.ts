import Http from '@/helpers/http';

const http = new Http();

export const getAllCategory = async (type?: any) => {
  try {
    const data = await http.get(`/category/${type}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
