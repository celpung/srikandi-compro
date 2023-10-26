import React, { useCallback, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ToastContainer, toast } from "react-toastify";
import { fetchPelatihanData } from "../store/features/pelatihan/pelatihanAction";
import { setPelatihanData } from "../store/features/pelatihan/pelatihanSlice";

export default function Pelatihan() {
  const dispatch = useAppDispatch();
  const pelatihanData = useAppSelector((state: any) => state.pelatihan);

  const columns: TableColumn<{
    id: number;
    name: string;
    funding: string;
    audience: number;
    kejuruan: { id: number; name: string };
    CreatedAt: string;
  }>[] = [
    {
      name: "Pelatihan",
      selector: (row) => row.name,
    },
    {
      name: "Kejuruan",
      selector: (row) => row.kejuruan.name,
      center: true,
    },
    {
      name: "Tahun",
      selector: (row) => row.CreatedAt,
      center: true,
    },
    {
      name: "Dana",
      selector: (row) => row.funding,
      center: true,
    },
    {
      name: "Peserta",
      selector: (row) => row.audience,
      center: true,
    },
  ];

  const fetchPelatihanDataCallback = useCallback(() => {
    dispatch(fetchPelatihanData())
      .unwrap()
      .then((res) => {
        dispatch(setPelatihanData(res.data));
      })
      .catch(() => toast.error("error"));
  }, [dispatch]);

  useEffect(() => {
    fetchPelatihanDataCallback();
  }, [fetchPelatihanDataCallback]);

  return (
    <div className="table-responsive">
      <DataTable
        columns={columns}
        data={pelatihanData.data}
        pagination
        paginationPerPage={3}
        paginationRowsPerPageOptions={[3]}
        striped
        dense
      />
      <ToastContainer />
    </div>
  );
}
