import React, { useState } from "react";
import { TextInput } from "../core/text_input";
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton } from "../core/buttons";
import DataTable from "react-data-table-component";
import TableActionButton from "../core/table_action_button";
import ModalComponent from "../core/modals";

export default function KejuruanView() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const columns = [
    {
      name: "ID",
      selector: (row: { id: number }) => row.id,
      center: true,
      maxWidth: "100px",
    },
    {
      name: "Kejuruan",
      selector: (row: { nama_kejuruan: string }) => row.nama_kejuruan,
      // center: true,
    },
    {
      name: "Action",
      cell: (row: { id: number }) => <TableActionButton id={row.id} />,
      center: true,
    },
  ];

  const data = [
    {
      id: 1,
      nama_kejuruan: "Tata Busana",
    },
    {
      id: 2,
      nama_kejuruan: "Tata Busana",
    },
    {
      id: 3,
      nama_kejuruan: "Tata Busana",
    },
    {
      id: 4,
      nama_kejuruan: "Tata Busana",
    },
    {
      id: 5,
      nama_kejuruan: "Tata Busana",
    },
    {
      id: 6,
      nama_kejuruan: "Tata Busana",
    },
    {
      id: 7,
      nama_kejuruan: "Tata Busana",
    },
    {
      id: 8,
      nama_kejuruan: "Tata Busana",
    },
    {
      id: 9,
      nama_kejuruan: "Tata Busana",
    },
    {
      id: 10,
      nama_kejuruan: "Tata Busana",
    },
    {
      id: 11,
      nama_kejuruan: "Tata Busana",
    },
    {
      id: 12,
      nama_kejuruan: "Tata Busana",
    },
  ];
  return (
    <div className="h-full flex flex-col">
      <h1 className="mb-5">Kejuruan</h1>
      <div className="flex justify-between w-full mb-5">
        <div className="w-1/2">
          <TextInput type="text" id="search" icon={faSearch} placeholder="cari ..." />
        </div>
        <div className="flex justify-end gap-4">
          <PrimaryButton text="Tambah Data" icon={faPlusCircle} onClick={toggleModal} />
        </div>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10]}
          striped
          dense
        />
      </div>
      {isModalOpen && (
        <ModalComponent onClose={toggleModal} onSubmit={() => {}} title="Tambah Kejuruan">
          <form>
            <div className="mb-4">
              <TextInput id="nama_kejuruan" type="text" placeholder="" label="Nama Kejuruan" />
            </div>
          </form>
        </ModalComponent>
      )}
    </div>
  );
}
