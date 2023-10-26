import React, { useEffect } from "react";
import Navbar from "../components/core/navbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAboutData } from "../store/features/about/aboutActions";
import { AboutState, setAboutData } from "../store/features/about/aboutSlice";

export default function About() {
  const dispatch = useAppDispatch();
  const aboutData = useAppSelector((state: any) => state.about);

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

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full bg-white shadow-md">
        <div className="container">
          <Navbar />
        </div>
      </div>

      <div className="container pt-3">
        <h1 className="mb-5">{aboutData.title}</h1>
        <div
          className="text-fade"
          dangerouslySetInnerHTML={{ __html: aboutData.content ? aboutData.content : "" }}
        />
      </div>
    </main>
  );
}
