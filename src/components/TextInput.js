import React, { useContext, useEffect, useState } from "react";
import { context } from "../App";
import { Textarea, Button, Spinner } from "@nextui-org/react";
import { handleSearch } from "./EnterData";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useTranslation } from 'react-i18next';

const TextInput = () => {
  const ctx = useContext(context);
  const { t } = useTranslation();
  const { enteredPrompt, setEnteredPrompt, loading } = ctx;
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [speechOn, setSpeechOn] = useState(false);
  useEffect(() => {
    if (enteredPrompt) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [enteredPrompt]);
  useEffect(() => {
    if (speechOn) {
      console.log('test here');
      SpeechRecognition.startListening({ language: true ? 'en-US' : 'es-US' });
    } else {
      SpeechRecognition.stopListening();
      if (transcript !== '') {
      console.log('test here 2');
      console.log(transcript);
      setEnteredPrompt(transcript);
        resetTranscript();
      }
    }
  }, [speechOn]);
  const speechHandler = (e) => {
    setSpeechOn((p) => !p);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(ctx, navigate);
    }
  };

  return (
    <div className="border border-pxty-light rounded-md bg-pxty-dark-mid">
      <div className="px-4 pt-4">
        <Textarea
          value={enteredPrompt}
          onKeyDown={handleKeyPress}
          onChange={(e) => setEnteredPrompt(e.target.value)}
          placeholder={t("Ask anything...")}
          classNames={{
            inputWrapper: [
              // "bg-pxty-dark-mid",
              "hover:bg-pxty-dark-mid",
              "focus:bg-pxty-dark-mid",
              "rounded-md",
              "p-0",
            ],
            innerWrapper: ["bg-pxty-dark-mid", "height", "min-h-[75px]"],
            input: [
              "bg-pxty-dark-mid",
              "hover:bg-pxty-dark-mid",
              "focus:bg-pxty-dark-mid",
              "placeholder:text-pxty-light-text",
              "rounded-md",
              "text-white",
              "text-base",
            ],
          }}
        />
      </div>
      <div className="flex justify-between">
        <div className="pb-2 pl-2">
          <Button
            className="bg-pxty-dark-mid text-pxty-light-text p-0 h-fit text-sm h-8 hover:text-pxty-hover-cyan"
            radius="full"
            startContent={
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            }
          >
            {t('Focus')}
          </Button>
          <Button
            className="bg-pxty-dark-mid text-pxty-light-text p-0 h-fit text-sm h-8 hover:text-pxty-hover-cyan"
            radius="full"
            startContent={
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
            }
          >
            {t('Attach')}
          </Button>
        </div>
        <div>
          {loading && (
            <Spinner
              classNames={{
                circle1: [
                  "border-l-pxty-light",
                  "border-r-pxty-light",
                  "border-t-pxty-light",
                ],
                circle2: [
                  "border-l-pxty-light",
                  "border-r-pxty-light",
                  "border-t-pxty-light",
                ],
              }}
              color="warning"
              className="w-4 h-4 bottom-[6px]"
            />
          )}
          <Button
            onClick={speechHandler}
            isIconOnly
            className="bg-pxty-dark-mid text-pxty-light-text p-0 h-fit text-sm h-8 ml-4"
            radius="full"
            // disabled={isDisabled}
            startContent={
              <svg fill="#1fa363" width={"50px"} height={"32px"} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <g>
                  <g>
                    <path d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z"/>
                    <path d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z"/>
                  </g>
                </g>
              </svg>
            }
          ></Button>
          <Button
            onClick={() => handleSearch(ctx, navigate)}
            isIconOnly
            className="bg-pxty-dark-mid text-pxty-light-text p-0 h-fit text-sm h-8 ml-4"
            radius="full"
            disabled={isDisabled}
            startContent={
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isDisabled ? "none" : "#1fa363"}
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke={isDisabled ? "grey" : "#224348"}
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    // stroke={isDisabled ? "currentColor" : "#224348"}
                  />
                </svg>
              </span>
            }
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default TextInput;
