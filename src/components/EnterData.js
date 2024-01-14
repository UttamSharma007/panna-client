import React, { useContext } from "react";
import Layout from "./Layout";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import TextInput from "./TextInput";
import { context } from "../App";

export const handleSearch = async (ctx, navigate) => {
  const {
    chatResponse,
    setChatResponse,
    enteredPrompt,
    setEnteredPrompt,
    setLibraryData,
    libraryData,
    setLoading,
    setCloseModal,
  } = ctx;
  try {
    setLoading(true);
    const response = await axios.post(
      "http://54.237.112.113:5000/handle_user_prompt",
      {
        prompt: enteredPrompt,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response.data.result.choices[0].message.content);
    let result = response.data.result.choices[0].message.content;
    if (result) {
      let outputString = result.replace(/\n/g, "<br/>");
      let mssgObject = {};
      mssgObject.id = uuidv4();
      mssgObject.question = enteredPrompt;
      mssgObject.answer = outputString;
      setChatResponse([...chatResponse, mssgObject]);
      libraryData.unshift(mssgObject);
      setLibraryData(libraryData);
      setEnteredPrompt("");
      setLoading(false);
      setCloseModal(true);
      navigate("/results");
    }
  } catch (error) {
    setLoading(false);
  }
};

const EnterData = () => {
  const ctx = useContext(context);
  const { openModal } = ctx;
  return (
    <Layout>
      <div className="rounded-md cw-m col-span-6 border border-pxty-border-color bg-pxty-chat-bg flex justify-center items-center">
        <div className="w-7/12">
          <div className="text-pxty-hg text-4xl pb-1 mb-8 text-center">
            Where knowledge begins
          </div>
          {!openModal && <TextInput />}
        </div>
      </div>
    </Layout>
  );
};
export default EnterData;
