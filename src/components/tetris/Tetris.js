import React, { useState } from "react";

import { createBoard } from "./game-helper-files/createBoard";
import { checkCollision } from "./game-helper-files/collision";

//components
import Board from "./board/Board";
import Display from "./display/Display";
import StartButton from "./startButton/StartButton";

//hooks
import { usePlayer } from "../../hooks/usePlayer";
import { useBoard } from "../../hooks/useBoard";
import { useInterval } from "../../hooks/useInterval";
import { useGameStatus } from "../../hooks/useGameStatus";

//styled components
import { StyledTetrisWrapper, StyledTetris } from "./StyledTetris";

export default function Tetris() {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPosition, resetPlayer, playerRotate] = usePlayer();
  const [board, setBoard, rowsCleared] = useBoard(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  function movePlayer(direction) {
    const intendedMove = { x: direction, y: 0 };
    if (!checkCollision(player, board, intendedMove)) {
      updatePlayerPosition(intendedMove);
    }
  }

  function startGame() {
    setBoard(createBoard());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  }

  function drop() {
    //Increase level when player has cleared 10 rows.
    if (rows > (level + 1) * 10) {
      setLevel(previousLevelState => previousLevelState + 1);

      //Also increase speed
      setDropTime(900 / (level + 1) + 200);
    }

    if (!checkCollision(player, board, { x: 0, y: 1 })) {
      updatePlayerPosition({ x: 0, y: 1, collided: false });
    } else {
      // create something for game over
      if (player.position.y < 1) {
        console.log("Game over");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPosition({ x: 0, y: 0, collided: true });
    }
  }

  function keyUp(event) {
    const { keyCode } = event;
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(900 / (level + 1) + 200);
      }
    }
  }

  function dropPlayer() {
    setDropTime(null);
    drop();
  }

  function move(event) {
    const { keyCode } = event;
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(board, 1);
      }
    }
  }

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={event => move(event)}
      onKeyUp={keyUp}>
      <StyledTetris>
        <Board board={board} />
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
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
}