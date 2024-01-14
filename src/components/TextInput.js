import React, { useContext, useEffect, useState } from "react";
import { context } from "../App";
import { Textarea, Button, Spinner } from "@nextui-org/react";
import { handleSearch } from "./EnterData";
import { useNavigate } from "react-router-dom";

const TextInput = () => {
  const ctx = useContext(context);
  const { enteredPrompt, setEnteredPrompt, loading } = ctx;
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (enteredPrompt) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [enteredPrompt]);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(ctx, navigate);
    }
  };
  return (
    <div className="border border-pxty-border-color rounded-md bg-pxty-grey">
      <div className="px-4 pt-4">
        <Textarea
          value={enteredPrompt}
          onKeyDown={handleKeyPress}
          onChange={(e) => setEnteredPrompt(e.target.value)}
          placeholder="Ask anything..."
          classNames={{
            inputWrapper: [
              // "bg-pxty-grey",
              "hover:bg-pxty-grey",
              "focus:bg-pxty-grey",
              "rounded-md",
              "p-0",
            ],
            innerWrapper: ["bg-pxty-grey", "height", "min-h-[75px]"],
            input: [
              "bg-pxty-grey",
              "hover:bg-pxty-grey",
              "focus:bg-pxty-grey",
              "placeholder:text-pxty-text-color",
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
            className="bg-pxty-grey text-pxty-text-color p-0 h-fit text-sm h-8"
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
            Focus
          </Button>
          <Button
            className="bg-pxty-grey text-pxty-text-color p-0 h-fit text-sm h-8"
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
            Attach
          </Button>
        </div>
        <div>
          {loading && (
            <Spinner
              classNames={{
                circle1: [
                  "border-l-pxty-text-color",
                  "border-r-pxty-text-color",
                  "border-t-pxty-text-color",
                ],
                circle2: [
                  "border-l-pxty-text-color",
                  "border-r-pxty-text-color",
                  "border-t-pxty-text-color",
                ],
              }}
              color="warning"
              className="w-4 h-4 bottom-[6px]"
            />
          )}
          <Button
            onClick={() => handleSearch(ctx, navigate)}
            isIconOnly
            className="bg-pxty-grey text-pxty-text-color p-0 h-fit text-sm h-8 ml-4"
            radius="full"
            startContent={
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isDisabled ? "none" : "#229EAE"}
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke={isDisabled ? "currentColor" : "#224348"}
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
