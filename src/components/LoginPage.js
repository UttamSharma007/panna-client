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
    <div className="w-screen p-8 flex items-center justify-center bg-pxty-dark-mid height h-fit">
      <Card
        className="pt-[60px] pb-[60px] pl-[40px] pr-[40px] bg-gradient-to-r from-[#082A22] via-[#082A22] to-[#07231c] max-w-[600px] rounded-[30px] mt-[9%]"
        style={{ boxShadow: "5px 5px 11px rgba(0, 0, 0, 0.5)" }}
      >
        <div className="flex justify-end w-full">
          <Select
            aria-label="Language"
            defaultSelectedKeys={["en-US"]}
            className="max-w-xs"
            classNames={{
              base: ["width", "w-1/4"],
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
            <span className="font-bold text-white text-4xl ml-2">
              Paññā (Knowledge)
            </span>
          </div>
          <Divider className="bg-pxty-light" />
          <section className="text-white text-4xl my-4">
            {t("Bridging Connections and Empowering Autistic Journeys")}
          </section>
          <section className="text-white text-xl">
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
                className="bg-[#0070EF] text-white rounded-full py-[25px] mt-[20px] text-[16px]"
                onClick={renderProps.onClick}
              >
                {t("Sign in with google")}
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
