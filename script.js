const boardContainer = document.querySelector('#board-container');

const gameBoard = (() => {
    const board = [['O', 'O', 'O'], ['X', 'X', 'X'], ['M', 'M', 'M']];

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

    const addMarker = (player) => {
        const cells = document.querySelectorAll('.cell');
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
        }))
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

    return { getBoard, displayBoard, addMarker, isTie };
})();

const player = (marker) => {
    const getMarker = () => marker;

    return { getMarker };
};

const gameController = (() => {
    const playRound = () => {

    }

    return { playRound };
})();

const jeff = player('X');
gameBoard.displayBoard();
gameBoard.addMarker(jeff);
