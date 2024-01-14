import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="grid grid-cols-8 height h-full overflow-auto">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
