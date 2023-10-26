import axiosInstance from "../../../configs/axios_instance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SocmendState } from "./socmedSlice";

export const fetchSocmedData = createAsyncThunk("socmed/fetchData", async () => {
  try {
    const res = await axiosInstance.get("/socmed/fetch");
    return res;
  } catch (error) {
    throw error;
  }
});

export const createSocmedData = async ({ facebook, twitter, instagram }: SocmendState) => {
  try {
    const response = await axiosInstance.post("/socmed/create", {
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
