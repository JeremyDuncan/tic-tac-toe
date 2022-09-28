import Button from "@mui/material/Button";
import React from "react";

const Square = ({ selectSquare, index, space, playGame }) => {
  const handleClick = (i) => {
    if (playGame) {
      selectSquare(i);
    }
  };

  return (
    <Button
      variant="contained"
      className="square"
      onClick={() => handleClick(index)}
      sx={{ bgcolor: "green", fontSize: "4rem", border: "2px solid black" }}
    >
      {space}
    </Button>
  );
};
export default Square;
