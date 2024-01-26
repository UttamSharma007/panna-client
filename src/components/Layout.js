import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="grid grid-cols-12 height h-full overflow-auto bg-pxty-dark-mid">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default Layout;
