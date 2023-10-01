import React, { useEffect, useState } from "react";
import Image from "next/image";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/components/core/navbar";
import { PrimaryButton } from "@/components/core/buttons";
import Kejuruan from "@/components/kejuruan";
import Pelatihan from "@/components/pelatihan";
import Prasarana from "@/components/prasarana";
import Peralatan from "@/components/peralatan";
import { PRIMARY_COLOR } from "@/constants/app_colors";

export default function Home() {
  const [showMenu, setShowMenu] = useState("kejuruan");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the screen width threshold as needed
    };

    // Initial check for screen width
    handleResize();

    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuOptions = [
    { key: "kejuruan", label: "KEJURUAN" },
    { key: "pelatihan", label: "PELATIHAN" },
    { key: "prasarana", label: "PRASARANA" },
    { key: "peralatan", label: "PERALATAN" },
  ];

  const getMenuStyle = (key: string) => ({
    background: showMenu === key ? PRIMARY_COLOR : "#FFF",
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full bg-white shadow-md">
        <div className="container">
          <Navbar />
        </div>
      </div>
      <div className="container pt-3">
        <div
          className="md:grid grid-cols-1 md:grid-cols-2 items-center"
          style={{
            backgroundImage: `url('/images/home_top_img.png')`,
            backgroundSize: "cover",
            height: isMobile ? "55vh" : "55vh",
          }}
        >
          <div className={`${isMobile ? "px-4" : ""}`}>
            <h1 className={`${isMobile ? "line-clamp-3" : "line-clamp-2"} mb-5`}>Selamat Datang Di Yayasan Srikandi</h1>
            <p className="line-clamp-2 mb-5 text-sm text-fade">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur suscipit fugit, est, similique ipsa,
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur suscipit fugit, est, similique ipsa
            </p>
            <div className="mb-10">
              <PrimaryButton text="Selengkapnya" onClick={() => {}} icon={faArrowRight} />
            </div>
            <div className="flex gap-3">
              <Image src="/images/socmed_facebook.png" width={40} height={40} alt="Logo" />{" "}
              <Image src="/images/socmed_instagram.png" width={40} height={40} alt="Logo" />{" "}
              <Image src="/images/socmed_twitter.png" width={40} height={40} alt="Logo" />{" "}
            </div>
          </div>
        </div>
        <div className={`${isMobile ? "px-4" : ""}`}>
          <div className="overflow-x-auto">
            <div className="flex gap-5 justify-start border-b mb-4">
              {menuOptions.map((option) => (
                <span
                  key={option.key}
                  className="text-sm mb-5 text-center cursor-pointer rounded px-4 py-2 shadow-lg"
                  style={getMenuStyle(option.key)}
                  onClick={() => setShowMenu(option.key)}
                >
                  {option.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={`flex flex-col md:flex-row gap-5 ${isMobile ? "px-4 pb-10" : ""}`}>
          {isMobile ? null : (
            <Image src="/images/vocational.png" width={160} height={160} alt="Logo" style={{ maxHeight: "160px" }} />
          )}{" "}
          <div className="w-full">
            {showMenu === "kejuruan" ? (
              <Kejuruan />
            ) : showMenu === "pelatihan" ? (
              <Pelatihan />
            ) : showMenu === "prasarana" ? (
              <div className="flex justify-center overflow-x-auto">
                <Prasarana />
              </div>
            ) : showMenu === "peralatan" ? (
              <div className="flex justify-center overflow-x-auto">
                <Peralatan />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
