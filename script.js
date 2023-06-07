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

const boardContainer = document.querySelector('#board-container');

const player = (marker) => {
    const getMarker = () => marker;
    return { getMarker };
};

/*
----------------------------------------------------------------------------------------------------------------------------------------------------
*/

const gameBoard = (() => {
    let board = ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'];

    let currentPlayer;

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
        addMarker(currentPlayer);
    }

    const addMarker = (player) => {
        const cells = document.querySelectorAll('.cell');
        currentPlayer = player;
        cells.forEach(cell => cell.addEventListener('click', (e) => {
            if (e.target.textContent != 'X' && e.target.textContent != 'O') {
                board[e.target.dataset.number] = player.getMarker();
                updateBoard();
            }
        }));
        
    }

    return { displayBoard, addMarker, updateBoard };
})();
gameBoard.displayBoard();

let jeff = player('P')
gameBoard.addMarker(jeff);
/*
----------------------------------------------------------------------------------------------------------------------------------------------------
*/

const gameController = (() => {

})();