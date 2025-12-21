import { useState, useCallback } from "react";
import { GameTask, getTaskForTile, PENALTY_TILES } from "../data/tasks";

export type GameStatus = "setup" | "playing" | "task" | "finished";

export interface GameState {
  players: [string, string];
  positions: [number, number];
  currentPlayerIndex: number;
  diceValue: number | null;
  status: GameStatus;
  currentTask: GameTask | null;
  winner: string | null;
}

export const useBoardGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: ["", ""],
    positions: [1, 1],
    currentPlayerIndex: 0,
    diceValue: null,
    status: "setup",
    currentTask: null,
    winner: null,
  });

  const startGame = useCallback((player1: string, player2: string) => {
    setGameState({
      players: [player1, player2],
      positions: [1, 1],
      currentPlayerIndex: 0,
      diceValue: null,
      status: "playing",
      currentTask: null,
      winner: null,
    });
  }, []);

  const rollDice = useCallback(() => {
    if (gameState.status !== "playing") return;

    const roll = Math.floor(Math.random() * 6) + 1;
    const currentPlayer = gameState.currentPlayerIndex;
    const currentPos = gameState.positions[currentPlayer];
    let newPos = currentPos + roll;

    // Cap at 50
    if (newPos >= 50) {
      newPos = 50;
    }

    setGameState((prev) => ({
      ...prev,
      diceValue: roll,
      positions:
        currentPlayer === 0
          ? [newPos, prev.positions[1]]
          : [prev.positions[0], newPos],
      status: "task", // Trigger task immediately after move
      currentTask: getTaskForTile(newPos),
    }));
  }, [gameState.status, gameState.currentPlayerIndex, gameState.positions]);

  const completeTask = useCallback(() => {
    const currentPlayer = gameState.currentPlayerIndex;
    let currentPos = gameState.positions[currentPlayer];

    // Check for win condition
    if (currentPos === 50) {
      setGameState((prev) => ({
        ...prev,
        status: "finished",
        winner: prev.players[currentPlayer],
        currentTask: null,
      }));
      return;
    }

    // Check for penalty AFTER task is done (or during? I'll do it after for simplicity, or maybe the task WAS the penalty)
    // If the current tile was a penalty tile, we move them back now.
    // The task text for penalty tiles says "Go back X spaces".
    if (PENALTY_TILES[currentPos]) {
      const penalty = PENALTY_TILES[currentPos];
      let afterPenaltyPos = currentPos + penalty;
      if (afterPenaltyPos < 1) afterPenaltyPos = 1;

      setGameState((prev) => ({
        ...prev,
        positions:
          currentPlayer === 0
            ? [afterPenaltyPos, prev.positions[1]]
            : [prev.positions[0], afterPenaltyPos],
        status: "playing",
        currentTask: null,
        currentPlayerIndex: (prev.currentPlayerIndex + 1) % 2,
        diceValue: null,
      }));
    } else {
      // Normal turn end
      setGameState((prev) => ({
        ...prev,
        status: "playing",
        currentTask: null,
        currentPlayerIndex: (prev.currentPlayerIndex + 1) % 2,
        diceValue: null,
      }));
    }
  }, [gameState.currentPlayerIndex, gameState.positions, gameState.players]);

  const resetGame = useCallback(() => {
    setGameState({
      players: ["", ""],
      positions: [1, 1],
      currentPlayerIndex: 0,
      diceValue: null,
      status: "setup",
      currentTask: null,
      winner: null,
    });
  }, []);

  return {
    gameState,
    startGame,
    rollDice,
    completeTask,
    resetGame,
  };
};
