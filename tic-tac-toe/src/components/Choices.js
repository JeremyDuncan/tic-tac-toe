import Button from "@mui/material/Button";
import React from "react";

const Choices = ({ selectMarker, index, space }) => {
  const handleClick = () => {
    selectMarker(index);
  };

  return (
    <Button
      sx={{ fontSize: "4rem" }}
      className="choices"
      onClick={() => handleClick()}
    >
      {space}
    </Button>
  );
};
export default Choices;
