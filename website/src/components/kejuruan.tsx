import { useCallback, useEffect } from "react";
import { fetchKejuruanData } from "../store/features/kejuruan/kejuruanAction";
import { setKejuruanData } from "../store/features/kejuruan/kejuruanSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ToastContainer } from "react-toastify";

export default function Kejuruan() {
  const dispatch = useAppDispatch();
  const kejuruanData = useAppSelector((state: any) => state.kejuruan);

  const fetchKejuruanDatacallback = useCallback(() => {
    dispatch(fetchKejuruanData())
      .unwrap()
      .then((res: any) => {
        dispatch(setKejuruanData(res.data));
      })
      .catch(() => console.log(""));
  }, [dispatch]);

  useEffect(() => {
    fetchKejuruanDatacallback();
  }, [fetchKejuruanDatacallback]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-center justify-center">
      {kejuruanData.data.map((item: any) => (
        <div key={item.id} className="kejuruan-pill bg-white shadow-lg p-2 rounded-full text-center cursor-pointer">
          {item.name}
        </div>
      ))}
      <ToastContainer />
    </div>
  );
}
