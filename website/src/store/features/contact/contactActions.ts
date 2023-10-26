import axiosInstance from "../../../configs/axios_instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContactData = createAsyncThunk("contact/fetchData", async () => {
  try {
    const res = await axiosInstance.get("/contact/fetch")
    return res;

  } catch (error) {
    throw error;
  }
});

interface createContactInterface {
  title: string;
  content: string;
}

export const createContactData = async ({ title, content }: createContactInterface) => {
  try {
    const response = await axiosInstance.post("/contact/create", { title: title, content: content });
    return response.data.data[0];
  } catch (error) {
    throw error;
  }
};
