import React, { useState } from "react";
import TableActionButton from "../core/table_action_button";
import { SelectInput, TextInput } from "../core/text_input";
import { PrimaryButton } from "../core/buttons";
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";
import ModalComponent from "../core/modals";

export default function PeralatanView() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const columns = [
    {
      name: "Nama",
      selector: (row: { nama: string }) => row.nama,
    },
    {
      name: "Kejuruan",
      selector: (row: { kejuruan: string }) => row.kejuruan,
      center: true,
    },
    {
      name: "Jumlah",
      selector: (row: { jumlah: number }) => row.jumlah,
      center: true,
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
      nama: "Fashion Desain",
      kejuruan: "Tata Busana",
      jumlah: 5,
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <h1 className="mb-5">Peralatan</h1>
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
        <ModalComponent onClose={toggleModal} onSubmit={() => {}} title="Tambah Prasarana">
          <form>
            <div className="mb-4">
              <div className="mb-4">
                <TextInput id="nama" type="text" placeholder="" label="Nama" />
              </div>
              <div className="mb-4">
                <SelectInput id="kejuruan" placeholder="Pilih Kejuruan" label="Kejuruan" />
              </div>
              <div className="mb-4">
                <TextInput id="jumlah" type="text" placeholder="" label="Jumlah" />
              </div>
            </div>
          </form>
        </ModalComponent>
      )}
    </div>
  );
}
