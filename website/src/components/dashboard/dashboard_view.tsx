/* eslint-disable react-hooks/exhaustive-deps */
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { TextInput } from "../core/text_input";
import { PrimaryButton } from "../core/buttons";
import ModalComponent from "../core/modals";
import { AboutState, setAboutData } from "../../store/features/about/aboutSlice";
import { createAboutData, fetchAboutData } from "../../store/features/about/aboutActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { createContactData, fetchContactData } from "../../store/features/contact/contactActions";
import { ContactState, setContactData } from "../../store/features/contact/contactSlice";
import { SocmendState, setSocmedData } from "../../store/features/socmed/socmedSlice";
import { createSocmedData, fetchSocmedData } from "../../store/features/socmed/socmedActions";
import { ToastContainer, toast } from "react-toastify";

export default function DashboardView() {
  const dispatch = useAppDispatch();
  const aboutData = useAppSelector((state: any) => state.about);
  const contactData = useAppSelector((state: any) => state.contact);
  const socmedData = useAppSelector((state: any) => state.socmed);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [createMode, setCreateMode] = useState<String>("");
  const [socmed, setSocmed] = useState<SocmendState>({
    facebook: socmedData.facebook,
    twitter: socmedData.twitter,
    instagram: socmedData.instagram,
  });

  useEffect(() => {
    getAbout();
    getContact();
    getSocmed();
    console.log(socmed);
  }, []);

  const toggleModal = (mode: any) => {
    setCreateMode(mode);
    setIsModalOpen(!isModalOpen);
  };

  const getAbout = () => {
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
  };

  const getContact = () => {
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
  };

  const getSocmed = () => {
    dispatch(fetchSocmedData())
      .unwrap()
      .then((data: any) => {
        let sda: SocmendState = {
          facebook: data.data.facebook,
          twitter: data.data.twitter,
          instagram: data.data.instagram,
        };
        setSocmed(sda);
        dispatch(setSocmedData(sda));
      });
  };

  const createAbout = async () => {
    try {
      await createAboutData({ title, content }).then(async () => {
        getAbout();
        toggleModal(createMode);
      });
    } catch (error) {
      console.error("Error creating and fetching data:", error);
    }
  };

  const createContact = async () => {
    try {
      await createContactData({ title, content }).then(async (res) => {
        getContact();
        toggleModal(createMode);
      });
    } catch (error) {
      console.error("Error creating and fetching data:", error);
    }
  };

  const submitCreate = async () => {
    if (createMode === "about") {
      createAbout();
    } else if (createMode === "contact") {
      createContact();
    }
  };

  const createSocmed = async () => {
    await createSocmedData(socmed).then(async (res) => {
      getSocmed();
      toast.success("Berhasil update data");
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <div>
        <div className="p-4 bg-white shadow-lg rounded-md relative mb-3">
          <div
            className="absolute top-0 right-0 p-2 bg-yellow-200 rounded-tr-md cursor-pointer"
            onClick={() => toggleModal("about")}
          >
            <FontAwesomeIcon icon={faPen} />
          </div>

          <h1 className="line-clamp-2 mb-5 mt-5">{aboutData.title ? aboutData.title : ""}</h1>
          <div
            className="line-clamp-2 text-sm text-fade"
            dangerouslySetInnerHTML={{ __html: aboutData.content ? aboutData.content : "" }}
          />
        </div>

        <div className="p-4 bg-white shadow-lg rounded-md relative mb-3">
          <div
            className="absolute top-0 right-0 p-2 bg-yellow-200 rounded-tr-md cursor-pointer"
            onClick={() => toggleModal("contact")}
          >
            <FontAwesomeIcon icon={faPen} />
          </div>
          <h1 className="line-clamp-2 mb-5 mt-5">{contactData.title ? contactData.title : ""}</h1>
          <div
            className="line-clamp-2 text-sm text-fade"
            dangerouslySetInnerHTML={{ __html: contactData.content ? contactData.content : "" }}
          />
        </div>
      </div>
      <div className="flex">
        <div className="p-4 shadow-lg rounded-md bg-white flex flex-col w-full">
          <h1 className="line-clamp-2 mb-5">Media Sosial</h1>
          <div className="flex-1 flex flex-col justify-center gap-6 items-center p-4">
            <div className="w-full flex gap-2">
              <img src="/images/socmed_facebook.png" alt="fb" width={60} height={60} />
              <div className="w-full">
                <TextInput
                  onChange={(event) =>
                    setSocmed({
                      ...socmed,
                      facebook: event.target.value,
                    })
                  }
                  type="text"
                  id="facebook"
                  placeholder="http://facebook.com/***"
                  label="Facebook"
                  val={socmedData.facebook ? socmedData.facebook : ""}
                />
              </div>
            </div>

            <div className="w-full flex gap-2">
              <img src="/images/socmed_instagram.png" alt="fb" width={60} height={60} />
              <div className="w-full">
                <TextInput
                  onChange={(event) =>
                    setSocmed({
                      ...socmed,
                      instagram: event.target.value,
                    })
                  }
                  type="text"
                  id="instagram"
                  placeholder="http://instagram.com/***"
                  label="Instagram"
                  val={socmedData.instagram ? socmedData.instagram : ""}
                />
              </div>
            </div>
            <div className="w-full flex gap-2">
              <img src="/images/socmed_twitter.png" alt="fb" width={60} height={60} />
              <div className="w-full">
                <TextInput
                  onChange={(event) =>
                    setSocmed({
                      ...socmed,
                      twitter: event.target.value,
                    })
                  }
                  type="text"
                  id="twitter"
                  placeholder="http://x.com/***"
                  label="Twitter / X"
                  val={socmedData.twitter ? socmedData.twitter : ""}
                />
              </div>
            </div>
            <PrimaryButton onClick={() => createSocmed()} text="Submit" />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalComponent onClose={() => toggleModal(createMode)} onSubmit={submitCreate} title="Edit About">
          <div>
            <div className="mb-3">
              <TextInput
                val={createMode === "about" ? aboutData.title : contactData.title}
                id="title"
                type="text"
                label="Judul"
                placeholder="Judul"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <CKEditor
              editor={ClassicEditor}
              data={createMode === "about" ? aboutData.content : contactData.content}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
                console.log({ event, editor, data });
              }}
            />
          </div>
        </ModalComponent>
      )}
      <ToastContainer />
    </div>
  );
}
