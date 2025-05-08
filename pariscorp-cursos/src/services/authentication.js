import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.request.use(config => {
  if (!config.url.includes("/login")) {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = token;
  }
  return config;
});

export const login = async (username, password) => {
  try {
    const { data } = await axios.post(`${API_URL}/login`, {
      username,
      password
    });
    
    const token = `Bearer ${data.access_token}`;
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = token;
    
    return data;
    
  } catch (error) {
    const errorData = error.response?.data || { message: "Error de conexión" };
    console.error("Detalles del error:", {
      status: error.response?.status,
      error: errorData
    });
    throw new Error(errorData.message);
  }
};

export const logout = (navigate) => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    navigate?.('/login', { replace: true });
  };