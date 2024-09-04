import { useState, useEffect } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constans";
import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { saveGameStorage, resetGameStorage } from "./logic/storage";
function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");

    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");

    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null); //null es que no hay ganador, false es un empate, true es ganador

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  };

  const updatedBoard = (index) => {
    // Comprueba si hay algo y de ser asi hace un return
    if (board[index] || winner) return;

    // actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // revisar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); //empate
    }
    // Guardar partida aqui
    saveGameStorage({ board: newBoard, turn: newTurn, winner: newWinner });
    // TODO game over?
  };

  useEffect(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    const isWinner=window.localStorage.getItem('winner')

    if (boardFromStorage) {
      const parsedBoard = JSON.parse(boardFromStorage);
      const isBoardFull = parsedBoard.every((square) => square !== null);

      if (isBoardFull || isWinner==='○' || isWinner==='⨉') {
        resetGame();
      }
    }
  }, []);

  return (
    <>
      <main className="board">
        <h1>Tic tac toe</h1>
        <button onClick={resetGame}>Reset del juego</button>
        <section className="game">
          {board.map((_, index) => {
            return (
              <Square updatedBoard={updatedBoard} index={index} key={index}>
                {board[index]}
              </Square>
            );
          })}
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame} />
      </main>
    </>
  );
}

export default App;
