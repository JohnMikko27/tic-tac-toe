const body = document.querySelector('body');
const winnerDisplay = document.querySelector('#winner-display');
const nameContainer = document.querySelector('#name-container');
const boardContainer = document.querySelector('#board-container');
const formContainer = document.querySelector('#form-container');
const form = document.querySelector('form');
const playerX = document.querySelector('#playerXName');
const playerO = document.querySelector('#playerOName');
const restartButton = document.querySelector('#restart');

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

restartButton.addEventListener('click', () => {
    winnerDisplay.textContent = 'Player X Turn';
    gameBoard.clearBoard();
    gameController.resetActivePlayer();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let playerXName = playerX.value;
    let playerOName = playerO.value;


    //put the eventhandlers in interfacecontroller object
    //change this so that the appropriate name is added when someone wins or loses

    /*let div1 = document.createElement('div');
    let div2 = document.createElement('div');

    div1.textContent = `${playerXName} is player X!`;
    div2.textContent = `${playerOName} is player O!`;

    nameContainer.appendChild(div1);
    nameContainer.appendChild(div2);
    body.appendChild(nameContainer);*/
    form.reset();
    formContainer.classList.toggle('hidden');
});

/*
----------------------------------------------------------------------------------------------------------------------------------------------------
*/

const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    let winner;
    const winningCombinations = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];

    const displayBoard = () => {
        for (let i = 0; i < board.length; i++) {
            let cell = document.createElement('div');
            cell.textContent = board[i];
            cell.classList.add('cell');
            cell.dataset.number = i;
            boardContainer.appendChild(cell);
        }
    };

    const updateBoard = () => {
        boardContainer.textContent = ' ';
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
    }

    const clearBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
        resetWinner();
        updateBoard();
    }

    const getWinner = () => {
        threeInARow();
        return winner;
    }

    //fixes bug where winner stayed as "X" or "O" which would make the playRound function return before reattaching eventListeners again 
    const resetWinner = () => winner = '';

    const isThereWinner = () => {
        if (winner) return true;
        return false;
    }

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
        winnerDisplay.textContent = 'Player X Turn!'
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
        
        const cells = document.querySelectorAll('.cell');

        cells.forEach(cell => cell.addEventListener('click', e => {
            if (e.target.textContent != "X" && e.target.textContent != "O") {
                gameBoard.addMarker(e.target.dataset.number, activePlayer);
                activePlayer = activePlayer == playerX ? playerO : playerX;
                if (gameBoard.isThereWinner()) return;
                winnerDisplay.textContent = `Player ${activePlayer.getMarker()} Turn!`
            }
        }));
    };

    const resetActivePlayer = () => {
        activePlayer = playerX;
    }

    return { playRound, resetActivePlayer};
})();

gameBoard.displayBoard();
gameController.playRound();