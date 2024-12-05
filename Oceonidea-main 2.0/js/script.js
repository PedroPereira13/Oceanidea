const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const vitorias = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let Atual = "X";
let running = false;

initializeGame();


function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Turno do ${Atual}`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = Atual;
    cell.textContent = Atual;
}
function changePlayer(){
    Atual = (Atual == "X") ? "O" : "X";
    statusText.textContent = `Turno do ${Atual}`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < vitorias.length; i++){
        const condition = vitorias[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${Atual} ganhou!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Empate!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    Atual = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Turno do ${Atual}`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}