import React, { useEffect } from "react";
import Navbar from "../components/core/navbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchContactData } from "../store/features/contact/contactActions";
import { ContactState, setContactData } from "../store/features/contact/contactSlice";

export default function Contact() {
  const dispatch = useAppDispatch();
  const contactData = useAppSelector((state: any) => state.contact);

  useEffect(() => {
    dispatch(fetchContactData())
      .unwrap()
      .then((data: any) => {
        let res: ContactState = {
          id: data.data.id,
          title: data.data.title,
          content: data.data.content,
        };
        dispatch(setContactData(res));
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
        <h1 className="mb-5">{contactData.title}</h1>
        <div
          className="text-fade"
          dangerouslySetInnerHTML={{ __html: contactData.content ? contactData.content : "" }}
        />
      </div>
    </main>
  );
}
