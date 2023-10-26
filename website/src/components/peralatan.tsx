import React, { useCallback, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPeralatanData } from "../store/features/peralatan/peralatanAction";
import { setPeralatanData } from "../store/features/peralatan/peralatanSlice";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../configs/axios_instance";

export default function Peralatan() {
  const dispatch = useAppDispatch();
  const peralatanData = useAppSelector((state: any) => state.peralatan);

  var settings = {
    dots: false,
    autoplay: false,
    infinite: false,
    speed: 500,
    slidesToShow: peralatanData.data.length < 5 ? peralatanData.data.length : 5,
    slidesToScroll: 1,
  };

  const fetchPeralatanDatacallback = useCallback(() => {
    dispatch(fetchPeralatanData())
      .unwrap()
      .then((res: any) => {
        dispatch(setPeralatanData(res.data));
      })
      .catch(() => toast.error("Error"));
  }, [dispatch]);

  useEffect(() => {
    fetchPeralatanDatacallback();
  }, [fetchPeralatanDatacallback]);

  return (
    <div className="max-w-5xl text-center">
      <div>
        <Slider {...settings}>
          {peralatanData.data.map((item: any) => (
            <div>
              <div className="relative rounded shadow-md m-2 p-2 bg-white">
                <div className="flex justify-center">
                  <img src={`${axiosInstance.defaults.baseURL}/public/images/${item.image}`} alt="img" />
                </div>
                <h3 className="text-xs text-gray-900">{item.name}</h3>
                <p className="text-xs text-gray-600">Kejuruan:{item.kejuruan.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <ToastContainer />
    </div>
  );
}
