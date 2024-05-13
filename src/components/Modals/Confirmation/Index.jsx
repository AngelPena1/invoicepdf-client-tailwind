import React from "react";
import Form from "./Form";

const Index = ({ title, paragraph, btnLabel, onHide, onClick }) => {
  return (
    <Form
      title={title}
      paragraph={paragraph}
      btnLabel={btnLabel}
      onHide={onHide}
      onClick={onClick}
    />
  );
};

export default Index;
