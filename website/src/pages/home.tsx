import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../components/core/buttons";
import { PRIMARY_COLOR } from "../constants/app_colors";
import Navbar from "../components/core/navbar";
import Kejuruan from "../components/kejuruan";
import Pelatihan from "../components/pelatihan";
import Prasarana from "../components/prasarana";
import Peralatan from "../components/peralatan";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAboutData } from "../store/features/about/aboutActions";
import { AboutState, setAboutData } from "../store/features/about/aboutSlice";
import { useNavigate } from "react-router-dom";
import { fetchSocmedData } from "../store/features/socmed/socmedActions";
import { SocmendState, setSocmedData } from "../store/features/socmed/socmedSlice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const aboutData = useAppSelector((state: any) => state.about);
  const socmedData = useAppSelector((state: any) => state.socmed);
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

  useEffect(() => {
    dispatch(fetchAboutData())
      .unwrap()
      .then((data: any) => {
        let res: AboutState = {
          id: data.data.id,
          title: data.data.title,
          content: data.data.content,
        };
        dispatch(setAboutData(res));
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSocmedData())
      .unwrap()
      .then((data: any) => {
        let sda: SocmendState = {
          facebook: data.data.facebook,
          twitter: data.data.twitter,
          instagram: data.data.instagram,
        };
        dispatch(setSocmedData(sda));
      });
  }, [dispatch]);

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
            backgroundImage: `url(http://localhost:3000/images/home_top_img.png)`,
            backgroundSize: "cover",
            height: isMobile ? "55vh" : "55vh",
          }}
        >
          <div className={`${isMobile ? "px-4" : ""}`}>
            <h1 className={`${isMobile ? "line-clamp-3" : "line-clamp-2"} mb-5`}>{aboutData.title}</h1>
            <div
              className="line-clamp-2 text-sm text-fade"
              dangerouslySetInnerHTML={{ __html: aboutData.content ? aboutData.content : "" }}
            />
            <div className="mb-10 mt-5">
              <PrimaryButton text="Selengkapnya" onClick={() => navigate("/about")} icon={faArrowRight} />
            </div>
            <div className="flex gap-3">
              <a href={`https://www.facebook.com/${socmedData.facebook}`} target="_blank" rel="noreferrer">
                <img src="/images/socmed_facebook.png" alt="" width="40" height="40" />
              </a>
              <a href={`https://www.instagram.com/${socmedData.instagram}`} target="_blank" rel="noreferrer">
                <img src="/images/socmed_instagram.png" alt="" width="40" height="40" />
              </a>
              <a href={`https://www.twitter.com/${socmedData.twitter}`} target="_blank" rel="noreferrer">
                <img src="/images/socmed_twitter.png" alt="" width="40" height="40" />
              </a>
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
          <img src={"/images/vocational.png"} width={160} height={160} alt="" style={{ maxHeight: "160px" }} />
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
