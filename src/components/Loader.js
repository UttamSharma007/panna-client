import React from "react";
import loaderGif from "../images/loader.gif";

const Loader = () => {
  return (
    <div className="absolute z-[300] w-screen h-screen bg-[#0000005c]">
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ">
        <img src={loaderGif} alt="loading.." className="w-[70px] h-[70px]" />
        <div className="text-xl animate-pulse pt-1">Loading...</div>
      </div>
    </div>
  );
};

export default Loader;
