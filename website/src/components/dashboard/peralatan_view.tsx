import { useCallback, useEffect, useState } from "react";
import TableActionButton from "../core/table_action_button";
import { SelectInput, TextInput } from "../core/text_input";
import { PrimaryButton } from "../core/buttons";
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import DataTable, { TableColumn } from "react-data-table-component";
import ModalComponent from "../core/modals";
import { fetchKejuruanData } from "../../store/features/kejuruan/kejuruanAction";
import { setKejuruanData } from "../../store/features/kejuruan/kejuruanSlice";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  CreatePeralatanProps,
  createPeralatanData,
  deletePeralatan,
  fetchPeralatanData,
  updatePeralatanData,
} from "../../store/features/peralatan/peralatanAction";
import { setPeralatanData } from "../../store/features/peralatan/peralatanSlice";

export default function PeralatanView() {
  const dispatch = useAppDispatch();
  const peralatanData = useAppSelector((state: any) => state.peralatan);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionMode, setActionMode] = useState<string>("");
  const [kejuruanOptions, setKejuruanOptions] = useState([]);
  const [selectedKejuruan, setSelectedKejuruan] = useState<string>();
  const [selectedKejuruanNum, setSelectedKejuruanNum] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState(peralatanData.data);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedId, setSelectedId] = useState<number>(0);

  const columns: TableColumn<{
    id: number;
    name: string;
    total: number;
    kejuruan: { id: number; name: string };
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
      name: "Jumlah",
      selector: (row) => row.total,
      center: true,
    },
    {
      name: "Action",
      cell: (row: { id: number; name: string; total: number; kejuruan: { id: number; name: string } }) => (
        <TableActionButton
          id={row.id}
          onClick={() => {
            setSelectedKejuruan(row.kejuruan.name.toString());
            setSelectedKejuruanNum(row.kejuruan.id);
            setName(row.name);
            setTotal(row.total);
            setSelectedId(row.id);
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
    const filtered = peralatanData.data.filter((item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [peralatanData.data, searchQuery]);

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
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

  const handleKejuruanChange = (event: any) => {
    setSelectedKejuruan(event.target.value);
    setSelectedKejuruanNum(event.target.value);
  };

  const fetchPeralatanDatacallback = useCallback(() => {
    dispatch(fetchPeralatanData())
      .unwrap()
      .then((res: any) => {
        dispatch(setPeralatanData(res.data));
        setKejuruanOptions(res.data);
      })
      .catch(() => toast.error("Error"));
  }, [dispatch]);

  useEffect(() => {
    fetchPeralatanDatacallback();
  }, [fetchPeralatanDatacallback]);

  const toggleModal = (mode: string) => {
    if (mode === "create") {
      setName("");
      setTotal(0);
      setSelectedKejuruan("");
      setSelectedKejuruanNum(0);
    }
    setActionMode(mode);
    setIsModalOpen(!isModalOpen);
  };

  const handleFormSubmit = async () => {
    if (actionMode === "create") {
      try {
        let data: CreatePeralatanProps = {
          name: name,
          total: total.toString(),
          kejuruan_id: selectedKejuruanNum.toString(),
          image: selectedImage!,
        };
        await createPeralatanData(data).then(() => {
          fetchPeralatanDatacallback();
          toggleModal("");
        });
      } catch (error) {
        toast.error("Failed");
      }
    } else if (actionMode === "update") {
      let data: CreatePeralatanProps = {
        id: selectedId,
        name: name,
        total: total.toString(),
        kejuruan_id: selectedKejuruanNum.toString(),
        image: selectedImage!,
      };

      try {
        await updatePeralatanData(data).then(() => {
          fetchPeralatanDatacallback();
          toggleModal("");
        });
      } catch (error) {
        toast.error("Failed");
      }
    }
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedImage(file);
  };

  const deleteData = async (id: number) => {
    const shouldDelete = window.confirm("Yakin ingin menghapus?");
    if (shouldDelete) {
      await deletePeralatan(id).then(() => {
        fetchPeralatanDatacallback();
      });
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h1 className="mb-5">Peralatan</h1>
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
        <ModalComponent onClose={() => toggleModal("")} onSubmit={handleFormSubmit} title="Tambah peralatan">
          <form>
            <div className="mb-4">
              <div className="mb-4">
                <TextInput
                  id="nama"
                  type="text"
                  placeholder=""
                  label="Nama"
                  onChange={(val) => setName(val.target.value)}
                  val={name}
                />
              </div>
              <div className="mb-4">
                <SelectInput
                  id="kejuruan"
                  placeholder="Pilih Kejuruan"
                  label="Kejuruan"
                  options={kejuruanOptions}
                  onChange={handleKejuruanChange}
                  val={selectedKejuruan}
                />
              </div>
              <div className="mb-4">
                <TextInput
                  id="jumlah"
                  type="text"
                  placeholder=""
                  label="Jumlah"
                  onChange={(val) => setTotal(parseInt(val.target.value))}
                  val={total.toString()}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
                  Upload File
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  name="image"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImageChange}
                />{" "}
              </div>
            </div>
          </form>
        </ModalComponent>
      )}
      <ToastContainer />
    </div>
  );
}
