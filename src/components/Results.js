import React, { useContext, useEffect, useState } from "react";
import { Textarea, Button, Spinner } from "@nextui-org/react";
import Layout from "./Layout";
import { context } from "../App";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useNavigate } from "react-router-dom";
import { handleSearch } from "./EnterData";

const Results = () => {
  const navigate = useNavigate();
  const ctx = useContext(context);
  const { chatResponse, enteredPrompt, setEnteredPrompt, loading, openModal } =
    ctx;
  const [textHeight, setTextHeight] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
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
    if (chatResponse.length > 0) {
      let resp = chatResponse[chatResponse.length - 1];
      const div = document.getElementById(resp.id);
      div.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatResponse]);
  useEffect(() => {
    if (enteredPrompt) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [enteredPrompt]);
  return (
    <Layout>
      <div className="rounded-md cw-m col-span-6 border border-pxty-border-color bg-pxty-chat-bg grid grid-cols-10">
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
                <div className="text-base text-pxty-hg font-normal">
                  <Markdown rehypePlugins={[rehypeRaw]}>{item.answer}</Markdown>
                </div>
                {!openModal && (
                  <div
                    className={`bg-pxty-grey fixed bottom-[5%] ${
                      textHeight ? "rounded-md" : "rounded-full"
                    } w-[50%] p-2`}
                  >
                    <div
                      className={`flex items-center justify-between w-full border border-pxty-border-color ${
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
                            "hover:bg-pxty-grey",
                            "p-0",
                            "bg-pxty-grey",
                          ],
                          input: [
                            "placeholder:text-pxty-text-color",
                            "text-white",
                            "hover:bg-pxty-grey",
                            "text-base",
                            "pt-2",
                            "bg-pxty-grey",
                          ],
                          innerWrapper: [
                            "placeholder:text-pxty-text-color",
                            "rounded-md",
                            "hover:bg-pxty-grey",
                            "text-white",
                            "text-base",
                            "bg-pxty-grey",
                            "height",
                            "min-h-[40px]",
                          ],
                          base: [
                            "m-[1%]",
                            "hover:bg-pxty-grey",
                            "bg-pxty-grey",
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
                            fill={isDisabled ? "#333332" : "#229EAE"}
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
        </div>
        {/* images---- */}
        {/* <div className="col-span-4"></div> */}
      </div>
    </Layout>
  );
};

export default Results;
