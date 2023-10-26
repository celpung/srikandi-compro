import React, { useCallback, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPrasaranaData } from "../store/features/prasarana/prasaranaAction";
import { setPrasaranaData } from "../store/features/prasarana/prasaranaSlice";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../configs/axios_instance";

export default function Prasarana() {
  const dispatch = useAppDispatch();
  const prasaranaData = useAppSelector((state: any) => state.prasarana);

  var settings = {
    dots: false,
    autoplay: false,
    infinite: false,
    speed: 500,
    slidesToShow: prasaranaData.data.length < 5 ? prasaranaData.data.length : 5,
    slidesToScroll: 1,
  };

  const fetchPrasaranaCallback = useCallback(() => {
    dispatch(fetchPrasaranaData())
      .unwrap()
      .then((res) => {
        dispatch(setPrasaranaData(res.data));
      })
      .catch(() => toast.error("error"));
  }, [dispatch]);

  useEffect(() => {
    fetchPrasaranaCallback();
  }, [fetchPrasaranaCallback]);
  return (
    <div className="max-w-5xl text-center">
      <div>
        <Slider {...settings}>
          {prasaranaData.data.map((item: any) => (
            <div>
              <div className="relative rounded shadow-md m-2 p-2 bg-white">
                <div className="flex justify-center">
                  <img src={`${axiosInstance.defaults.baseURL}/public/images/${item.image}`} alt="img" />
                </div>
                <h3 className="text-xs text-gray-900">{item.name}</h3>
                <p className="text-xs text-gray-600">{item.kejuruan.name}</p>
                <p className="text-xs text-gray-600">Jumlah: {item.total} Luas: {item.wide}m2 Kapasitas: {item.capacity}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <ToastContainer />
    </div>
  );
}
