import axiosInstance from "../../../configs/axios_instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface CreatePeralatanProps {
  id?: number;
  name: string;
  total: string;
  kejuruan_id: string;
  image: File;
}

export const createPeralatanData = async (data: CreatePeralatanProps) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("total", data.total);
    formData.append("kejuruan_id", data.kejuruan_id);
    formData.append("image", data.image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axiosInstance.post("/peralatan/create", formData, config);
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchPeralatanData = createAsyncThunk("peralatan/fetchData", async () => {
  try {
    const res = await axiosInstance.get("/peralatan/fetch");
    return res;
  } catch (error) {
    throw error;
  }
});

export const updatePeralatanData = async (data: CreatePeralatanProps) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("total", data.total);
    formData.append("kejuruan_id", data.kejuruan_id);
    formData.append("image", data.image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axiosInstance.put("/peralatan/update/" + data.id, formData, config);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deletePeralatan = async (id: number) => {
  try {
    const res = await axiosInstance.delete("/peralatan/delete/" + id);
    return res;
  } catch (error) {
    throw error;
  }
};

export const countPeralatan = async () => {
  try {
    const res = await axiosInstance.get("/peralatan/count");
    return res;
  } catch (error) {
    throw error;
  }
};
