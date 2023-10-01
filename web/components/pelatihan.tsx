import React from "react";
import DataTable from "react-data-table-component";

export default function Pelatihan() {
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
      name: "Tahun",
      selector: (row: { tahun: string }) => row.tahun,
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
  ];

  const data = [
    {
      id: 1,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      tahun: "1988",
      dana: "Swasta",
      peserta: "1200",
    },
    {
      id: 2,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      title: "Beetlejuice",
      tahun: "1988",
      dana: "Swasta",
      peserta: "1200",
    },
    {
      id: 3,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      title: "Beetlejuice",
      tahun: "1988",
      dana: "Swasta",
      peserta: "1200",
    },
    {
      id: 4,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      title: "Beetlejuice",
      tahun: "1988",
      dana: "Swasta",
      peserta: "1200",
    },
    {
      id: 5,
      pelatihan: "Fashion Desain",
      kejuruan: "Tata Busana",
      title: "Beetlejuice",
      tahun: "1988",
      dana: "Swasta",
      peserta: "1200",
    },
  ];

  return (
    <div className="table-responsive">
      <DataTable columns={columns} data={data} pagination paginationPerPage={3} paginationRowsPerPageOptions={[3]} dense striped style={{}} />
    </div>
  );
}
