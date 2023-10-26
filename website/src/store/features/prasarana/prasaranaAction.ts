import axiosInstance from "../../../configs/axios_instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface CreateprasaranaProps {
  name: string;
  total: string;
  wide: string;
  capacity: string;
  kejuruan_id: string;
  pelatihan_id: string;
  image: File;
}

export const createPrasaranaData = async (data: CreateprasaranaProps) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("total", data.total);
    formData.append("wide", data.wide);
    formData.append("capacity", data.capacity);
    formData.append("kejuruan_id", data.kejuruan_id);
    formData.append("pelatihan_id", data.pelatihan_id);
    formData.append("image", data.image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axiosInstance.post("/prasarana/create", formData, config);
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchPrasaranaData = createAsyncThunk("prasarana/fetchData", async () => {
  try {
    const res = await axiosInstance.get("/prasarana/fetch");
    return res;
  } catch (error) {
    throw error;
  }
});

export interface UpdateprasaranaProps {
  id: number;
  name: string;
  total: string;
  wide: string;
  capacity: string;
  kejuruan_id: string;
  pelatihan_id: string;
  image: File | null;
}

export const updatePrasaranaData = async (data: UpdateprasaranaProps) => {
  console.log(data);
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("total", data.total);
    formData.append("wide", data.wide);
    formData.append("capacity", data.capacity);
    formData.append("kejuruan_id", data.kejuruan_id);
    formData.append("pelatihan_id", data.pelatihan_id);
    formData.append("image", data.image!);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axiosInstance.put("/prasarana/update/" + data.id, formData, config);
    return res;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const deletePrasarana = async (id: number) => {
  try {
    const res = await axiosInstance.delete("/prasarana/delete/"+id)
    return res
  } catch (error) {
    throw error
  }
}

export const countPrasarana = async () => {
  try {
    const res = await axiosInstance.get("/prasarana/count")
    return res
  } catch (error) {
    throw error
  }
}
