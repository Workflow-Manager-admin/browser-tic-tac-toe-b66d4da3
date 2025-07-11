import React, { useState } from "react";
import "./TicTacToe.css";

// PUBLIC_INTERFACE
/**
 * A minimalistic interactive Tic Tac Toe board for local 2-player gameplay.
 * Features:
 *  - 3x3 centered board
 *  - Alternating turns (X, O)
 *  - Win/draw detection
 *  - Visual feedback for whose turn & winner
 *  - Restart button
 */
function TicTacToe() {
  const initialBoard = Array(9).fill("");
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  // PUBLIC_INTERFACE
  /**
   * Determines the winner given a board.
   * @param {string[]} squares - The board state.
   * @returns {"X"|"O"|null}
   */
  function calculateWinner(squares) {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // cols
      [0,4,8], [2,4,6], // diagonals
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  /**
   * Handles clicking on a board square.
   * @param {number} idx - Board index clicked.
   */
  function handleClick(idx) {
    if (board[idx] || winner) return;
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";
    const foundWinner = calculateWinner(nextBoard);
    setBoard(nextBoard);
    setWinner(foundWinner);
    setXIsNext((prev) => !prev);
  }

  /**
   * Handles game restart.
   */
  function handleRestart() {
    setBoard(initialBoard);
    setXIsNext(true);
    setWinner(null);
  }

  const isDraw = !winner && board.every((s) => s);

  return (
    <div className="ttt-container">
      <h1 className="ttt-title">Tic Tac Toe</h1>
      <div className="ttt-status" data-testid="status">
        {winner
          ? <span className="ttt-winner">{winner} wins!</span>
          : isDraw
            ? <span className="ttt-draw">Draw!</span>
            : <span>Turn: <span className={xIsNext ? "ttt-x" : "ttt-o"}>{xIsNext ? "X" : "O"}</span></span>
        }
      </div>
      <div className="ttt-board">
        {board.map((cell, idx) => (
          <button
            key={idx}
            className={"ttt-cell" + (cell ? " filled" : "")}
            onClick={() => handleClick(idx)}
            aria-label={`Place ${xIsNext ? "X" : "O"} at ${Math.floor(idx / 3) + 1},${(idx % 3) + 1}`}
            disabled={!!cell || !!winner}
            data-testid={`cell-${idx}`}
          >
            {cell}
          </button>
        ))}
      </div>
      <button className="ttt-restart" onClick={handleRestart} data-testid="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default TicTacToe;
