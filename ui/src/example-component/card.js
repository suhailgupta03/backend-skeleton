import React from "react";
import { Card } from "antd";
import AppButton from "../app-components/button";

const ExampleCard = () => {
  /**
   * The following shows a HOC (Higher Order Component)
   * that wraps the Ant Design Card component.
   */
  const style = {
    width: "300",
  };
  return (
    <div style={style}>
      <Card title="Example Card" bordered={false}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>

      <AppButton
        bgColor={"orange"}
        buttonText={"Click Me"}
        className={"example-button"}
      />
    </div>
  );
};

export default ExampleCard;
