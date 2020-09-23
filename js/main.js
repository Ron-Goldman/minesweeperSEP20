'use strict';

var gBoard;
var BOMB = '💣'
var FLAG = '🚩'
var gBombs = []
var gIsFirstClick = true;
var gFlags = 3

var gLevel = [
    { rows: 4, cols: 6, mines: 3 },
    { rows: 9, cols: 12, mines: 8 },
    { rows: 13, cols: 20, mines: 18 }
]

var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gCurrLevel = gLevel[0]
disableContextMenu()

function init() {
    gIsFirstClick = true;
    gBombs = []
    gGame.isOn = true;
    gFlags = gCurrLevel.mines
    gBoard = buildBoard(gCurrLevel.rows, gCurrLevel.cols)
    createMines(gCurrLevel.mines, gBoard)
    fillBoard(gBoard)
    renderBoard(gBoard)
}

function chooseYourLevel(level) {
    gCurrLevel = gLevel[level]
    
    init()
    //console.log(gCurrLevel);
}


function buildBoard(ROW, COL) {
    var board = [];
    for (var i = 0; i < ROW; i++) {
        board[i] = [];
        for (var j = 0; j < COL; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };

            board[i][j] = cell;
        }
    }
    return board;
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {

            strHTML += `\t<td oncontextmenu="markFlag(this,${i},${j})" onClick="cellClicked(this,${i},${j})" class="cell ${i} - ${j} ">\n`
            if (board[i][j].isShown && board[i][j].isMine) {
                strHTML += BOMB;
            } else if (board[i][j].isShown) {
                strHTML += board[i][j].minesAroundCount
            } else if (board[i][j].isMarked) {
                strHTML += FLAG
            }
            strHTML += `\t</td>\n`;
        }
        strHTML += '</tr>\n';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elCell, i, j) {
    if ( gBoard[i][j].isMarked) return;
    elCell.innerText = (gIsFirstClick && gBoard[i][j].isMine) ? init() : gBoard[i][j].minesAroundCount;
    gIsFirstClick = false;
    if (gBoard[i][j].isShown || !gGame.isOn) return;
    var cell = gBoard[i][j]
    cell.isShown = true;
    elCell.innerText = (cell.isMine) ? BOMB : cell.minesAroundCount;
    elCell.classList.add('cell-clicked')
    if (cell.isMine) {

        elCell.classList.add('cell-clicked')
        elCell.classList.add('bomb')
        setTimeout(() => {
            gameOver(gBoard)
        }, 2000);
    }

}

function markFlag(elCell, i, j) {
    var cell = gBoard[i][j]
    if (!cell.isShown) { 

    elCell.innerText = FLAG
    var cell = gBoard[i][j]
    cell.isShown = true;
    cell.isMarked = true;
    elCell.classList.add('cell-clicked')
    console.log(elCell);
    console.log(cell);
    }

}

function gameOver(board) {
    //showMines(gBombs);
    gGame.isOn = false;
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j].isShown = true
        }
    }
    renderBoard(board)
}

function createMines(numOfMines, board) {
    while (gBombs.length !== gCurrLevel.mines) {
        for (var i = 0; i < numOfMines; i++) {
            var num1 = getRandomIntInclusive(0, board.length - 1);
            var num2 = getRandomIntInclusive(0, board[num1].length - 1);

            gBoard[num1][num2].isMine = true
            var bombLocation = { i: num1, j: num2 }
            gBombs.push(bombLocation)
            for (var j = 0; j < gBombs.length; j++) {
                if (gBombs[j].i === num1 && gBombs[j].j === j) console.log(bombLocation, 'exists');
            }
        }
    }
    console.log('location of bombs: ', gBombs);
}

function fillBoard(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j].minesAroundCount = getNeighborsCount(i, j, board)
        }
    }
}

function showMines(bombs) {

    for (var i = 0; i < gBombs.length; i++) {

        gBoard[bombs[i].i][bombs[i].j].isShown = true;
    }

    renderBoard(gBoard)
}

function updateFlags() {
    var elFlagSpan = document.querySelectorAll('h2 span')
    elFlagSpan.innerText = 'fsdsfds'
}

updateFlags()
