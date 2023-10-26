import React, { useCallback, useEffect, useState } from "react";
import { SelectInput, TextInput } from "../core/text_input";
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton } from "../core/buttons";
import DataTable from "react-data-table-component";
import { TableColumn } from "react-data-table-component";
import TableActionButton from "../core/table_action_button";

import ModalComponent from "../core/modals";
import { fetchKejuruanData } from "../../store/features/kejuruan/kejuruanAction";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setKejuruanData } from "../../store/features/kejuruan/kejuruanSlice";
import { ToastContainer, toast } from "react-toastify";
import {
  createPelatihanData,
  deletePelatihan,
  fetchPelatihanData,
  updatePelatihanData,
} from "../../store/features/pelatihan/pelatihanAction";
import { setPelatihanData } from "../../store/features/pelatihan/pelatihanSlice";

export default function PelatihanView() {
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState([]);
  const pelatihanData = useAppSelector((state: any) => state.pelatihan);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionMode, setActionMode] = useState<string>("");

  const [createPelatihanName, setCreatePelatihanName] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedkejuruan, setSelectedKejuruan] = useState<number>(0);
  const [pendanaan, setPendanaan] = useState<string>("");
  const [jumlahPeserta, setJumlahPeserta] = useState<number>(0);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState(pelatihanData.data);
  const [selectedId, setSelectedId] = useState<number>(0);

  const toggleModal = (mode: string) => {
    if (mode === "create") {
      setCreatePelatihanName("");
      setSelectedValue("");
      setPendanaan("");
      setJumlahPeserta(0);
      setSelectedKejuruan(0)
    }
    setActionMode(mode);
    setIsModalOpen(!isModalOpen);
  };

  const handleSelectChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const createData = async () => {
    if (actionMode === "create") {
      const data = {
        name: createPelatihanName,
        funding: pendanaan,
        audience: jumlahPeserta,
        kejuruan: parseInt(selectedValue),
      };
      await createPelatihanData(data);
      fetchKejuruanDatacallback();
      fetchPelatihanDataCallback();
      toggleModal("");
    } else if (actionMode === "update") {
      try {
        const data = {
          id: selectedId,
          name: createPelatihanName,
          funding: pendanaan,
          audience: jumlahPeserta,
          kejuruan: selectedkejuruan,
        };

        await updatePelatihanData(data);
        fetchKejuruanDatacallback();
        fetchPelatihanDataCallback();
        toggleModal("");
      } catch (error) {
        toast("Failed");
      }
    }
  };

  const deleteData = async (id: number) => {
    const shouldDelete = window.confirm("Yakin ingin menghapus?");
    if (shouldDelete) {
      await deletePelatihan(id).then(() => {
        fetchKejuruanDatacallback();
        fetchPelatihanDataCallback();
      });
    }
  };

  const columns: TableColumn<{
    id: number;
    name: string;
    funding: string;
    audience: number;
    kejuruan: { id:number, name: string };
  }>[] = [
    {
      name: "Nama",
      selector: (row) => row.name,
      center: true,
    },
    {
      name: "Pendanaan",
      selector: (row) => row.funding,
      center: true,
    },
    {
      name: "Jumlah Peserta",
      selector: (row) => row.audience,
      center: true,
    },
    {
      name: "Kejuruan",
      selector: (row) => row.kejuruan.name,
      center: true,
    },
    {
      name: "Action",
      cell: (row: {
        id: number;
        name: string;
        funding: string;
        audience: number;
        kejuruan: { id: number; name: string };
      }) => (
        <TableActionButton
          id={row.id}
          onClick={() => {
            setSelectedId(row.id);
            setCreatePelatihanName(row.name);
            setPendanaan(row.funding);
            setJumlahPeserta(row.audience);
            setSelectedValue(row.kejuruan.name);
            setSelectedKejuruan(row.kejuruan.id);
            toggleModal("update");
          }}
          ondelete={() => deleteData(row.id)}
        />
      ),
      center: true,
      maxWidth: "200px",
    },
  ];

  const fetchKejuruanDatacallback = useCallback(() => {
    dispatch(fetchKejuruanData())
      .unwrap()
      .then((res: any) => {
        dispatch(setKejuruanData(res.data));
        setOptions(res.data);
      })
      .catch(() => toast.error("Error"));
  }, [dispatch]);

  useEffect(() => {
    fetchKejuruanDatacallback();
  }, [fetchKejuruanDatacallback]);

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

  useEffect(() => {
    const filtered = pelatihanData.data.filter((item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [pelatihanData.data, searchQuery]);

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="h-full flex flex-col">
      <h1 className="mb-5">Pelatihan</h1>
      <div className="flex justify-between w-full mb-5">
        <div className="w-1/2">
          <TextInput type="text" id="search" icon={faSearch} placeholder="cari ..." onChange={handleSearchChange} />
        </div>
        <div className="flex justify-end gap-4">
          <PrimaryButton text="Tambah Data" icon={faPlusCircle} onClick={() => toggleModal("create")} />
        </div>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10]}
          striped
          dense
        />
      </div>
      {isModalOpen && (
        <ModalComponent onClose={() => toggleModal("")} onSubmit={createData} title="Tambah Pelatihan">
          <form>
            <div className="mb-4">
              <div className="mb-4">
                <TextInput
                  id="pelatihan"
                  type="text"
                  placeholder=""
                  label="Pelatihan"
                  onChange={(val) => setCreatePelatihanName(val.target.value)}
                  val={createPelatihanName}
                />
              </div>
              <div className="mb-4">
                <SelectInput
                  id="kejuruanSelect"
                  placeholder="Pilih kejuruan"
                  label="Kejuruan"
                  options={options}
                  onChange={handleSelectChange}
                  val={selectedValue}
                />
              </div>
              <div className="mb-4">
                <TextInput
                  id="dana"
                  type="text"
                  placeholder=""
                  label="Pendanaan"
                  onChange={(val) => setPendanaan(val.target.value)}
                  val={pendanaan}
                />
              </div>
              <div className="mb-4">
                <TextInput
                  id="peserta"
                  type="text"
                  placeholder=""
                  label="Jumlah Peserta"
                  onChange={(val) => setJumlahPeserta(parseInt(val.target.value))}
                  val={jumlahPeserta.toString()}
                />
              </div>
            </div>
          </form>
        </ModalComponent>
      )}
      <ToastContainer />
    </div>
  );
}
