import { useState, useCallback } from "react";
import { GameTask, getTaskForTile, PENALTY_TILES } from "../data/tasks";
import { useDares } from "../context/DareContext";

export type GameStatus = "setup" | "playing" | "moving" | "task" | "finished";

export interface GameState {
  players: [string, string];
  positions: [number, number];
  targetPosition: number | null;
  currentPlayerIndex: number;
  diceValue: number | null;
  status: GameStatus;
  currentTask: GameTask | null;
  winner: string | null;
}

export const MAX_TILES = 100;

export const useBoardGame = () => {
  const { customDares } = useDares();
  const [gameState, setGameState] = useState<GameState>({
    players: ["", ""],
    positions: [1, 1],
    targetPosition: null,
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
      targetPosition: null,
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

    if (newPos >= MAX_TILES) {
      newPos = MAX_TILES;
    }

    setGameState((prev) => ({
      ...prev,
      diceValue: roll,
      targetPosition: newPos,
      status: "moving",
      currentTask: null,
    }));
  }, [gameState.status, gameState.currentPlayerIndex, gameState.positions]);

  const moveOneStep = useCallback(() => {
    setGameState((prev) => {
      if (prev.status !== "moving" || prev.targetPosition === null) return prev;

      const currentPlayer = prev.currentPlayerIndex;
      const currentPos = prev.positions[currentPlayer];

      if (currentPos === prev.targetPosition) {
        // Trigger task
        let task = getTaskForTile(currentPos);

        // Logic to mix in custom dares
        // If we have custom dares, 50% chance to replace the default task (unless it's a penalty or special tile)
        // Let's say we only replace 'warmup', 'personal', 'bold' tasks, not 'final' or penalties.
        if (
          customDares.length > 0 &&
          !PENALTY_TILES[currentPos] &&
          task.category !== "final"
        ) {
          const useCustom = Math.random() < 0.1;
          if (useCustom) {
            const randomDare =
              customDares[Math.floor(Math.random() * customDares.length)];
            task = {
              ...task,
              text: randomDare,
              category: "bold", // Default custom dares to 'bold' or keep original category? Let's say 'bold' for fun.
            };
          }
        }

        return {
          ...prev,
          status: "task",
          currentTask: task,
          targetPosition: null,
        };
      }

      const nextPos = currentPos + 1;

      return {
        ...prev,
        positions:
          currentPlayer === 0
            ? [nextPos, prev.positions[1]]
            : [prev.positions[0], nextPos],
      };
    });
  }, [customDares]); // Add customDares to dependency

  const completeTask = useCallback(() => {
    const currentPlayer = gameState.currentPlayerIndex;
    let currentPos = gameState.positions[currentPlayer];

    if (currentPos === MAX_TILES) {
      setGameState((prev) => ({
        ...prev,
        status: "finished",
        winner: prev.players[currentPlayer],
        currentTask: null,
      }));
      return;
    }

    if (PENALTY_TILES[currentPos]) {
      let afterPenaltyPos = currentPos + PENALTY_TILES[currentPos];
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
      targetPosition: null,
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
    moveOneStep,
    completeTask,
    resetGame,
  };
};
