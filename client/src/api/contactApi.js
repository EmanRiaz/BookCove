import api from './BaseURL'; 

export const contactApi = async (formData) => {
  try {
    const response = await api.post('/form/contact', formData);
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network error" };
  }
};

