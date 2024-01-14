import { Image } from "@nextui-org/image";
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import Logo from "../images/logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../App";
import { handleSearch } from "./EnterData";
import TextInput from "./TextInput";

const Sidebar = () => {
  const ctx = useContext(context);
  const {
    libraryData,
    setChatResponse,
    openModal,
    setOpenModal,
    closeModal,
    setCloseModal,
  } = ctx;
  const [toggleLib, setToggleLib] = useState(true);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const navigateHome = (route) => {
    setChatResponse([]);
    navigate(`/${route}`);
  };
  useEffect(() => {
    if (isOpen) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [isOpen]);
  useEffect(() => {
    if (closeModal) {
      onClose();
      setCloseModal(false);
    }
  }, [closeModal]);
  // console.log("libraryData", libraryData);
  const handleLinkClick = (data) => {
    setChatResponse([data]);
  };
  return (
    <div className="height h-full col-span-2">
      <div>
        <div className="flex items-center gap-x-1  p-4">
          <Image src={Logo} width="40px" height="40px" />
          <span className="font-bold text-white text-xl ml-2">
            Paññā (Knowledge)
          </span>
        </div>
        <div className="my-4 text-white px-4">
          <Button
            onPress={onOpen}
            onClick={() => setChatResponse([])}
            className="bg-pxty-chat-bg rounded-full border border-3 w-full border-pxty-border-color flex justify-start text-pxty-text-color hover:border-pxty-hover-cyan"
          >
            New Thread
          </Button>
          <Modal
            backdrop="blur"
            size="3xl"
            hideCloseButton
            className="bg-pxty-grey"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody>
                    <TextInput />
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <div className="px-1">
          <Button
            onClick={() => navigateHome("home")}
            className="width w-full bg-pxty-grey text-pxty-text-color text-base justify-start hover:bg-white"
            startContent={
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            }
          >
            Home
          </Button>
          <Button
            onClick={() => navigateHome("discover")}
            className="width w-full bg-pxty-grey text-pxty-text-color text-base justify-start hover:bg-white"
            startContent={
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </span>
            }
          >
            Discover
          </Button>
          <div className="relative">
            <Button
              onClick={() => setToggleLib((prev) => !prev)}
              className="width w-full bg-pxty-grey text-pxty-text-color text-base justify-start hover:bg-white"
              startContent={
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 transform rotate-90 scale-x-[-1]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
                    />
                  </svg>
                </span>
              }
            >
              Library
            </Button>
            {toggleLib && (
              <div className="text-xs absolute left-[15%] top-[100%] border border-pxty-border-color border-y-0 border-r-0 pl-[10px] leading-7">
                {libraryData.map((item) => {
                  return (
                    <div>
                      <Link
                        key={item.id}
                        onClick={() => handleLinkClick(item)}
                        to="/results"
                        className="cursor-pointer"
                      >
                        {item.question}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
