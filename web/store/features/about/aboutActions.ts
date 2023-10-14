"use client";

import axiosInstance from "@/configs/axios_instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAboutData = createAsyncThunk("about/fetchData", async () => {
  try {
    const response = await axiosInstance.get("/about");
    return response.data.data[0];
  } catch (error) {
    throw error;
  }
});

interface createAboutInterface {
  title: string;
  content: string;
}

export const createAboutData = async ({ title, content }: createAboutInterface) => {
  try {
    alert(title)
    // const response = await axiosInstance.post("/admin/about", { title, content });
    // if (response.status === 200) {
    //   return response.data;
    // }
  } catch (error) {
    throw error;
  }
};
