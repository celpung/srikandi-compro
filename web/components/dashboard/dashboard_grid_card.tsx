import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faBriefcase, faHouse, faMedal, faWrench } from "@fortawesome/free-solid-svg-icons";

export default function DashboardGridCard() {
  return (
    <div className="grid grid-cols-4 gap-4 w-full justify-between">
      <div className="bg-gradient-to-r from-white via-white-100 to-yellow-200 shadow-md p-4 rounded-lg flex justify-between">
        <div>
          <p className="mb-3">
            <FontAwesomeIcon icon={faBriefcase} /> Kejuruan
          </p>
          <p className="text-xs text-gray-400 mb-1">Total Data</p>
          <h3>30</h3>
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
          <h3>30</h3>
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
          <h3>30</h3>
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
          <h3>30</h3>
        </div>
        <div>
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        </div>
      </div>
    </div>
  );
}
