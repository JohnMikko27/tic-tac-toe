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

  const [index, setIndex] = useState(0);

  function handleClick(e) {
    if (e.target.value === "") {
      let arr = [...buttonValues];
      arr[e.target.id].value="ok";
      setButtonValues(arr);
    }
  }

  // function computerMove() {
  //   let counter = 0;
  //   for (let i = 0; i < coordsPlaced.length; i++) {
  //     if (coordsPlaced[i] === "-") counter++;
  //   }
  //   if (counter === 1) return;
  //   let move;
  //   // eslint-disable-next-line no-constant-condition
  //   while (true) {
  //     move = Math.floor(Math.random() * 9);
  //     if (coordsPlaced[move] === "-") break;
  //   }
  //   document.querySelector(`button[data-number="${move}"]`).textContent = "o";
  //   coordsPlaced[move] = "o";
  //   switchActivePlayer();
  // }

  // function switchActivePlayer() {
  //   activePlayer === "player" ? activePlayer = "cpu" : activePlayer = "player";
  // }

  // function checkWinner() {
  //   const winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];
  //   winningCombinations.forEach((combination));
  // }


  console.log("rendering buttonValues");
  console.log(buttonValues);

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