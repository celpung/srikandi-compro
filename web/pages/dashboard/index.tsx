import React, { useState } from "react";
import SidebarComponent from "@/components/core/sidebar";
import DashboardGridCard from "@/components/dashboard/dashboard_grid_card";
import DashboardView from "@/components/dashboard/dashboard_view";
import KejuruanView from "@/components/dashboard/kejuruan_view";
import PelatihanView from "@/components/dashboard/pelatihan_view";
import PrasaranaView from "@/components/dashboard/prasarana_view";
import PeralatanView from "@/components/dashboard/peralatan_view";

export default function Dashboard() {
  const [showPage, setShowPage] = useState("dashboard");

  const renderContentView = () => {
    switch (showPage) {
      case "dashboard":
        return <DashboardView />;
      case "kejuruan":
        return <KejuruanView />;
      case "pelatihan":
        return <PelatihanView />;
      case "prasarana":
        return <PrasaranaView />;
      case "peralatan":
        return <PeralatanView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      <SidebarComponent onMenuItemClick={(page) => setShowPage(page)} />
      <div className="p-4 w-full flex flex-col">
        <div className="mb-5">
          <DashboardGridCard />
        </div>
        <div className="flex-1 overflow-y-auto">
          {renderContentView()}
        </div>
      </div>
    </div>
  );
}
