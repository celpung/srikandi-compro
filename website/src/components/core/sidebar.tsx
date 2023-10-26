import { faBriefcase, faDashboard, faHouse, faMedal, faSignOut, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from "react-pro-sidebar";
// import Image from "next/image";

interface SidebarProps {
  onMenuItemClick: (page: string) => void;
}

export default function SidebarComponent({ onMenuItemClick }: SidebarProps) {
  const [isActive, setIsActive] = useState("dashboard");

  const handleMenuItemClick = (page: string) => {
    setIsActive(page);
    onMenuItemClick(page);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <div className="w-full flex justify-center py-8">
        <img src={"/images/logo.png"} alt="" width={80} height={80} />
        {/* <Image src="/images/logo.png" width={80} height={80} alt="" /> */}
      </div>
      <div>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "white",
          },
        }}
      >
        <Menu>
          <MenuItem
            onClick={() => handleMenuItemClick("dashboard")}
            className={isActive === "dashboard" ? "bg-yellow-300" : ""}
          >
            {" "}
            <FontAwesomeIcon icon={faDashboard} /> Dashboard{" "}
          </MenuItem>

          <MenuItem
            onClick={() => handleMenuItemClick("kejuruan")}
            className={isActive === "kejuruan" ? "bg-yellow-300" : ""}
          >
            {" "}
            <FontAwesomeIcon icon={faBriefcase} /> Kejuruan{" "}
          </MenuItem>

          <MenuItem
            onClick={() => handleMenuItemClick("pelatihan")}
            className={isActive === "pelatihan" ? "bg-yellow-300" : ""}
          >
            {" "}
            <FontAwesomeIcon icon={faMedal} /> Pelatihan{" "}
          </MenuItem>

          <MenuItem
            onClick={() => handleMenuItemClick("prasarana")}
            className={isActive === "prasarana" ? "bg-yellow-300" : ""}
          >
            {" "}
            <FontAwesomeIcon icon={faHouse} /> Prasarana{" "}
          </MenuItem>

          <MenuItem
            onClick={() => handleMenuItemClick("peralatan")}
            className={isActive === "peralatan" ? "bg-yellow-300" : ""}
          >
            {" "}
            <FontAwesomeIcon icon={faWrench} /> Peralatan{" "}
          </MenuItem>
          {/* <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
          </SubMenu> */}
        </Menu>
      </Sidebar>
      </div>
      
      <div className="flex-1 flex items-end pb-8">
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "white",
          },
        }}
      >
        <Menu>
          <MenuItem
            onClick={() => handleMenuItemClick("peralatan")}
            // className={isActive === "peralatan" ? "bg-yellow-300" : ""}
          >
            {" "}
            <FontAwesomeIcon icon={faSignOut} /> Sign Out{" "}
          </MenuItem>
        </Menu>
      </Sidebar>
      </div>
    </div>
  );
}
