import React from "react";
import { Card } from "antd";

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
    </div>
  );
};

export default ExampleCard;
