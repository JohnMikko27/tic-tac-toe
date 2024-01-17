import { useState } from "react";
import "./index.css";
import Score from "./components/Score";
import ButtonContainer from "./components/ButtonContainer";

function App() {
  const [players, setPlayers] = useState([{name: "player1", score: 4}, {name: "player2", score: 7}]);
  const [buttonValues, setButtonValues] = useState([
    {value: "", id: 1}, {value: "", id: 2}, 
    {value: "", id: 3}, {value: "", id: 4}, 
    {value: "", id: 5}, {value: "", id: 6}, 
    {value: "", id: 7}, {value: "", id: 8}, 
    {value: "", id: 9}
  ]);


  const coordsPlaced = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

  let activePlayer = "player";

  function placeMarker(e) {
    console.log("dataset: " + e.target.dataset.number);
    if (coordsPlaced[e.target.dataset.number !== "-"]) return;
    if (activePlayer === "player") {
      e.target.textContent = "x";
      coordsPlaced[e.target.dataset.number] = "x";
      switchActivePlayer();
      computerMove();
    }
   
    console.log(coordsPlaced);
  }

  function computerMove() {
    let counter = 0;
    for (let i = 0; i < coordsPlaced.length; i++) {
      if (coordsPlaced[i] === "-") counter++;
    }
    if (counter === 1) return;
    let move;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      move = Math.floor(Math.random() * 9);
      if (coordsPlaced[move] === "-") break;
    }
    document.querySelector(`button[data-number="${move}"]`).textContent = "o";
    coordsPlaced[move] = "o";
    switchActivePlayer();
  }

  function switchActivePlayer() {
    activePlayer === "player" ? activePlayer = "cpu" : activePlayer = "player";
  }

  function checkWinner() {
    const winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];
    winningCombinations.forEach((combination));
  }

  return (
    // <div className="boardContainer">
    //   <button data-number={0} onClick={(e) => placeMarker(e)}>1</button>
    //   <button data-number={1} onClick={(e) => placeMarker(e)}>2</button>
    //   <button data-number={2} onClick={(e) => placeMarker(e)}>3</button>
    //   <button data-number={3} onClick={(e) => placeMarker(e)}>4</button>
    //   <button data-number={4} onClick={(e) => placeMarker(e)}>5</button>
    //   <button data-number={5} onClick={(e) => placeMarker(e)}>6</button>
    //   <button data-number={6} onClick={(e) => placeMarker(e)}>7</button>
    //   <button data-number={7} onClick={(e) => placeMarker(e)}>8</button>
    //   <button data-number={8} onClick={(e) => placeMarker(e)}>9</button>
    // </div>
    <div>
      <Score players={players}/>
      <ButtonContainer buttonValues={buttonValues}/>
    </div>
  );
}

export default App;
