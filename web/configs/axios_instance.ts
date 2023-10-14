import axios, { AxiosInstance } from "axios";

let headers: { [key: string]: string } = {
  "Content-Type": "application/json",
};

if (typeof window !== 'undefined') {
  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3030/api",
  headers: headers,
});

export default axiosInstance;
