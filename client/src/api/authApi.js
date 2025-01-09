import api from './BaseURL'; 



export const registerApi = async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data; 
    } catch (error) {
      throw error.response ? error.response.data : { message: "Network error" };
    }
  };

  export const loginApi= async (userData) => {
    try {
      const response = await api.post('/auth/login', userData);
      return response.data; 
    } catch (error) {
      throw error; 
    }
  };
export const logoutApi = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network error" };
  }
};