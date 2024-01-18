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
    if (e.target.value === "") {
      let arr = [...buttonValues];
      arr[e.target.id].value = "x";
      setButtonValues(arr);
      computerMove();
    }
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
    arr[move].value = "o";
    setButtonValues(arr);
  }

  // function switchActivePlayer() {
  //   activePlayer === "player" ? activePlayer = "cpu" : activePlayer = "player";
  // }

  // function checkWinner() {
  //   const winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];
  //   winningCombinations.forEach((combination));
  // }

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