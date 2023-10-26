import axiosInstance from "../../../configs/axios_instance";

export interface LoginData {
  email: string;
  password: string;
}

export const loginAction = async (data: LoginData) => {
  try {
    const response = await axiosInstance.post("users/sign-in", data);
    return response;
  } catch (error: any) {
    throw error;
  }
};
