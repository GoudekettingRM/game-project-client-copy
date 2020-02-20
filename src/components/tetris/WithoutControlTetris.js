import React, { useState } from "react";

import { createBoard } from "./game-helper-files/createBoard";
import { checkCollision } from "./game-helper-files/collision";

//components
import Board from "./board/Board";
import Display from "./display/Display";
import StartButton from "./startButton/StartButton";

//hooks
import { useBoard } from "../../hooks/useBoard";
import { useGameStatus } from "../../hooks/useGameStatus";

//styled components
import { StyledTetrisWrapper, StyledTetris } from "./StyledTetris";

export default function Tetris(props) {
  const { gameId, boardState, token, gameStarted, tellDBToStartGame } = props;
  console.log("Props of tetris without control test:", props);

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const gameData = {
    id: gameId,
    boardState
  };

  const [board, setBoard, rowsCleared] = useBoard(null, null, gameData, token);

  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  function startGame() {
    setBoard(boardState);
    setDropTime(1000);
    // resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  }

  console.log("Board test in without control tetris:", board);

  return (
    <StyledTetrisWrapper role="button" tabIndex="0">
      <StyledTetris>
        <Board board={boardState} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}
