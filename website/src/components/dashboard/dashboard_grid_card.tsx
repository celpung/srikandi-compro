import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faBriefcase, faHouse, faMedal, faWrench } from "@fortawesome/free-solid-svg-icons";
import { countKejuruanData } from "../../store/features/kejuruan/kejuruanAction";
import { countPelatihan } from "../../store/features/pelatihan/pelatihanAction";
import { countPrasarana } from "../../store/features/prasarana/prasaranaAction";
import { countPeralatan } from "../../store/features/peralatan/peralatanAction";

export default function DashboardGridCard() {
  const [kejuruan, setKejuruan] = useState<number>(0);
  const [pelatihan, setPelatihan] = useState<number>(0);
  const [prasarana, setPrasarana] = useState<number>(0);
  const [peralatan, setPeralatan] = useState<number>(0);

  const counting = useCallback(async () => {
    await countKejuruanData().then((res) => {
      setKejuruan(res.data);
    });
    await countPelatihan().then((res) => {
      setPelatihan(res.data);
    });
    await countPrasarana().then((res) => {
      setPrasarana(res.data);
    });
    await countPeralatan().then((res) => {
      setPeralatan(res.data);
    });
  }, []);

  useEffect(() => {
    counting();
  }, [counting]);

  return (
    <div className="grid grid-cols-4 gap-4 w-full justify-between">
      <div className="bg-gradient-to-r from-white via-white-100 to-yellow-200 shadow-md p-4 rounded-lg flex justify-between">
        <div>
          <p className="mb-3">
            <FontAwesomeIcon icon={faBriefcase} /> Kejuruan
          </p>
          <p className="text-xs text-gray-400 mb-1">Total Data</p>
          <h3>{kejuruan}</h3>
        </div>
        <div>
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </div>
      </div>
      <div className="bg-gradient-to-r from-white via-yellow-100 to-yellow-200 shadow-md p-4 rounded-lg flex justify-between">
        <div>
          <p className="mb-3">
            <FontAwesomeIcon icon={faMedal} /> Pelatihan
          </p>
          <p className="text-xs text-gray-400 mb-1">Total Data</p>
          <h3>{pelatihan}</h3>
        </div>
        <div>
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </div>
      </div>
      <div className="bg-gradient-to-r from-white via-yellow-100 to-yellow-200 shadow-md p-4 rounded-lg flex justify-between">
        <div>
          <p className="mb-3">
            <FontAwesomeIcon icon={faHouse} /> Prasarana
          </p>
          <p className="text-xs text-gray-400 mb-1">Total Data</p>
          <h3>{prasarana}</h3>
        </div>
        <div>
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </div>
      </div>
      <div className="bg-gradient-to-r from-white via-yellow-100 to-yellow-200 shadow-md p-4 rounded-lg flex justify-between">
        <div>
          <p className="mb-3">
            <FontAwesomeIcon icon={faWrench} /> Peralatan
          </p>
          <p className="text-xs text-gray-400 mb-1">Total Data</p>
          <h3>{peralatan}</h3>
        </div>
        <div>
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </div>
      </div>
    </div>
  );
}
