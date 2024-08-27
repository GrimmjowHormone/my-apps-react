import { WINNER_COMBOS } from "../constans"; 

const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si x u o ganó
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        // ganador
        return boardToCheck[a];
      }
    }
    // no hay ganador
    return null;
  };


  // checar si se hicieron todos los movimientos
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null);
  };


  export{
    checkWinner,
    checkEndGame
  }