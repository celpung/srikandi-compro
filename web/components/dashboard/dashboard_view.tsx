"use client";

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TextInput } from "../core/text_input";
import { PrimaryButton } from "../core/buttons";
import ModalComponent from "../core/modals";
import dynamic from "next/dynamic";
import { setAboutData } from "@/store/features/about/aboutSlice";
import { createAboutData, fetchAboutData } from "@/store/features/about/aboutActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function DashboardView() {
  const dispatch = useAppDispatch();
  const aboutData = useAppSelector((state) => state.about);
  const Editor = dynamic(() => import("../core/text_editor"), { ssr: false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    dispatch(fetchAboutData())
      .unwrap()
      .then((data) => {
        dispatch(setAboutData(data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // const createAbout = async () => {
  //   await createAboutData({ title, content }).then(() => {
  //     dispatch(fetchAboutData())
  //       .unwrap()
  //       .then((data) => {
  //         dispatch(setAboutData(data));
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   });
  // };

  const createAbout = async () => {
    try {
      await createAboutData({ title, content });
      const data = await dispatch(fetchAboutData()).unwrap();
      dispatch(setAboutData(data));
    } catch (error) {
      console.error("Error creating and fetching data:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <div>
        <div className="p-4 bg-white shadow-lg rounded-md relative mb-3">
          <div className="absolute top-0 right-0 p-2 bg-yellow-200 rounded-tr-md cursor-pointer" onClick={toggleModal}>
            <FontAwesomeIcon icon={faPen} />
          </div>

          <h1 className="line-clamp-2 mb-5 mt-5">{aboutData.title ? aboutData.title : ""}</h1>
          <p className="line-clamp-2 text-sm text-fade">{aboutData.content ? aboutData.content : ""}</p>
        </div>

        <div className="p-4 bg-white shadow-lg rounded-md relative mb-3">
          <div className="absolute top-0 right-0 p-2 bg-yellow-200 rounded-tr-md cursor-pointer" onClick={toggleModal}>
            <FontAwesomeIcon icon={faPen} />
          </div>
          <h1 className="line-clamp-2 mb-5 mt-5">Kontak</h1>
          <p className="line-clamp-2 text-sm text-fade">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur suscipit fugit, est, similique ipsa,
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur suscipit fugit, est, similique ipsa
          </p>
        </div>
      </div>
      <div className="flex">
        <div className="p-4 shadow-lg rounded-md bg-white flex flex-col w-full">
          <h1 className="line-clamp-2 mb-5">Media Sosial</h1>
          <div className="flex-1 flex flex-col justify-center gap-6 items-center p-4">
            <div className="w-full flex gap-2">
              <Image src="/images/socmed_facebook.png" alt="fb" width={60} height={60} />
              <div className="w-full">
                <TextInput type="text" id="facebook" placeholder="http://facebook.com/***" label="Facebook" />
              </div>
            </div>

            <div className="w-full flex gap-2">
              <Image src="/images/socmed_instagram.png" alt="fb" width={60} height={60} />
              <div className="w-full">
                <TextInput type="text" id="instagram" placeholder="http://instagram.com/***" label="Instagram" />
              </div>
            </div>
            <div className="w-full flex gap-2">
              <Image src="/images/socmed_twitter.png" alt="fb" width={60} height={60} />
              <div className="w-full">
                <TextInput type="text" id="twitter" placeholder="http://x.com/***" label="Twitter / X" />
              </div>
            </div>
            <PrimaryButton onClick={() => {}} text="Submit" />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalComponent onClose={toggleModal} onSubmit={createAbout} title="Edit About">
          <div>
            {typeof window !== "undefined" && (
              <Editor
                value="foo"
                onEditorChange={(val) => setContent(val)}
                titleId="title"
                titleLabel=""
                titlePlaceHolder="Judul"
                onTitleChange={(val) => setTitle(val)}
              />
            )}
          </div>
        </ModalComponent>
      )}
    </div>
  );
}
