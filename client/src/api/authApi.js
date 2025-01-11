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
// Get User Info API
/*

export const getuserInfoApi = async (userId, token) => {
  try {
    const response = await api.get(`/auth/getuserInfo/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token for authentication
      },
    });
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network error' };
  }
};
*/
export const getUserInfo = async (userId, token) => {
  try {
    const headers = {
      userId,
      authorization: `Bearer ${token}`,
    };

    const response = await api.get(`/auth/getuserInfo/${userId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw error; 
  }
};