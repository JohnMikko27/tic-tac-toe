const body = document.querySelector("body");
const winnerDisplay = document.querySelector("#winner-display");
const nameContainer = document.querySelector("#name-container");
const boardContainer = document.querySelector("#board-container");
const restartButton = document.querySelector("#restart");

const player = (marker) => {
  const getMarker = () => marker;
  return { getMarker };
};

const interfaceController = (() => {
  const displayWinner = (winner) => {
    if (winner == "Tie") {
      winnerDisplay.textContent = "It's a tie game!";
    } else {
      winnerDisplay.textContent = `Player ${winner} is the winner!`;
    }
  };
  return { displayWinner };
})();

restartButton.addEventListener("click", () => {
  winnerDisplay.textContent = "Player X Turn";
  gameBoard.clearBoard();
  gameController.resetActivePlayer();
});

/*
----------------------------------------------------------------------------------------------------------------------------------------------------
*/

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let winner;
  const winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];

  const displayBoard = () => {
    for (let i = 0; i < board.length; i++) {
      let cell = document.createElement("div");
      cell.textContent = board[i];
      cell.classList.add("cell");
      cell.dataset.number = i;
      boardContainer.appendChild(cell);
    }
  };

  const updateBoard = () => {
    boardContainer.textContent = " ";
    displayBoard();
    // reattaches eventListeners
    gameController.playRound();
  };

  const addMarker = (index, player) => {
    board[index] = player.getMarker();
    updateBoard();
  };

  const isTie = () => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] == "X" || board[i] == "O") continue;
      return false;
    }
    return true;
  };

  const threeInARow = () => {
    for (let i = 0; i < winningCombinations.length; i++) {
      for (let j = 0; j < 1; j++) {
        if (board[winningCombinations[i][j]] == "X" && board[winningCombinations[i][j+1]] == "X" && board[winningCombinations[i][j+2]] == "X") {
          winner = "X";
        } else if (board[winningCombinations[i][j]] == "O" && board[winningCombinations[i][j+1]] == "O" && board[winningCombinations[i][j+2]] == "O") {
          winner = "O";
        }
      }
    }
  };

  const clearBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
    resetWinner();
    updateBoard();
  };

  const getWinner = () => {
    threeInARow();
    return winner;
  };

  //fixes bug where winner stayed as "X" or "O" which would make the playRound function return before reattaching eventListeners again 
  const resetWinner = () => winner = "";

  const isThereWinner = () => {
    if (winner) return true;
    return false;
  };

  return { displayBoard, addMarker, updateBoard, isTie, getWinner, clearBoard, isThereWinner };
})();

/*
----------------------------------------------------------------------------------------------------------------------------------------------------
*/

const gameController = (() => {
  let playerX = player("X");
  let playerO = player("O");

  let activePlayer = playerX;
    
  const playRound = () => {
    winnerDisplay.textContent = "Player X Turn!";
    if (gameBoard.getWinner() == "X") {
      interfaceController.displayWinner("X");
      return;
    } else if (gameBoard.getWinner() == "O") {
      interfaceController.displayWinner("O");
      return;
    } else if (gameBoard.isTie()) {
      interfaceController.displayWinner("Tie");
      return;
    }
        
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => cell.addEventListener("click", e => {
      if (e.target.textContent != "X" && e.target.textContent != "O") {
        gameBoard.addMarker(e.target.dataset.number, activePlayer);
        activePlayer = activePlayer == playerX ? playerO : playerX;

        // To not show the player turn message when game is over
        if (gameBoard.isThereWinner()) return;
        else if (gameBoard.isTie()) return;

        winnerDisplay.textContent = `Player ${activePlayer.getMarker()} Turn!`;
      }
    }));
  };

  const resetActivePlayer = () => {
    activePlayer = playerX;
  };

  const game = () => {
    gameBoard.displayBoard();
    playRound();
  };

  return { playRound, resetActivePlayer, game};
})();

gameController.game();

const computer = (() => {
  // use minimax algorithm to create an unbeatable AI
  /*
        * use recursion until the code reaches an end/terminal state where someone wins or loses (cpu = +10, playerwin = -10, tie = 0)
        *  need an array of available spots to loop over and check possible moves to pick
        * It only keeps recursing until someone wins or game is tied
        * make sure to recurse through the newly updated board
    */
})();