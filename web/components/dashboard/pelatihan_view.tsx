import React, { useState } from "react";
import { SelectInput, TextInput } from "../core/text_input";
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton } from "../core/buttons";
import DataTable from "react-data-table-component";
import TableActionButton from "../core/table_action_button";
import ModalComponent from "../core/modals";

export default function PelatihanView() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const columns = [
    {
      name: "Pelatihan",
      selector: (row: { pelatihan: string }) => row.pelatihan,
    },
    {
      name: "Kejuruan",
      selector: (row: { kejuruan: string }) => row.kejuruan,
      center: true,
    },
    {
      name: "Dana",
      selector: (row: { dana: string }) => row.dana,
      center: true,
    },
    {
      name: "Peserta",
      selector: (row: { peserta: string }) => row.peserta,
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
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      dana: "Swasta",
      peserta: "1200",
    },
    {
      id: 1,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      dana: "Swasta",
      peserta: "1200",
    },
    {
      id: 1,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      dana: "Swasta",
      peserta: "1200",
    },
    {
      id: 1,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      dana: "Swasta",
      peserta: "1200",
    },
    {
      id: 1,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      dana: "Swasta",
      peserta: "1200",
    },
    {
      id: 1,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      dana: "Swasta",
      peserta: "1200",
    },
    {
      id: 1,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      dana: "Swasta",
      peserta: "1200",
    },
    {
      id: 1,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      dana: "Swasta",
      peserta: "1200",
    },
    {
      id: 1,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      dana: "Swasta",
      peserta: "1200",
    },
    {
      id: 1,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      dana: "Swasta",
      peserta: "1200",
    },
    {
      id: 1,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      dana: "Swasta",
      peserta: "1200",
    },
    {
      id: 1,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      dana: "Swasta",
      peserta: "1200",
    },
  ];
  return (
    <div className="h-full flex flex-col">
      <h1 className="mb-5">Pelatihan</h1>
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
        <ModalComponent onClose={toggleModal} onSubmit={() => {}} title="Tambah Pelatihan">
          <form>
            <div className="mb-4">
              <div className="mb-4">
                <TextInput id="pelatihan" type="text" placeholder="" label="Pelatihan" />
              </div>
              <div className="mb-4">
                <SelectInput id="" placeholder="Pilih kejuruan" label="Kejuruan" />
              </div>
              <div className="mb-4">
                <TextInput id="dana" type="text" placeholder="" label="Pendanaan" />
              </div>
              <div className="mb-4">
                <TextInput id="peserta" type="text" placeholder="" label="Jumlah Peserta" />
              </div>
            </div>
          </form>
        </ModalComponent>
      )}
    </div>
  );
}
