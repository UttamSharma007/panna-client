import React, { useContext, useEffect, useRef, useState } from "react";
import { Textarea, Button, Spinner, Skeleton } from "@nextui-org/react";
import Layout from "./Layout";
import { context } from "../App";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useNavigate } from "react-router-dom";
import { handleSearch } from "./EnterData";
import { skeletonStyle } from "./TextInput";
import Loader from "./Loader";
import { ReactMediaRecorder } from "react-media-recorder";
import axios from "axios";

const Results = () => {
  const navigate = useNavigate();
  const ctx = useContext(context);
  const {
    chatResponse,
    enteredPrompt,
    setEnteredPrompt,
    loading,
    openModal,
    setActivePage,
  } = ctx;
  const [textHeight, setTextHeight] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showControls, setShowControls] = useState(false);

  const audioRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(ctx, navigate);
    }
  };

  const checkHeight = (height) => {
    if (height >= 48) {
      setTextHeight(true);
    } else {
      setTextHeight(false);
    }
  };
  useEffect(() => {
    setActivePage("library");
  }, []);
  useEffect(() => {
    if (chatResponse.length > 0 && !loading) {
      let resp = chatResponse[chatResponse.length - 1];
      const div = document.getElementById(resp.id);
      div.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatResponse]);
  useEffect(() => {
    const floatingInputELe = document.getElementById("floating-input");
    if (floatingInputELe) {
      const height = floatingInputELe.offsetHeight;
      const answerContainerEles = document.querySelectorAll(
        '[data-container="answer"]'
      );
      const lastAnswerElement =
        answerContainerEles[answerContainerEles.length - 1];
      if (lastAnswerElement) {
        if (!textHeight) {
          lastAnswerElement.style.paddingBottom = `${Number(height) - 10}px`;
        } else {
          lastAnswerElement.style.paddingBottom = `72px`;
        }
        console.log("floaing Height:", height);
      }
    }
  }, [textHeight, chatResponse]);
  useEffect(() => {
    if (enteredPrompt) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [enteredPrompt]);

  useEffect(() => {
    if (loading) {
      const div = document.getElementById("skeleton-loader");
      div.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  useEffect(() => {
    // Play audio automatically when a new message is added
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && latestMessage.sender === "rachel") {
      // const audio = new Audio(latestMessage.blobUrl);
      // audio.play();
      // Play the audio
      console.log("-----", audioRef.current);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [messages]);

  const handleStop = async (blobUrl) => {
    setIsLoading(true);

    const myMessage = { sender: "me", blobUrl };
    const messageArr = [...messages, myMessage];
    fetch(blobUrl)
      .then((res) => res.blob())
      .then(async (blob) => {
        const formData = new FormData();
        formData.append("file", blob, "myFile.wav");

        try {
          const response = await axios.post(
            "http://localhost:8000/post-audio",
            formData,
            {
              headers: { "Content-Type": "audio/mpeg" },
              responseType: "arraybuffer",
            }
          );

          console.log("API response:", response);

          if (response.data instanceof ArrayBuffer) {
            const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
            const audioBlobUrl = window.URL.createObjectURL(audioBlob);

            const rachelMessage = { sender: "rachel", blobUrl: audioBlobUrl };
            messageArr.push(rachelMessage);
            setMessages(messageArr);
            setShowControls(true);
            // if (audioRef.current) {
            //   audioRef.current.play();
            // }
          } else {
            console.error("API response does not contain ArrayBuffer data.");
          }
        } catch (error) {
          console.error("Error during API request:", error);
        } finally {
          setIsLoading(false);
        }
      })
      .catch((fetchError) => {
        console.error("Error during fetch:", fetchError);
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      {(loading || isLoading) && <Loader />}
      <div className="rounded-md cw-m col-span-11 sm:col-span-9 lg:col-span-10 border border-pxty-light bg-pxty-dark grid grid-cols-10">
        <div className="col-span-1"> </div>
        {/* ------- main content */}
        <div className="col-span-8 relative">
          {chatResponse.map((item, i) => {
            return (
              <div key={i}>
                <div id={item.id} className="my-8 text-3xl text-pxty-hg">
                  {item.question}
                </div>
                <div className="flex items-center mb-3">
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-lg text-pxty-hg font-medium">
                    Answer
                  </span>
                </div>
                <div
                  data-container="answer"
                  className="text-base text-pxty-hg font-normal"
                >
                  <Markdown rehypePlugins={[rehypeRaw]}>{item.answer}</Markdown>
                </div>

                {!openModal && (
                  <div
                    id="floating-input"
                    className={`bg-pxty-dark-mid fixed bottom-[5%] z-50 ${
                      textHeight ? "rounded-md" : "rounded-full"
                    } w-[70%] sm:w-[50%] p-2`}
                  >
                    <div
                      className={`flex items-center justify-between w-full border border-pxty-light ${
                        textHeight ? "rounded-md" : "rounded-full"
                      }`}
                    >
                      <div className="mx-2">
                        <Button isIconOnly className="contents">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </Button>
                      </div>
                      <Textarea
                        onKeyDown={handleKeyPress}
                        value={enteredPrompt}
                        onChange={(e) => setEnteredPrompt(e.target.value)}
                        // value={textareaValue}
                        // onChange={handleTextareaChange}
                        onHeightChange={checkHeight}
                        //   rows={1}
                        minRows={1}
                        placeholder="Ask anything..."
                        classNames={{
                          inputWrapper: [
                            "hover:bg-pxty-dark-mid",
                            "p-0",
                            "bg-pxty-dark-mid",
                          ],
                          input: [
                            "placeholder:text-pxty-light-text",
                            "text-white",
                            "hover:bg-pxty-dark-mid",
                            "text-base",
                            "pt-2",
                            "bg-pxty-dark-mid",
                          ],
                          innerWrapper: [
                            "placeholder:text-pxty-light-text",
                            "rounded-md",
                            "hover:bg-pxty-dark-mid",
                            "text-white",
                            "text-base",
                            "bg-pxty-dark-mid",
                            "height",
                            "min-h-[45px]",
                          ],
                          base: [
                            "m-[1%]",
                            "hover:bg-pxty-dark-mid",
                            "bg-pxty-dark-mid",
                          ],
                        }}
                      />
                      <div className="mx-2 w-[20%] flex justify-end items-center">
                        {loading && (
                          <Spinner
                            color="warning"
                            className="w-4 h-4 left-[-15px]"
                          />
                        )}
                        <Button
                          onClick={() => handleSearch(ctx, navigate)}
                          isIconOnly
                          disabled={isDisabled}
                          className="contents"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={isDisabled ? "#333332" : "#1fa363"}
                            className="w-10 h-10"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                              clipRule="evenodd"
                              stroke={isDisabled ? "#60605F" : "#224348"}
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <br />
                <br />
                <hr />
              </div>
            );
          })}
          {messages.map((audio, index) => {
            return (
              <div
                key={index + audio.sender}
                className={
                  "flex flex-col " +
                  (audio.sender == "rachel" && "flex flex-end")
                }
              >
                <div className="mt-4">
                  <p
                    className={
                      audio.sender == "rachel"
                        ? "text-right mt-2 italic text-green-500"
                        : "ml-2 italic text-blur-500"
                    }
                  >
                    {audio.sender}
                  </p>

                  <audio
                    ref={audioRef}
                    key={audio.blobUrl}
                    src={audio.blobUrl}
                    className="appearance-none"
                    controls={showControls}
                    onCanPlay={() =>
                      console.log(`Audio can play for ${audio.sender}`)
                    }
                    onError={(error) =>
                      console.error(
                        `Error loading audio for ${audio.sender}`,
                        error
                      )
                    }
                  />
                </div>
              </div>
            );
          })}
          <div
            id="floating-input"
            className={`bg-pxty-dark-mid fixed bottom-[5%] z-50 ${
              textHeight ? "rounded-md" : "rounded-full"
            } w-[70%] sm:w-[50%] p-2`}
          >
            <div
              className={`flex items-center justify-between w-full border border-pxty-light ${
                textHeight ? "rounded-md" : "rounded-full"
              }`}
            >
              <div className="mx-2">
                <Button isIconOnly className="contents">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </Button>
              </div>
              <Textarea
                onKeyDown={handleKeyPress}
                value={enteredPrompt}
                onChange={(e) => setEnteredPrompt(e.target.value)}
                // value={textareaValue}
                // onChange={handleTextareaChange}
                onHeightChange={checkHeight}
                //   rows={1}
                minRows={1}
                placeholder="Ask anything..."
                classNames={{
                  inputWrapper: [
                    "hover:bg-pxty-dark-mid",
                    "p-0",
                    "bg-pxty-dark-mid",
                  ],
                  input: [
                    "placeholder:text-pxty-light-text",
                    "text-white",
                    "hover:bg-pxty-dark-mid",
                    "text-base",
                    "pt-2",
                    "bg-pxty-dark-mid",
                  ],
                  innerWrapper: [
                    "placeholder:text-pxty-light-text",
                    "rounded-md",
                    "hover:bg-pxty-dark-mid",
                    "text-white",
                    "text-base",
                    "bg-pxty-dark-mid",
                    "height",
                    "min-h-[45px]",
                  ],
                  base: [
                    "m-[1%]",
                    "hover:bg-pxty-dark-mid",
                    "bg-pxty-dark-mid",
                  ],
                }}
              />
              <div className="mx-2 w-[20%] flex justify-end items-center">
                <ReactMediaRecorder
                  audio
                  onStop={handleStop}
                  render={({ status, startRecording, stopRecording }) => (
                    <div className="mt-2 ">
                      <button
                        onMouseDown={startRecording}
                        onMouseUp={stopRecording}
                        className="bg-white mr-2 rounded-full"
                      >
                        <svg
                          fill="#1fa363"
                          // width={"30px"}
                          // height={"30px"}
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
                        >
                          <g>
                            <g>
                              <path d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z" />
                              <path d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z" />
                            </g>
                          </g>
                        </svg>
                      </button>
                      {/* <p className="mt-2 text-white font-light">{status}</p>{" "} */}
                    </div>
                  )}
                />
                {loading && (
                  <Spinner color="warning" className="w-4 h-4 left-[-15px]" />
                )}
                <Button
                  onClick={() => handleSearch(ctx, navigate)}
                  isIconOnly
                  disabled={isDisabled}
                  className="contents"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={isDisabled ? "#333332" : "#1fa363"}
                    className="w-10 h-10"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                      clipRule="evenodd"
                      stroke={isDisabled ? "#60605F" : "#224348"}
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
          {loading && (
            <div className="h-[90vh] my-[20px]">
              <Skeleton
                id="skeleton-loader"
                className={`${skeletonStyle(loading)} h-[10%] rounded-md`}
              />
              <div className="flex items-center mb-3">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-lg text-pxty-hg font-medium">Answer</span>
              </div>
              <Skeleton
                id="skeleton-loader"
                className={`${skeletonStyle(loading)} h-[30%] my-4 rounded-md`}
              />
              <Skeleton
                id="skeleton-loader"
                className={`${skeletonStyle(loading)} h-[10%] my-5 rounded-md`}
              />
              <Skeleton
                id="skeleton-loader"
                className={`${skeletonStyle(loading)} h-[20%] my-4 rounded-md`}
              />
              <Skeleton
                id="skeleton-loader"
                className={`${skeletonStyle(loading)} h-[10%] my-4 rounded-md`}
              />
            </div>
          )}
        </div>
        {/* images---- */}
        {/* <div className="col-span-4"></div> */}
      </div>
    </Layout>
  );
};

export default Results;
