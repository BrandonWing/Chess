window.onload = function() {
    let pieces = document.getElementsByClassName("piece");
    console.log(pieces);
    for (let piece of pieces) {
        setPieceFunctionality(piece);
    }

}

let whiteTurn = true;
let xAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];
let yAxis = [1, 2, 3, 4, 5, 6, 7, 8];
let activeCells = [];
let activePiece = "";

function setPieceFunctionality(piece) {
    let pieceType = piece.classList[0];
    let pieceColor = piece.classList[2];
    let pieceID = piece.parentElement.id;
    piece.setAttribute("onclick", `showMoves('${pieceType}', '${pieceColor}', '${pieceID}')`);
    piece.setAttribute("value", `${pieceID}`)
}

//-------------------ADJUST THIS--------------------------------------
function showMoves(pieceType, pieceColor, piecePosition) {
    if (whiteTurn && pieceColor == "white") {
        unsetCells();
        if(piecePosition !== activePiece){
            switch (pieceType) {
                case "pawn":pawnRules(pieceColor, piecePosition);break;
                case "rook":rookRules(pieceColor, piecePosition);break;
                case "knight":knightRules(pieceColor, piecePosition);break;
                case "bishop":bishopRules(pieceColor, piecePosition);break;
                case "queen":queenRules(pieceColor, piecePosition);break;
                case "king":kingRules(pieceColor, piecePosition);break;
            }
            activePiece = piecePosition;
        }
        else{
            activePiece = '';
        }
    }
    else if(!whiteTurn && pieceColor == "black"){
        unsetCells();
        if(piecePosition !== activePiece){
            switch (pieceType) {
                case "pawn":pawnRules(pieceColor, piecePosition);break;
                case "rook":rookRules(pieceColor, piecePosition);break;
                case "knight":knightRules(pieceColor, piecePosition);break;
                case "bishop":bishopRules(pieceColor, piecePosition);break;
                case "queen":queenRules(pieceColor, piecePosition);break;
                case "king":kingRules(pieceColor, piecePosition);break;
            }
            activePiece = piecePosition;
        }
        else{
            activePiece = '';
        }
    }
}

function pawnRules(pieceColor, cellID) {
    //white turn
    if (pieceColor == "white") {
        if (cellID.includes("2")){
            verticalPossibilities(cellID, 2, 0);
        }
        else {
            verticalPossibilities(cellID, 1, 0);
        } 
            
    }
    //black turn
    else {
        if (cellID.includes("7")){
            verticalPossibilities(cellID, 0, 2);
        }
        else{
            verticalPossibilities(cellID, 0, 1);
        }
    }
}

function rookRules(pieceColor, cellID) {
    //white turn

    let forwardDistance = 8 - parseInt(cellID.charAt(1));
    let backwardDistance = 7 - forwardDistance;
    let rightDistance = 7 - xAxis.indexOf(cellID.charAt(0));
    let leftDistance = 7 - rightDistance;
    verticalPossibilities(cellID, forwardDistance, backwardDistance);
    horizontalPossibilities(cellID, rightDistance, leftDistance);

}

function knightRules(pieceColor, piecePosition) {
    let xPos = xAxis.indexOf(piecePosition.charAt(0));
    let yPos = parseInt(piecePosition.charAt(1));
    let possibleCells = [];
    let movesArray = [ [1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];
    for (let i = 0; i < 8; i++) {
        let newXPos = xPos + movesArray[i][0];
        let newYPos = yPos + movesArray[i][1];
        if (newXPos <= 7 && newXPos >= 0 && newYPos <= 8 && newYPos >= 1){
            possibleCell = xAxis[newXPos] + newYPos;
            console.log(possibleCell);
            let cellClasses = document.getElementById(possibleCell).classList;
            console.log(cellClasses);
            if (cellClasses.contains("whiteOccupied") || cellClasses.contains("blackOccupied")){
                let upwardNeighbor = possibleCell;
                checkCellPieceColor(cellID, piecePosition);
                console.log(`Piece in front at ${possibleCell}`);
                continue;
            }
            possibleCells.unshift(possibleCell);
        }
    }
    console.log(possibleCells);
    for(cellID of possibleCells) {
        setCell(cellID, piecePosition, "bg-success");
    }  
}

function bishopRules(pieceColor, cellID) {
    let forwardDistance = 8 - parseInt(cellID.charAt(1));
    diagnolPossibilities(cellID, forwardDistance);
}

function queenRules(pieceColor, cellID) {
    //white turn

    let forwardDistance = 8 - parseInt(cellID.charAt(1));
    let backwardDistance = 7 - forwardDistance;
    let rightDistance = 7 - xAxis.indexOf(cellID.charAt(0));
    let leftDistance = 7 - rightDistance;
    verticalPossibilities(cellID, forwardDistance, backwardDistance);
    horizontalPossibilities(cellID, rightDistance, leftDistance);
    diagnolPossibilities(cellID, forwardDistance);
}

function kingRules(pieceColor, piecePosition) {
    //white turn
    let xPos = xAxis.indexOf(piecePosition.charAt(0));
    let yPos = parseInt(piecePosition.charAt(1));
    let arrayOfMoves = [[1,1], [-1,-1], [-1,0], [0,-1], [1,0], [0,1], [-1,1], [1,-1]];
    let possibleCells= [];
    for (move of arrayOfMoves){
        let newXPos = xPos + move[0];
        let newYPos = yPos + move[1];
        if (newXPos <= 7 && newXPos >= 0 && newYPos <= 8 && newYPos >= 1){
            possibleCell = xAxis[newXPos] + newYPos;
            let cellClasses = document.getElementById(possibleCell).classList;
            if (cellClasses.contains("whiteOccupied") || cellClasses.contains("blackOccupied")){
                let upwardNeighbor = possibleCell;
                checkCellPieceColor(cellID, piecePosition);
                console.log(`Piece at ${possibleCell}`);
                continue;
            }
            possibleCells.unshift(possibleCell);
        }

    }
    console.log(possibleCells);
    for(cell of possibleCells) {
        setCell(cell, piecePosition, "bg-success");
    }


}

function verticalPossibilities(piecePosition, maxForward, maxBackward){
    let xPos = piecePosition.charAt(0);
    let yPos = parseInt(piecePosition.charAt(1));
    let possibleCells = [];
    
    /*--------- CONSIDER REDOING ---------------------------*/
    //Looking ahead
    for (let i = 0; i < maxForward; i++){
        yPos = yPos + 1;
        cellID = xPos + yPos.toString();
        let cellClasses = document.getElementById(cellID).classList;
        console.log(cellClasses);
        if (cellClasses.contains("whiteOccupied") || cellClasses.contains("blackOccupied")){
            
            let upwardNeighbor = cellID
            checkCellPieceColor(cellID, piecePosition);
            console.log(`Piece in front at ${cellID}`);
                break;
        }
        possibleCells.push(cellID);
    }

    //Looking behind
    yPos = parseInt(piecePosition.charAt(1));

    for (let i = 0; i < maxBackward; i++){
        yPos = yPos - 1;
        cellID = xPos + yPos.toString();
        console.log(cellID);
        let cellClasses = document.getElementById(cellID).classList;
        if (cellClasses.contains("whiteOccupied") || cellClasses.contains("blackOccupied")){
            let downwardNeighbor = cellID;
            checkCellPieceColor(cellID, piecePosition);
            console.log(`Piece in back at ${cellID}`);
            break;
        }
        possibleCells.unshift(cellID);
    }
    

    console.log(possibleCells);
    for(cellID of possibleCells) {
        setCell(cellID, piecePosition, "bg-success");
    }  
}

function horizontalPossibilities(piecePosition, maxRight, maxLeft) {
    let xPos = xAxis.indexOf(piecePosition.charAt(0));
    let yPos = piecePosition.charAt(1);
    let possibleCells = [];
    
    /*--------- CONSIDER REDOING ---------------------------*/
    //Check right
    for(let i = 0; i < maxRight; i++){
        xPos = xPos + 1;
        cellID = xAxis[xPos] + yPos;
        console.log(cellID);
        let cellClasses = document.getElementById(cellID).classList;
        if (cellClasses.contains("whiteOccupied") || cellClasses.contains("blackOccupied")){
            let rightNeighbor = cellID
            checkCellPieceColor(cellID, piecePosition);
            console.log(`Piece to right at ${cellID}`);
                break;
        }
        possibleCells.push(cellID);
    }
    //Check left
    xPos = xAxis.indexOf(piecePosition.charAt(0));
    for(let i = 0; i < maxLeft; i++){
        xPos = xPos - 1;
        cellID = xAxis[xPos] + yPos;
        let cellClasses = document.getElementById(cellID).classList;
        if (cellClasses.contains("whiteOccupied") || cellClasses.contains("blackOccupied")){
            
            let left = cellID
            checkCellPieceColor(cellID, piecePosition);
            console.log(`Piece to left at ${cellID}`);
                break;
        }
        possibleCells.unshift(cellID);
    }
    console.log(possibleCells);
    for(cellID of possibleCells) {
        setCell(cellID, piecePosition, "bg-success");
    }

}


function diagnolPossibilities(piecePosition, maxUp) {
    let xPos = xAxis.indexOf(piecePosition.charAt(0));
    let yPos = parseInt(piecePosition.charAt(1));
    let maxDown = 7-maxUp;
    let maxRight = 7 - xPos;
    let maxLeft = 7 - maxRight;
    let possibleCells = [];

    for(let i = 0; i < maxUp && i < maxRight; i++){
        xPos = xPos + 1;
        yPos = yPos + 1;
        cellID = xAxis[xPos] + yPos;
        console.log(cellID);
        let cellClasses = document.getElementById(cellID).classList;
        if (cellClasses.contains("whiteOccupied") || cellClasses.contains("blackOccupied")){
            let rightNeighbor = cellID
            checkCellPieceColor(cellID, piecePosition);
            console.log(`Piece to right at ${cellID}`);
                break;
        }
        possibleCells.push(cellID);
    }

    xPos = xAxis.indexOf(piecePosition.charAt(0));
    yPos = parseInt(piecePosition.charAt(1)); 
    for(let i = 0; i < maxDown && i < maxLeft; i++){
        xPos = xPos - 1;
        yPos = yPos - 1;
        cellID = xAxis[xPos] + yPos;
        console.log(cellID);
        let cellClasses = document.getElementById(cellID).classList;
        if (cellClasses.contains("whiteOccupied") || cellClasses.contains("blackOccupied")){
            let rightNeighbor = cellID
            checkCellPieceColor(cellID, piecePosition);
            console.log(`Piece to right at ${cellID}`);
                break;
        }
        possibleCells.push(cellID);
    }

    xPos = xAxis.indexOf(piecePosition.charAt(0));
    yPos = parseInt(piecePosition.charAt(1)); 
    for(let i = 0; i < maxUp && i < maxLeft; i++){
        xPos = xPos - 1;
        yPos = yPos + 1;
        cellID = xAxis[xPos] + yPos;
        console.log(cellID);
        let cellClasses = document.getElementById(cellID).classList;
        if (cellClasses.contains("whiteOccupied") || cellClasses.contains("blackOccupied")){
            let rightNeighbor = cellID
            checkCellPieceColor(cellID, piecePosition);
            console.log(`Piece to right at ${cellID}`);
                break;
        }
        possibleCells.push(cellID);
    }

    xPos = xAxis.indexOf(piecePosition.charAt(0));
    yPos = parseInt(piecePosition.charAt(1)); 
    for(let i = 0; i < maxDown && i < maxRight; i++){
        xPos = xPos + 1;
        yPos = yPos - 1;
        cellID = xAxis[xPos] + yPos;
        console.log(cellID);
        let cellClasses = document.getElementById(cellID).classList;
        if (cellClasses.contains("whiteOccupied") || cellClasses.contains("blackOccupied")){
            let rightNeighbor = cellID
            checkCellPieceColor(cellID, piecePosition);
            console.log(`Piece to right at ${cellID}`);
                break;
        }
        possibleCells.push(cellID);
    }
    console.log(possibleCells);
    for(cellID of possibleCells) {
        setCell(cellID, piecePosition, "bg-success");
    }
}

function setCell(cellID, pieceCell, cellColor){
    let cell = document.getElementById(cellID);
    let color = "";
    cell.setAttribute('onclick', `movePiece('${cellID}', '${pieceCell}')`);
    if(cell.classList.contains("bg-dark")){
        console.log("dark cell");
        color="bg-dark";
        cell.classList.remove("bg-dark");
    }
    else{
        console.log("light cell");
        color="bg-light";
        cell.classList.remove("bg-light");
    }
    cell.classList.add(cellColor);
    activeCells.unshift([cellID, color]);
    console.log(cell);
}

function unsetCells(){
    console.log("unset");
    for (cell of activeCells) {
        currentCell = document.getElementById(cell[0]);
        currentCell.setAttribute('onclick', '');
        currentCell.classList.remove("bg-success");
        currentCell.classList.remove("bg-danger");
        currentCell.classList.add(cell[1]);
    }
    activeCells = [];
}

function movePiece(newCellID, pieceCell) {
    console.log("Starting");

    console.log("Possible");
    originalCell = document.getElementById(pieceCell);
    originPiece = originalCell.children[0];
    piece = originPiece.cloneNode(true);
    console.log(piece);
    originalCell.innerHTML = "";

    newCell = document.getElementById(newCellID);
    newCell.innerHTML = "";
    newCell.append(piece);
    newCell.classList.add();
    setPieceFunctionality(piece);

    if(whiteTurn) {
        originalCell.classList.remove("whiteOccupied");
        newCell.classList.remove("blackOccupied");
        newCell.classList.add("whiteOccupied");
    }
    else {
        originalCell.classList.remove("blackOccupied");
        newCell.classList.remove("whiteOccupied");
        newCell.classList.add("blackOccupied");
    }
    unsetCells();
    if(whiteTurn){
        whiteTurn = false;
    }
    else{
        whiteTurn = true;
    }
    
        //TODO: set cell class to occupied
}

function checkCellPieceColor(cellID, piecePosition) {
    let cell = document.getElementById(cellID);
    let color = '';
    piece = cell.children[0];
    if(piece.classList.contains("white")){
        color = "white";
    }
    else{
        color = "black";
    }
    if ((whiteTurn && color == "black") || (!whiteTurn && color == "white"))
    {
        setCell(cellID, piecePosition, "bg-danger");
    }
    console.log(piece);
}
