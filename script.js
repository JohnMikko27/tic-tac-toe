/*const boardContainer = document.querySelector('#board-container');

const gameBoard = (() => {
    const board = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']];

    const getBoard = () => board;

    const displayBoard = () => {
        let counter = 0;
        for (let i = 0; i < board.length; i++) {
            const row = document.createElement('div');
            for (let j = 0; j < board[i].length; j++) {
                const cell = document.createElement('div');
                cell.dataset.number = counter++;
                cell.textContent = board[i][j];
                cell.classList.add('cell');
                row.appendChild(cell);
            }
            boardContainer.appendChild(row);
        }
    }

    const updateBoard = () => {
        boardContainer.textContent = ' ';
        displayBoard();
    }

    const getCellNumber = () => {
        //on click, gets that cells dataset.number which will be used in pair with the getCurrentplayer to use in addmarker, 
        //where add marker will change the board at that index with the corresponding marker
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.addEventListener('click', e => {
            return e.target.dataset.number;
        }));
    }

    const addMarker = (cellNumber, playerName) => {
        /*const cells = document.querySelectorAll('.cell');

        cells.forEach(cell => cell.addEventListener('click', e => {
            //console.log(e.target.dataset.number)
            if (e.target.textContent != 'X' && e.target.textContent != 'O') {
                e.target.textContent = player.getMarker();

                // to display updated board array
                let counter = 0;
                for (let i = 0; i < board.length; i++) {
                    for (let j = 0; j < board[i].length; j++) {
                        if (counter == e.target.dataset.number) {
                            board[i][j] = player.getMarker();
                        }
                        counter++;
                    }
                }
            }
        }))*/
       /* let counter = 0;
        for (let i = 0 ; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (counter == cellNumber) {
                    board[i][j] = playerName.getMarker();
                    updateBoard();
                }
                counter++;
            }
        }
    }

    const isTie = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if ((board[i][j]) == 'X' || board[i][j] == 'O') {
                    continue;
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    return { getBoard, displayBoard, addMarker, isTie, getCellNumber };
})();

const player = (marker) => {
    const getMarker = () => marker;

    return { getMarker };
};

const gameController = (() => {
    let playerX = player("X");
    let playerO = player("O");
    let activePlayer = playerX;
    const playRound = () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.addEventListener('click', e => {
            gameBoard.addMarker(e.target.dataset.number, activePlayer);
            activePlayer = activePlayer == playerX ? playerO : playerX;
        }))
    }

    return { playRound };
})();

gameBoard.displayBoard();
gameController.playRound();*/

const body = document.querySelector('body');
const winnerDisplay = document.querySelector('#winner-display');
const nameContainer = document.querySelector('#name-container');
const boardContainer = document.querySelector('#board-container');
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
        let message = document.createElement('div');
        if (winner == "Tie") {
            winnerDisplay.textContent = "It's a tie game!";
        } else {
            winnerDisplay.textContent = `Player ${winner} is the winner`;
        }
    };

    return { displayWinner };
})();

restartButton.addEventListener('click', () => {
    winnerDisplay.textContent = ' ';
    gameBoard.clearBoard();
    gameController.resetActivePlayer();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let playerXName = playerX.value;
    let playerOName = playerO.value;

    let div1 = document.createElement('div');
    let div2 = document.createElement('div');

    div1.textContent = `${playerXName} is player X!`;
    div2.textContent = `${playerOName} is player O!`;

    nameContainer.appendChild(div1);
    nameContainer.appendChild(div2);
    body.appendChild(nameContainer);
    form.reset();
});

/*
----------------------------------------------------------------------------------------------------------------------------------------------------
*/

const gameBoard = (() => {
    let board = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];
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
                    console.log('player X has won');
                    winner = "X";
                } else if (board[winningCombinations[i][j]] == "O" && board[winningCombinations[i][j+1]] == "O" && board[winningCombinations[i][j+2]] == "O") {
                    console.log('player O has won');
                    winner = "O";
                }
            }
        }
    }

    const clearBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '_';
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

    return { displayBoard, addMarker, updateBoard, isTie, getWinner, clearBoard };
})();


/*
----------------------------------------------------------------------------------------------------------------------------------------------------
*/

const gameController = (() => {
    let playerX = player("X");
    let playerO = player("O");

    let activePlayer = playerX;

    const playRound = () => {
        if (gameBoard.getWinner() == "X") {
            console.log('player x has won');
            interfaceController.displayWinner("X");
            return;
        } else if (gameBoard.getWinner() == "O") {
            console.log('player o has won');
            interfaceController.displayWinner("O");
            return;
        } else if (gameBoard.isTie()) {
            console.log('game is a tie');
            interfaceController.displayWinner("Tie");
            return;
        }

        const cells = document.querySelectorAll('.cell');

        cells.forEach(cell => cell.addEventListener('click', e => {
            if (e.target.textContent != "X" && e.target.textContent != "O") {
                gameBoard.addMarker(e.target.dataset.number, activePlayer);
                activePlayer = activePlayer == playerX ? playerO : playerX;
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