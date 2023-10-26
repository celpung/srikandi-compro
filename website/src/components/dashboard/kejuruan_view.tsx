/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { TextInput } from "../core/text_input";
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton } from "../core/buttons";
import DataTable from "react-data-table-component";
import TableActionButton from "../core/table_action_button";
import ModalComponent from "../core/modals";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  createKejuruanData,
  deleteKejuruan,
  fetchKejuruanData,
  updateKejuruanData,
} from "../../store/features/kejuruan/kejuruanAction";
import { setKejuruanData } from "../../store/features/kejuruan/kejuruanSlice";
import { TableColumn } from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";

export default function KejuruanView() {
  const dispatch = useAppDispatch();
  const kejuruanData = useAppSelector((state: any) => state.kejuruan);
  const [createName, setCreateName] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [actionMode, setActionMode] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState(kejuruanData.data);

  useEffect(() => {
    getKejuruanData();
  }, []);

  const toggleModal = (mode: string) => {
    if (mode === "create") {
      setCreateName("");
    }
    setActionMode(mode);
    setIsModalOpen(!isModalOpen);
  };

  const createdata = async () => {
    if (actionMode === "create") {
      await createKejuruanData(createName)
        .then((res) => {
          if (res.status === 201) {
            getKejuruanData();
            toggleModal("create");
          }
        })
        .catch(() => {
          toast("Failed");
        });
    } else if (actionMode === "update") {
      try {
        await updateKejuruanData(createName, selectedId).then((res) => {
          if (res.status === 200) {
            getKejuruanData();
            toggleModal("update");
          }
        });
      } catch (error) {
        toast("Failed");
      }
    }
  };

  const deleteData = async (id: number) => {
    const shouldDelete = window.confirm("Yakin ingin menghapus?");
    if (shouldDelete) {
      await deleteKejuruan(id).then(() => {
        getKejuruanData();
      });
    }
  };

  const getKejuruanData = async () => {
    dispatch(fetchKejuruanData())
      .unwrap()
      .then((res: any) => {
        dispatch(setKejuruanData(res.data));
      })
      .catch(() => toast.error("Error"));
  };

  const columns: TableColumn<{ id: number; name: string }>[] = [
    {
      name: "Kejuruan",
      selector: (row) => row.name,
      center: true,
    },
    {
      name: "Action",
      cell: (row: { id: number; name: string }) => (
        <TableActionButton
          id={row.id}
          onClick={() => {
            setSelectedId(row.id);
            toggleModal("update");
            setCreateName(row.name);
          }}
          ondelete={() => deleteData(row.id)}
        />
      ),
      center: true,
      maxWidth: "200px",
    },
  ];

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filtered = kejuruanData.data.filter((item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, kejuruanData.data]);

  return (
    <div className="h-full flex flex-col">
      <h1 className="mb-5">Kejuruan</h1>
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
        <ModalComponent onClose={() => toggleModal(actionMode)} onSubmit={createdata} title="Tambah Kejuruan">
          <form>
            <div className="mb-4">
              <TextInput
                id="nama_kejuruan"
                type="text"
                placeholder=""
                label="Nama Kejuruan"
                onChange={(val) => setCreateName(val.target.value)}
                val={createName}
              />
            </div>
          </form>
        </ModalComponent>
      )}
      <ToastContainer />
    </div>
  );
}
