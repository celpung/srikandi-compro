import axiosInstance from "../../../configs/axios_instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createKejuruanData = async (name: string) => {
  try {
    const res = await axiosInstance.post("/kejuruan/create", { name: name });
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchKejuruanData = createAsyncThunk("kejuruan/fetchData", async () => {
  try {
    const res = await axiosInstance.get("/kejuruan/fetch");
    return res;
  } catch (error) {
    throw error;
  }
});

export const countKejuruanData = async() => {
  try {
    const res = await axiosInstance.get("/kejuruan/count");
    return res;
  } catch (error) {
    throw error;
  }
}

export const updateKejuruanData = async (name: string, id: number) => {
  try {
    const res = await axiosInstance.put("/kejuruan/update/" + id, { name: name });
    return res
  } catch (error) {
    throw error;
  }
};

export const deleteKejuruan = async (id: number) => {
  try {
    const res = await axiosInstance.delete("/kejuruan/delete/"+id)
    return res
  } catch (error) {
    throw error
  }
}
