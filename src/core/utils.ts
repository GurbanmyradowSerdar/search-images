import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://api.pexels.com/v1/",
  headers: {
    Authorization: import.meta.env.VITE_PEXEL_API_KEY,
  },
});
