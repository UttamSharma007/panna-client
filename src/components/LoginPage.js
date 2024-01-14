import React from "react";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  Image,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/home");
  };

  return (
    <div className="w-screen h-screen p-8 flex items-center justify-center bg-pxty-border-color">
      <Card className="py-[90px] pl-[40px] pr-[40px] bg-[#202020e0]">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <div className="font-bold text-[32px] text-cardWhite mb-5">
            Sign in to your account
          </div>
        </CardHeader>
        <CardBody className="overflow-visible">
          <Input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter email address"
            classNames={{
              input: ["placeholder:text-gray-900"],
              inputWrapper: ["p-0"],
            }}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.2) 2px 5px 12px",
              height: "100%",
              padding: "10px",
              borderRadius: "10px",
            }}
          />
          <Button
            onClick={navigateHome}
            className="bg-[#1A74E8] text-cardWhite font-bold mt-6"
            // style={{
            //   boxShadow: "rgba(0, 0, 0, 0.2) 2px 5px 12px",
            //   border: "none",
            //   borderRadius: "10px",
            //   color: "white",
            //   fontWeight: "bold",
            //   background: "#1A74E8",
            // }}
          >
            Log in
          </Button>
        </CardBody>
      </Card>
    </div>
    // <div
    //   className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8"
    //   // style={{ background: "white" }}
    // >
    //   <div
    //     className="max-w-sm w-full space-y-8 border py-16 px-6 rounded-3xl"
    //     style={{
    //       boxShadow: "rgba(0, 0, 0, 0.2) 2px 5px 12px",
    //       border: "none",
    //     }}
    //   >
    //     <div>
    //       <h2 className=" text-center text-3xl font-bold text-white">
    //         Sign in to your account
    //       </h2>
    //     </div>
    //     <div>
    //       <label htmlFor="email-address" className="sr-only">
    //         Email address
    //       </label>
    //       <Input
    //         id="email-address"
    //         name="email"
    //         type="email"
    //         autoComplete="email"
    //         required
    //         className="appearance-none rounded-none relative block w-full py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //         placeholder="Enter email address"
    //         classNames={{
    //           input: ["placeholder:text-gray-900"],
    //           inputWrapper: ["p-0"],
    //         }}
    //         style={{
    //           boxShadow: "rgba(0, 0, 0, 0.2) 2px 5px 12px",
    //           height: "100%",
    //           padding: "10px",
    //           borderRadius: "10px",
    //         }}
    //       />
    //     </div>

    //     <div>
    //       <Button
    //         onClick={navigateHome}
    //         className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //         style={{
    //           boxShadow: "rgba(0, 0, 0, 0.2) 2px 5px 12px",
    //           border: "none",
    //           borderRadius: "10px",
    //           color: "white",
    //           fontWeight: "bold",
    //           background: "#1A74E8",
    //         }}
    //       >
    //         Log in
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
}
