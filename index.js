function cellClick() {
    let row = this.dataset.row;
    let col = this.dataset.col;
    
    board.place(row, col);
}

const newCell = (row, col) => {
    const dom = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    dom.addEventListener("click", cellClick);
    const updateDom = (symbol) => {
        dom.innerText = symbol;
    };
    const content = "";
    return {dom, content, row, col, updateDom};
};

const board = (() => {
    let turn = 0;
    let gameEnded = false;
    const dom = document.querySelector(".board");
    const grid = [];
    for (let row = 0; row < 3; row++) {
        grid.push([]);
        for (let col = 0; col < 3; col++) {
            let cell = newCell(row, col);
            grid[row].push(cell);
        }
    }
    const place = (row, col) => {
        if (gameEnded) return;
        const cell = grid[row][col];
        if (cell.content === "") {
            cell.content = (turn === 0) ? "x":"o";
            cell.updateDom(cell.content);
            if (checkwin(cell.content)) endGame(cell.content);
            else if (boardFull()) drawGame();
            else changeTurn();
        }
    };
    const checkwin = (symbol) => {
        for (let row = 0; row < 3; row++) {
            let found = true;
            for (let col = 0; col < 3; col++) {
                if (grid[row][col].content != symbol) found = false;
            }
            if (found) return true;
        }

        for (let col = 0; col < 3; col++) {
            let found = true;
            for (let row = 0; row < 3; row++) {
                if (grid[row][col].content !== symbol) found = false;
            }
            if (found) return true;
        }

        let found = true;
        for (let offset = 0; offset < 3; offset++) {
            if (grid[offset][offset].content !== symbol) found = false;
        }

        if (found) return true;

        found = true;
        for (let offset = 0; offset < 3; offset++) {
            if (grid[2-offset][offset].content !== symbol) found = false;
        }

        return found;
    };

    const endGame = (symbol) => {
        const heading = document.querySelector("h1");
        heading.innerText = `${symbol.toUpperCase()} has won the Game !!`;
        gameEnded = true;
    };

    const boardFull = () => {
        for (let row = 0; row < 3; row++)
        for (let col = 0; col < 3; col++)
        if (grid[row][col].content === "") return false;
        return true;
    };

    const drawGame = () => {
        const heading = document.querySelector("h1");
        heading.innerText = "The Game has Drawn";
        gameEnded = true;
    };
    const changeTurn = () => turn = (turn+1)%2;
    return {dom, grid, changeTurn, place, checkwin};
})();
