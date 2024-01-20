import { Button } from "@nextui-org/react";
import React from "react";

const GoogleSigninBtn = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default GoogleSigninBtn;
