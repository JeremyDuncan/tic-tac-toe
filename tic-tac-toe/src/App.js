import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

import React, { useState } from "react";
import "./App.css";
import Choices from "./components/Choices";
import Square from "./components/Square";

const App = () => {
  // tic tac toe board
  const [squares, setSquares] = useState(Array(9).fill(null));
  // used to flip-flop between player 1 and 2
  const [playerOneTurn, setPlayerOneTurn] = useState(true);
  // used to start or stop game
  const [playGame, setPlayGame] = useState(true);
  // used to display messages if Win/Lose
  const [message, setMessage] = useState("");
  // displays messages for player instructions
  const [playerMessage, setPlayerMessage] = useState(
    <Typography variant="h4">Player One, Select your Marker</Typography>
  );
  // Markers choices "X's and O's"
  const [marker, setMarker] = useState([
    "😎",
    "🥸",
    "🤯",
    "😱",
    "😈",
    "💩",
    "👻",
    "🎃",
    "👽",
  ]);
  // Holds Player Choice for Markers
  const [playerOneMarker, setPlayerOneMarker] = useState([""]);
  const [playerTwoMarker, setPlayerTwoMarker] = useState([""]);

  // resets back to start values
  const reset = () => {
    setSquares(Array(9).fill(null));
    setPlayerOneTurn(true);
    setPlayGame(true);
    setMessage("");
    setPlayerMessage(
      <Typography variant="h4">Player One, Select your Marker</Typography>
    );
    setPlayerOneMarker("");
    setPlayerTwoMarker("");
    setMarker(["😎", "🥸", "🤯", "😱", "😈", "💩", "👻", "🎃", "👽"]);
  };

  // Marker Select Logic
  // used to save player marker into state when game begins
  const selectMarker = (index) => {
    if (playerOneTurn) {
      setPlayerOneMarker(marker[index]);
      setPlayerOneTurn(false);
      setPlayerMessage(
        <Typography variant="h4">Player Two, Select your Marker</Typography>
      );
    } else {
      setPlayerTwoMarker(marker[index]);
      setPlayerOneTurn(true);
      // after player 2 selects marker...
      // change message to show it's player 1's turn to play
      setPlayerMessage(<Typography variant="h4">Player One's Turn</Typography>);

      // once player 1 and player 2 select their marker..make Markers
      //  (Emojis) go away
      setMarker([]);
    }
  };

  // game board click logic
  const selectSquare = (index) => {
    if (squares[index] === null) {
      const updateSquare = [...squares];

      if (playerOneTurn) {
        updateSquare[index] = playerOneMarker;
        setPlayerOneTurn(false);
        setPlayerMessage(
          <Typography variant="h4">Player Two's Turn</Typography>
        );
      } else {
        updateSquare[index] = playerTwoMarker;
        setPlayerOneTurn(true);
        setPlayerMessage(
          <Typography variant="h4">Player One's Turn</Typography>
        );
      }

      setSquares(updateSquare);
    }
  };

  // returns the Emoji if player makes winning row, column, or diagnal
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // if player wins, return the winning Marker
        return squares[a];
      }
    }
    //else return null
    return null;
  };

  // if playing game...
  if (playGame) {
    // call function to check if player won
    // if player did win...
    // then compare the marker with player 1's Marker (emoji)
    // or player 2's emoji
    if (calculateWinner(squares) === playerOneMarker) {
      //change message for player that wins
      setMessage(
        <Typography variant="h4" className="message">
          Player 1 won
        </Typography>
      );
      // tell game to stop
      setPlayGame(false);
    } else if (calculateWinner(squares) === playerTwoMarker) {
      //change message for player that wins
      setMessage(
        <Typography variant="h4" className="message">
          Player 2 won
        </Typography>
      );
      // tell game to stop
      setPlayGame(false);
    } else if (squares.indexOf(null) === -1) {
      setMessage(
        <Typography variant="h4" className="message">
          No More Turns!
        </Typography>
      );
      setPlayGame(false);
    }
  }

  return (
    <div className="App">
      <Typography variant="h2">Tic Tac Toe</Typography>
      {playerMessage}
      <div className="board">
        <div className="choiceContainer">
          {/* // set like game goard..but with the Marker selection */}
          {marker.map((space, index) => {
            return (
              <Choices
                selectMarker={selectMarker}
                index={index}
                space={space}
                key={index}
              />
            );
          })}
        </div>
        {/* // Win/Lose Message */}
        {message}
        {/* // Game Board */}
        {squares.map((space, index) => {
          return (
            <Square
              selectSquare={selectSquare}
              index={index}
              space={space}
              key={index}
              playGame={playGame}
            />
          );
        })}
      </div>
      {/* // reset button */}
      <Button
        sx={{
          bgcolor: "green",
          border: "2px solid black",
          p: 2,
          width: "7rem",
          fontSize: "1.2rem",
        }}
        elevation={22}
        variant="contained"
        className="btn"
        onClick={reset}
      >
        Reset
      </Button>
    </div>
  );
};

export default App;
