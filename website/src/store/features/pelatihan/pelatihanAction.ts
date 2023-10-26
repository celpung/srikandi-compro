import axiosInstance from "../../../configs/axios_instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface CreatePelatihanProps {
  name: string;
  funding: string;
  audience: number;
  kejuruan: number;
}

export const createPelatihanData = async ({ name, funding, audience, kejuruan }: CreatePelatihanProps) => {
  try {
    const res = await axiosInstance.post("/pelatihan/create", {
      name: name,
      funding: funding,
      audience: audience,
      kejuruan_id: kejuruan,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchPelatihanData = createAsyncThunk("pelatihan/fetchData", async () => {
  try {
    const res = await axiosInstance.get("/pelatihan/fetch");
    return res;
  } catch (error) {
    throw error;
  }
});

interface updatePelatihanProps {
  id: number,
  name: string;
  funding: string;
  audience: number;
  kejuruan: number;
}

export const updatePelatihanData = async ( {id, name, funding, audience, kejuruan }: updatePelatihanProps) => {
  try {
    const res = await axiosInstance.put("/pelatihan/update/" + id, {
      name: name,
      funding: funding,
      audience: audience,
      kejuruan_id: kejuruan,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const deletePelatihan = async (id: number) => {
  try {
    const res = await axiosInstance.delete("/pelatihan/delete/"+id)
    return res
  } catch (error) {
    throw error
  }
}

export const countPelatihan = async () => {
  try {
    const res = await axiosInstance.get("/pelatihan/count")
    return res
  } catch (error) {
    throw error
  }
}
