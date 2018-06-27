if(pieceType == "pawn"){
    let diagnolRight = (function () {
        switch(xPos + 1){
            case 8: return null;
            default: return (xPos + 1);
        }})();
    let diagnolLeft = (function () {
        switch(xPos - 1){
            case -1: return null;
            default: return (xPos - 1);
        }})();
    if(diagnolLeft !== null)
    {
        diagnolLeftCell = xAxis[diagnolLeft] + (yPosition + 1);
        checkForEnemyPiece(diagnolLeftCell);
        
    }
    if(diagnolRight !== null)
    {
        diagnolRightCell = xAxis[diagnolRight] + (yPosition + 1);
        checkForEnemyPiece(diagnolRightCell);
    }
}



if(pieceType == "pawn"){
    
}













































