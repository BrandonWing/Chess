window.onload = function() {
    let pieces = document.getElementsByClassName("piece");
    console.log(pieces);
    for (let piece of pieces) {
        setPieceFunctionality(piece);
    }

    let cells = document.getElementsByClassName("cell");
    for(let cell of cells) {
        let cellID = cell.id;
        console.log(cellID);
        cell.setAttribute('onclick', `movePiece('${cellID}')`);
    }
}

let whiteTurn = true;
let xAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];
let yAxis = [1, 2, 3, 4, 5, 6, 7, 8];

function setPieceFunctionality(piece) {
    let pieceType = piece.classList[0];
    let pieceColor = piece.classList[2];
    let pieceID = piece.parentElement.id;
    piece.setAttribute("onclick", `showMoves('${pieceType}', '${pieceColor}', '${pieceID}')`);
   
}

function showMoves(pieceType, pieceColor) {
    if (whiteTurn) {
        console.log(pieceType);
    }
    else{
        console.log(pieceType);
    }
}

function movePiece(id) {
    if (whiteTurn) {
        console.log(id);
    }
    else{
        console.log(id);
    }
}

let pawnRules = function(pieceColor, cellID) {
    if (pieceColor == "white") {
        if (cellID.includes("2")) {
            
        }
    }
    else {

    }
}

function verticalPossibilities(piecePosition){
    let xPos = piecePosition.charAt(0);
    let yPos = piecePosition.charAt(1);
    let possibleCells = [];
    
    /*--------- CONSIDER REDOING ---------------------------*/
    //Looking ahead
    for (let i = parseInt(yPos); i < 9; i++){
        cellID = yPos + string(i);
        if (document.getElementById(cellID).classList.includes("whiteOccupied") ||
            document.getElementById(cellID).classList.includes("blackOccupied")){
                let upwardNeighbor = cellID
                break;
        }
        possibleCells.push(cellID);
    }
    //Looking behind
    for (let i = parseInt(yPos); i > 0; i--){
        cellID = yPos + string(i);
        if (document.getElementById(cellID).classList.includes("whiteOccupied") ||
            document.getElementById(cellID).classList.includes("blackOccupied")){
                let downwardNeighbor = cellID
                break;
        }
        possibleCells.unshift(cellID);
    }
    console.log(possibleCells, upwardNeighbor);

    
}

function checkForwards(){
    return 0;//return number of spaces to nearest forward neighbor
}

function checkBackwards(){
    return 0;//return number of spaces to nearest backward neighbor
}

function checkLeft(){
    return 0;//return number of spaces to nearest left neighbor
}

function checkRight(){
    return 0;//return number of spaces to nearest right neighbor
}

function checkUpLeft(){
    return 0;//return number of spaces to nearest up left diagnol neighbor
}

function checkUpRight(){
    return 0;//return number of spaces to nearest up right diagnol neighbor
}

function checkDownLeft() {
    return 0; //return number of spaces to nearest down left diagnol neighbor
}

function checkDownRight() {
    return 0; //return number of spaces to nearest down right diagnol neighbor
}

//Check max possible spaces in all directions relevant to piece clicked
//
//