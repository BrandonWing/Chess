window.onload = function() {
    let pieces = document.getElementsByClassName("piece");
    console.log(pieces);
    for (let piece of pieces) {
        setPieceFunctionality(piece);
    }

}

//Set the onclick method of the specified piece to the showmoves() function
function setPieceFunctionality(piece) {
    let pieceType = piece.classList[0];
    let pieceColor = piece.classList[2];
    let piecePosition = piece.parentElement.id;
    piece.setAttribute("onclick", `showMoves('${pieceType}', '${piecePosition}', '${pieceColor}')`);
}

let color = "white";
let xAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];
let activeCells = [];
let activePiece = "";

//Framework of movement for all pieces excluding the knight
function generalMove(maximumMovementsHash, piecePosition) {
    let xPos = xAxis.indexOf(piecePosition.charAt(0));
    let yPos = parseInt(piecePosition.charAt(1));
    let possibleCells = [];

    //Bishops cannot go horizontal
    if(maximumMovementsHash.vertHor == true){
        console.log('vert hori check');
        adjustXandY(1, 0, maximumMovementsHash.maxRight); //Right
        adjustXandY(-1, 0, maximumMovementsHash.maxLeft); //Left
        adjustXandY(0, 1, maximumMovementsHash.maxUp); //Up
        adjustXandY(0, -1, maximumMovementsHash.maxDown); //Down
    }

    //Rooks and pawns can't go diagnol on normal movements
    if(maximumMovementsHash.diagnol == true){
        console.log('diag check');
        adjustXandY(1, 1, Math.min(maximumMovementsHash.maxUp, maximumMovementsHash.maxRight)); //Diagnol Up Right
        adjustXandY(1, -1, Math.min(maximumMovementsHash.maxDown, maximumMovementsHash.maxRight)); //Diagnol Down Right
        adjustXandY(-1, -1, Math.min(maximumMovementsHash.maxDown, maximumMovementsHash.maxLeft)); //Diagnol Down Left
        adjustXandY(-1, 1, Math.min(maximumMovementsHash.maxUp, maximumMovementsHash.maxLeft)); //Diagnol Up Left
    }
    
    //Dynamically add cells to possible places to move
    function adjustXandY(amountForX, amountForY, maxMovement) {
        console.log(amountForX);
        console.log(amountForY);
        console.log(maxMovement);
        xPosition = xPos;
        yPosition = yPos;
        for(let i = 0; i < maxMovement; i++){
            xPosition = xPosition + amountForX;
            yPosition = yPosition + amountForY;
            xLetter = xAxis[xPosition];
            let cellID = xLetter + yPosition;
            console.log(cellID);
            let cellClasses = document.getElementById(cellID).classList;
            if(cellClasses.contains("whiteOccupied") || cellClasses.contains("blackOccupied")){
                checkCellPieceColor(cellID, piecePosition, color);
                break;
            }
            possibleCells.push(cellID);

        }
        console.log(possibleCells);
    }
    console.log(possibleCells);
    for(cellID of possibleCells) {
        setCell(cellID, piecePosition, "bg-success");
    }  
    console.log()
}

//Define the different movement patterns for each piece and use the appropriate one 
function showMoves(pieceType, piecePosition, pieceColor) {
    if(pieceColor !== color){
        return;  //Exit the function if the piece clicked is not the correct color of the turn
    }
    console.log("Starting to show");
    unsetCells();
    if(piecePosition == activePiece){
        return;
    }
    let xPos = xAxis.indexOf(piecePosition.charAt(0));
    let yPos = parseInt(piecePosition.charAt(1));

    let maximumUpwardMovement = 8 - yPos;
    let maximumDownwardMovement = 7 - maximumUpwardMovement;
    let maximumRightMovement = 7 - xPos;
    let maximumLeftMovement = 7 - maximumRightMovement;
    
    //Rook Movements-------------------------
    rookMovements = {maxUp:maximumUpwardMovement, maxRight:maximumRightMovement, 
                     maxDown:maximumDownwardMovement, maxLeft:maximumLeftMovement, diagnol:false, vertHor:true};
    //Bishop Movements-----------------------
    bishopMovements = {maxUp:maximumUpwardMovement, maxRight:maximumRightMovement, 
                       maxDown:maximumDownwardMovement, maxLeft:maximumLeftMovement, diagnol:true, vertHor:false};
    //Queen Movements------------------------
    queenMovements = {maxUp:maximumUpwardMovement, maxRight:maximumRightMovement, 
                      maxDown:maximumDownwardMovement, maxLeft:maximumLeftMovement, diagnol:true, vertHor:true};
    //King Movements (all one or zero depending on position)---
    kingMovements = {maxUp:Math.min(1, maximumUpwardMovement), maxRight:Math.min(1, maximumRightMovement), 
                     maxDown:Math.min(1, maximumDownwardMovement), maxLeft:Math.min(1, maximumLeftMovement), diagnol:true, vertHor:true};
    
    //Pawn movements------------------------
    let pawnMovements;
    if (color == "white"){
        let movement = (function() {switch(yPos) {
            case 2: return 2;break;
            default: return 1;break;
        }})();
        pawnMovements = {maxUp:movement, maxRight:0, maxDown:0, maxLeft:0, diagnol:false, vertHor:true}
    }
    else {
        let movement = (function() {switch(yPos) {
            case 7: return 2; break;
            default: return 1; break;
        }})();
        pawnMovements = {maxUp:0, maxRight:0, maxDown:movement, maxLeft:0, diagnol:false, vertHor:true}
    }
    
    console.log(pawnMovements);
    switch (pieceType) {
        case "rook":generalMove(rookMovements, piecePosition); break;
        case "bishop":generalMove(bishopMovements, piecePosition); break;
        case "queen":generalMove(queenMovements, piecePosition);break;
        case "king":generalMove(kingMovements, piecePosition);break;
        case "pawn":generalMove(pawnMovements, piecePosition);break;
        case "knight":knightRules(piecePosition);break;
    }

}

//The movement patterns of the knight piece
function knightRules(piecePosition) {
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
                checkCellPieceColor(possibleCell, piecePosition);
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

//Set the cell specified to a color specified
function setCell(cellID, originalPiecePosition, cellColor) {
    let cell = document.getElementById(cellID);
    let originalCellColor = "";
    cell.setAttribute('onclick', `movePiece('${cellID}', '${originalPiecePosition}')`);
    if(cell.classList.contains("bg-dark")){
        console.log("dark cell");
        originalCellColor="bg-dark";
        cell.classList.remove("bg-dark");
    }
    else{
        console.log("light cell");
        originalCellColor="bg-light";
        cell.classList.remove("bg-light");
    }
    cell.classList.add(cellColor);
    activeCells.push([cellID, originalCellColor]);
    console.log(activeCells);
}

//Move the selected piece to the selected square
function movePiece(newCellID, originalPiecePosition) {
    console.log("Starting");

    console.log("Possible");
    originalCell = document.getElementById(originalPiecePosition);
    originalPiece = originalCell.children[0].cloneNode(true);
    console.log(originalPiece);
    originalCell.innerHTML = "";

    newCell = document.getElementById(newCellID);
    newCell.innerHTML = "";
    newCell.append(originalPiece);
    setPieceFunctionality(originalPiece);
    originalCell.classList.remove("whiteOccupied", "blackOccupied"); //Reset cell where piece moved from
    newCell.classList.remove("whiteOccupied", "blackOccupied");     //Reset cell where piece is moving to
    if(color == "white") {
        newCell.classList.add("whiteOccupied");
        color = "black";
    }
    else{
        newCell.classList.add("blackOccupied");
        color = "white";
    }
    unsetCells();
}

//Change cell colors back to original black and white colors
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

//Check piece in path to see if player's piece or opponents
function checkCellPieceColor(pieceToCheck, activePiece) {
    console.log("checking piece");
    let cell = document.getElementById(pieceToCheck);
    piece = cell.children[0];
    if((piece.classList.contains("white") && color == "black") || (piece.classList.contains("black") && color =="white")){
        console.log("setting to red");
        setCell(pieceToCheck, activePiece, "bg-danger");
    }
    console.log(piece);
}