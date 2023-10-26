import axiosInstance from "../../../configs/axios_instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAboutData = createAsyncThunk("about/fetchData", async () => {
  try {
    const res = await axiosInstance.get("/about/fetch")
    return res;

  } catch (error) {
    throw error;
  }
});

// export const fetchAboutData = async () => {
//  const res =  await axiosInstance.get("/about/fetch");
//  return res
// };

interface createAboutInterface {
  title: string;
  content: string;
}

export const createAboutData = async ({ title, content }: createAboutInterface) => {
  try {
    const response = await axiosInstance.post("/about/create", { title: title, content: content });
    return response.data.data[0];
  } catch (error) {
    throw error;
  }
};
