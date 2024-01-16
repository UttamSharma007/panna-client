import React from "react";
import { Button, Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Image } from "@nextui-org/image";
import Logo from "../images/logo.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/home");
    // navigate("/login");
  };

  return (
    <div className="w-screen h-screen p-8 flex items-center justify-center bg-pxty-dark-mid">
      <Card className="pt-[60px] pb-[90px] pl-[40px] pr-[40px] bg-gradient-to-r from-[#082A22] via-[#082A22] to-[#07231c] max-w-[600px] rounded-[30px]">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"></CardHeader>
        <CardBody className="overflow-visible">
          <div className="flex items-center justify-center gap-x-1 mb-5">
            <Image
              src={Logo}
              width="100px"
              height="100px"
              className="rounded-full border border-1 border-[#000]"
            />
            <span className="font-bold text-white text-6xl ml-2">
              Paññā (Knowledge)
            </span>
          </div>
          <Divider className="bg-pxty-light" />
          <section className="text-white text-6xl my-4">
            Bridging Connections and Empowering Autistic Journeys
          </section>
          <section className="text-white text-3xl">
            <span className="text-white ">Paññā</span> is a compassionate and
            knowledgeable companion designed to provide valuable insights,
            guidance, and a sense of understanding for individuals and
            communities navigating the diverse spectrum of autism.
          </section>
          <Button
            onClick={navigateHome}
            className="text-cardWhite font-bold mt-6 rounded-full text-3xl py-[40px] "
            color="primary"
            size="lg"
          >
            Sign in with google
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
