import React, { useContext, useEffect } from "react";
import Layout from "./Layout";
import { context } from "../App";

const Discover = () => {
  const ctx = useContext(context);
  const { setActivePage } = ctx;
  useEffect(() => {
    setActivePage("discover");
  }, []);
  return (
    <Layout>
      <div className="rounded-md cw-m col-span-6 border border-pxty-light bg-pxty-dark">
        <div className="text-xl p-4">Discover page</div>
      </div>
    </Layout>
  );
};

export default Discover;
