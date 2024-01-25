import React, { useContext, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import TextInput from "./TextInput";
import { useTranslation } from "react-i18next";
import { context } from "../App";

// if (process.env.NODE_ENV === "development") {
//   axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
// }

// const agent = new https.Agent({
//   rejectUnauthorized: false,
//   requestCert: false,
//   agent: false,
// });

// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   responseType: 'json',
//   withCredentials: true,
//   httpsAgent: agent
// });

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
    navigate("/results");
    const response = await axios.post(
      "http://3.19.203.187:5001/handle_user_prompt",
      {
        prompt: enteredPrompt,
        rejectUnauthorized: false,
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
      // navigate("/results");
    }
  } catch (error) {
    console.log(error.response);
    setLoading(false);
  }
};

const EnterData = () => {
  const ctx = useContext(context);
  const { t } = useTranslation();
  const { setActivePage, openModal } = ctx;
  useEffect(() => {
    setActivePage("home");
  }, []);
  return (
    <Layout>
      <div className="rounded-md cw-m col-span-11 sm:col-span-9 lg:col-span-10 border border-pxty-light bg-pxty-dark flex justify-center items-center">
        <div className="w-9/12 sm:w-7/12">
          <div className="text-pxty-hg text-2xl md:text-3xl lg:text-4xl pb-1 mb-8 text-center">
            {t("Where knowledge begins")}
          </div>
          {!openModal && <TextInput />}
        </div>
      </div>
    </Layout>
  );
};
export default EnterData;
