import { useCallback, useEffect, useState } from "react";
import TableActionButton from "../core/table_action_button";
import { SelectInput, TextInput } from "../core/text_input";
import { PrimaryButton } from "../core/buttons";
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import DataTable, { TableColumn } from "react-data-table-component";
import ModalComponent from "../core/modals";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchKejuruanData } from "../../store/features/kejuruan/kejuruanAction";
import { setKejuruanData } from "../../store/features/kejuruan/kejuruanSlice";
import { ToastContainer, toast } from "react-toastify";
import { fetchPelatihanData } from "../../store/features/pelatihan/pelatihanAction";
import { setPelatihanData } from "../../store/features/pelatihan/pelatihanSlice";
import {
  CreateprasaranaProps,
  UpdateprasaranaProps,
  createPrasaranaData,
  deletePrasarana,
  fetchPrasaranaData,
  updatePrasaranaData,
} from "../../store/features/prasarana/prasaranaAction";
import { setPrasaranaData } from "../../store/features/prasarana/prasaranaSlice";

export default function PrasaranaView() {
  const dispatch = useAppDispatch();
  const prasaranaData = useAppSelector((state: any) => state.prasarana);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionMode, setActionMode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [selectedKejuruan, setSelectedKejuruan] = useState<string>();
  const [selectedKejuruanNum, setSelectedKejuruanNum] = useState<number>(0);
  const [selectedPelatihan, setSelectedPelatihan] = useState<string>();
  const [selectedPelatihanNum, setSelectedPelatihanNum] = useState<number>(0);
  const [jumlah, setJumlah] = useState<number>(0);
  const [luas, setLuas] = useState<number>(0);
  const [kapasitas, setKapasitas] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [kejuruanOptions, setKejuruanOptions] = useState([]);
  const [pelatihanOptions, setPelatihanOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState(prasaranaData.data);
  const [selectedId, setSelectedId] = useState<number>(0);

  const handleFormSubmit = async () => {
    if (actionMode === "create") {
      let data: CreateprasaranaProps = {
        name: name,
        total: jumlah.toString(),
        wide: luas.toString(),
        capacity: kapasitas.toString(),
        kejuruan_id: selectedKejuruan!.toString(),
        pelatihan_id: selectedPelatihan!.toString(),
        image: selectedImage!,
      };

      try {
        await createPrasaranaData(data).then(() => {
          fetchKejuruanDatacallback();
          fetchPelatihanDataCallback();
          fetchPrasaranaCallback();
          toggleModal("");
        });
      } catch (error: any) {
        toast.error(error);
      }
    } else if (actionMode === "update") {
      let data: UpdateprasaranaProps = {
        id: selectedId,
        name: name,
        total: jumlah.toString(),
        wide: luas.toString(),
        capacity: kapasitas.toString(),
        kejuruan_id: selectedKejuruanNum!.toString(),
        pelatihan_id: selectedPelatihanNum!.toString(),
        image: selectedImage!,
      };
      await updatePrasaranaData(data).then(() => {
        fetchKejuruanDatacallback();
        fetchPelatihanDataCallback();
        fetchPrasaranaCallback();
        toggleModal("");
      });
    }
  };

  const fetchKejuruanDatacallback = useCallback(() => {
    dispatch(fetchKejuruanData())
      .unwrap()
      .then((res: any) => {
        dispatch(setKejuruanData(res.data));
        setKejuruanOptions(res.data);
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
        setPelatihanOptions(res.data);
      })
      .catch(() => toast.error("error"));
  }, [dispatch]);

  useEffect(() => {
    fetchPelatihanDataCallback();
  }, [fetchPelatihanDataCallback]);

  const fetchPrasaranaCallback = useCallback(() => {
    dispatch(fetchPrasaranaData())
      .unwrap()
      .then((res) => {
        dispatch(setPrasaranaData(res.data));
      })
      .catch(() => toast.error("error"));
  }, [dispatch]);

  useEffect(() => {
    fetchPrasaranaCallback();
  }, [fetchPrasaranaCallback]);

  const handleKejuruanChange = (event: any) => {
    setSelectedKejuruan(event.target.value);
    setSelectedKejuruanNum(event.target.value)
  };

  const handlePelatihanChange = (event: any) => {
    setSelectedPelatihan(event.target.value);
    setSelectedKejuruanNum(event.target.value);
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedImage(file);
  };

  const toggleModal = (mode: string) => {
    if (mode === "create") {
      setSelectedKejuruan("");
      setSelectedPelatihan("");
      setSelectedKejuruanNum(0)
      setSelectedPelatihanNum(0)
      setSelectedId(0);
      setName("");
      setJumlah(0);
      setLuas(0);
      setKapasitas(0);
    }
    setActionMode(mode);
    setIsModalOpen(!isModalOpen);
  };
  
  const columns: TableColumn<{
    id: number;
    name: string;
    total: number;
    wide: number;
    capacity: number;
    kejuruan: { id: number; name: string };
    pelatihan: { id: number; name: string };
  }>[] = [
    {
      name: "Nama",
      selector: (row) => row.name,
    },
    {
      name: "Kejuruan",
      selector: (row) => row.kejuruan.name,
      center: true,
    },
    {
      name: "Pelatihan",
      selector: (row) => row.pelatihan.name,
      center: true,
    },
    {
      name: "Jumlah",
      selector: (row) => row.total,
      center: true,
    },
    {
      name: "Luas",
      selector: (row) => row.wide,
      center: true,
    },
    {
      name: "Kapasitas",
      selector: (row) => row.capacity,
      center: true,
    },
    {
      name: "Action",
      cell: (row: {
        id: number;
        name: string;
        total: number;
        wide: number;
        capacity: number;
        kejuruan: { id: number; name: string };
        pelatihan: { id: number; name: string };
      }) => (
        <TableActionButton
          id={row.id}
          onClick={() => {
            setSelectedKejuruan(row.kejuruan.name.toString());
            setSelectedPelatihan(row.pelatihan.name.toString());
            setSelectedKejuruanNum(row.kejuruan.id)
            setSelectedPelatihanNum(row.kejuruan.id)
            setSelectedId(row.id);
            setName(row.name);
            setJumlah(row.total);
            setLuas(row.wide);
            setKapasitas(row.capacity);
            toggleModal("update");
          }}
          ondelete={() => deleteData(row.id)}
        />
      ),
      center: true,
      maxWidth: "200px",
    },
  ];

  useEffect(() => {
    const filtered = prasaranaData.data.filter((item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [prasaranaData.data, searchQuery]);

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const deleteData = async (id: number) => {
    const shouldDelete = window.confirm("Yakin ingin menghapus?");
    if (shouldDelete) {
      await deletePrasarana(id).then(() => {
        fetchKejuruanDatacallback();
        fetchPelatihanDataCallback();
        fetchPrasaranaCallback();
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h1 className="mb-5">Prasarana</h1>
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
        <ModalComponent onClose={() => toggleModal("")} onSubmit={handleFormSubmit} title="Tambah Prasarana">
          <div className="mb-4">
            <div className="mb-4">
              <TextInput
                id="nama"
                type="text"
                placeholder=""
                label="Nama"
                onChange={(e) => setName(e.target.value)}
                val={name}
              />
            </div>
            <div className="mb-4">
              <SelectInput
                options={kejuruanOptions}
                id="kejuruan"
                placeholder="Pilih Kejuruan"
                label="Kejuruan"
                onChange={handleKejuruanChange}
                val={selectedKejuruan}
              />
            </div>
            <div className="mb-4">
              <SelectInput
                options={pelatihanOptions}
                id="pelatihan"
                placeholder="Pilih Pelatihan"
                label="Pelatihan"
                onChange={handlePelatihanChange}
                val={selectedPelatihan}
              />
            </div>
            <div className="mb-4 grid grid-cols-3 gap-4">
              <TextInput
                id="jumlah"
                type="text"
                placeholder=""
                label="Jumlah"
                onChange={(val) => setJumlah(parseInt(val.target.value))}
                val={jumlah.toString()}
              />
              <TextInput
                id="luas"
                type="text"
                placeholder=""
                label="Luas"
                onChange={(val) => setLuas(parseInt(val.target.value))}
                val={luas.toString()}
              />
              <TextInput
                id="kapasitas"
                type="text"
                placeholder=""
                label="Kapasitas"
                onChange={(val) => setKapasitas(parseInt(val.target.value))}
                val={kapasitas.toString()}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
                Upload File
              </label>
              <input type="file" id="fileUpload" name="image" accept=".png, .jpg, .jpeg" onChange={handleImageChange} />{" "}
            </div>
          </div>
        </ModalComponent>
      )}
      <ToastContainer />
    </div>
  );
}
