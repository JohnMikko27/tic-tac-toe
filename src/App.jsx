import { useState } from "react";
import "./index.css";
import Score from "./components/Score";
import ButtonContainer from "./components/ButtonContainer";

function App() {
  const [players, setPlayers] = useState([{name: "player1", score: 4}, {name: "player2", score: 7}]);
  const [buttonValues, setButtonValues] = useState([
    {value: "", id: 0},
    {value: "", id: 1}, {value: "", id: 2}, 
    {value: "", id: 3}, {value: "", id: 4}, 
    {value: "", id: 5}, {value: "", id: 6}, 
    {value: "", id: 7}, {value: "", id: 8}, 
  ]);

  function handleClick(e) {
    if (buttonValues[e.target.id].value !== "") return;
    let arr = [...buttonValues];
    arr[e.target.id].value = "X";
    setButtonValues(arr);
    computerMove();
    checkWinner();
  }

  function computerMove() {
    let counter = 0;
    for (let i = 0; i < buttonValues.length; i++) {
      if (buttonValues[i].value === "") counter++;
    }
    if (counter === 0) return;
    let move;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      move = Math.floor(Math.random() * 9);
      if (buttonValues[move].value === "") break;
    }
    let arr = [...buttonValues];
    arr[move].value = "O";
    setButtonValues(arr);
  }

  function threeInARow() {
    const winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];
    for (let i = 0; i < winningCombinations.length; i++) {
      for (let j = 0; j < 1; j++) {
        if (buttonValues[winningCombinations[i][j]].value === "X" && buttonValues[winningCombinations[i][j+1]].value === "X" && buttonValues[winningCombinations[i][j+2]].value === "X") {
          return "X";
        } else if (buttonValues[winningCombinations[i][j]].value === "O" && buttonValues[winningCombinations[i][j+1]].value === "O" && buttonValues[winningCombinations[i][j+2]].value === "O") {
          console.log("player O has won");
          return "O";
        }
      }
    }
  }

  function isTie() {
    for (let i = 0; i < buttonValues.length; i++) {
      if (buttonValues[i].value === "X" || buttonValues[i].value === "O") continue;
      return false;
    }
    console.log("it is a tie");
    return true;
  }

  function checkWinner() {
    if (isTie()) {
      console.log("draw");
      disableButtons();
    }
    else if (threeInARow() === "X") {
      console.log("player x won");
      disableButtons();
    }
    else if (threeInARow() === "O") {
      console.log("player o won");
      disableButtons();
    }
    else console.log("no winner");
  }

  function disableButtons() {
    const buttons = document.querySelectorAll(".button");
    buttons.forEach((button) => button.disabled = true);
  }

  //   create a game over function that displays the winner and disabled the button
  // add display 
  return (
    <div>
      <Score players={players}/>
      <ButtonContainer handleClick={handleClick} buttonValues={buttonValues}/>
    </div>
  );
}

export default App;


// maybe its because react cant detect that it is a new object, 
// so i have to make sure that it detects its a new object and to check react docs about this