import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Chip,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Image } from "@nextui-org/image";
import Logo from "../images/logo.png";
import { context } from "../App";
import GoogleLogin from "@stack-pulse/next-google-login";
import { jwtDecode } from "jwt-decode";
import GoogleSigninBtn from "./GoogleSigninBtn";
import axios from "axios";

export default function LoginPage() {
  const ctx = useContext(context);
  const { t } = useTranslation();
  const { language, setLanguage, signerData, setSignerData } = ctx;
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const navigateHome = () => {
    navigate("/home");
    // navigate("/login");
  };
  const responseMessage = (response) => {
    if (response) {
      console.log("response", response);
      // const userObject = jwtDecode(response.credential);
      setSignerData(response?.profileObj);
      console.log("response", response);
      navigate("/home");
    }
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  const languages = [
    { value: "English", code: "en-US" },
    { value: "Spanish", code: "es-US" },
  ];
  // const signIn = useGoogleLogin({
  //   clientId:
  //     "412833534919-5etl75bd9mmfnelsibi9efvpdk5ejmkl.apps.googleusercontent.com",
  //   onSuccess: (tokenResponse) => {
  //     console.log(tokenResponse);
  //     setUser(tokenResponse);
  //   },
  // });
  // useEffect(() => {
  //   const getUser = async () => {
  //     let response = null;
  //     try {
  //       response = await axios.get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${user.access_token}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       );
  //       console.log("response", response);
  //       setSignerData(response.data);
  //       navigate("/home");
  //     } catch (error) {
  //       console.log(error.response);
  //     }
  //   };
  //   if (Object.keys(user).length > 0) {
  //     getUser();
  //   }
  // }, [user]);
  return (
    <div className="w-screen p-5 sm:p-8 flex items-center justify-center bg-pxty-dark-mid height h-fit">
      <Card
        className="pt-[60px] pb-[60px] pl-[20px] sm:pl-[40px] pr-[20px] sm:pr-[40px] bg-gradient-to-r from-[#082A22] via-[#082A22] to-[#07231c] max-w-[600px] rounded-[30px] mt-[7%]"
        style={{ boxShadow: "5px 5px 11px rgba(0, 0, 0, 0.5)" }}
      >
        <div className="flex justify-end w-full">
          <Select
            aria-label="Language"
            defaultSelectedKeys={[language]}
            className="max-w-xs"
            classNames={{
              base: ["width", "w-2/4", "sm:1/4"],
              trigger: [
                "bg-pxty-mid",
                "text-white",
                "hover:bg-pxty-mid",
                "hover:text-[#000]",
              ],
            }}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((language) => (
              <SelectItem key={language.code} value={language.code}>
                {language.value}
              </SelectItem>
            ))}
          </Select>
        </div>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"></CardHeader>
        <CardBody className="overflow-visible">
          <div className="flex items-center justify-center gap-x-1 mb-5">
            <Image
              src={Logo}
              width="100px"
              height="100px"
              className="rounded-full border border-1 border-[#000]"
            />
            <span className="font-bold text-white text-2xl sm:text-3xl md:text-4xl ml-2">
              {t("Paññā (Knowledge)")}
            </span>
          </div>
          <Divider className="bg-pxty-light" />
          <section className="text-white text-2xl sm:text-3xl md:text-4xl my-4">
            {t("Bridging Connections and Empowering Autistic Journeys")}
          </section>
          <section className="text-white text-sm sm:text-lg md:text-xl">
            <span className="text-white ">Paññā</span>
            {` `}
            {t(
              "is a compassionate and knowledgeable companion designed to provide valuable insights,guidance, and a sense of understanding for individuals and communities navigating the diverse spectrum of autism."
            )}
          </section>
          {/* <Button
            onClick={navigateHome}
            className="text-cardWhite font-bold mt-6 rounded-full text-xl py-[30px] "
            color="primary"
            size="lg"
          > */}
          {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
          {/* Sign in with google
          </Button> */}

          <GoogleLogin
            clientId="412833534919-5etl75bd9mmfnelsibi9efvpdk5ejmkl.apps.googleusercontent.com"
            render={(renderProps) => (
              <GoogleSigninBtn
                className="bg-[#0070EF] text-white rounded-full py-[25px] mt-[20px] text-[18px]"
                onClick={renderProps.onClick}
              >
                {t("Sign in with google")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="25px"
                  height="25px"
                  viewBox="0 0 48 48"
                  stroke="#fff"
                  strokeWidth="1.25"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1565C0"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
              </GoogleSigninBtn>
            )}
            // buttonText="Login"
            onSuccess={(resp) => responseMessage(resp)}
            // onFailure={console.log}
            cookiePolicy={"single_host_origin"}
          />
        </CardBody>
      </Card>
    </div>
  );
}
