import React from "react";
import { Button } from "antd";

const AppButton = ({ bgColor, buttonText, className }) => {
  return (
    <Button
      style={{
        backgroundColor: bgColor,
      }}
      className={className}
    >
      {buttonText}
    </Button>
  );
};

export default AppButton;
