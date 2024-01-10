import { useState } from "react";
import "./index.css";

function App() {
  let coordsPlaced = [];

  let activePlayer = "player";

  function placeMarker(e) {
    console.log("dataset: " + e.target.dataset.number);
    const flag = coordsPlaced.find((element) => element === e.target.dataset.number);
    if (flag) return;
    coordsPlaced.push(e.target.dataset.number);
    if (activePlayer === "player") {
      e.target.textContent = "x";
      switchActivePlayer();
    } else {
      e.target.textContent = "o";
      switchActivePlayer();
    }
    console.log(coordsPlaced);
  }

  function computerMove() {
    console.log(Math.floor(Math.random() * 9));
  }

  function switchActivePlayer() {
    activePlayer === "player" ? activePlayer = "cpu" : activePlayer = "player";
  }

  return (
    <div className="boardContainer">
      <button data-number={0} onClick={(e) => placeMarker(e)}>1</button>
      <button data-number={1} onClick={(e) => placeMarker(e)}>2</button>
      <button data-number={2} onClick={(e) => placeMarker(e)}>3</button>
      <button data-number={3} onClick={(e) => placeMarker(e)}>4</button>
      <button data-number={4} onClick={(e) => placeMarker(e)}>5</button>
      <button data-number={5} onClick={(e) => placeMarker(e)}>6</button>
      <button data-number={6} onClick={(e) => placeMarker(e)}>7</button>
      <button data-number={7} onClick={(e) => placeMarker(e)}>8</button>
      <button data-number={8} onClick={(e) => placeMarker(e)}>9</button>
    </div>
  );
}

export default App;
