import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { MAX_TILES, useBoardGame } from "../hooks/useBoardGame";
import { PENALTY_TILES } from "../data/tasks";
import { useAudioPlayer } from "expo-audio";

type RootStackParamList = {
  Home: undefined;
  Game: { player1: string; player2: string };
  Winner: { winnerName: string };
};

type GameScreenRouteProp = RouteProp<RootStackParamList, "Game">;

const { width } = Dimensions.get("window");
const TILE_SIZE = (width - 32) / 11; // 10 columns for 100 tiles

export default function GameScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<GameScreenRouteProp>();
  const { player1, player2 } = route.params;

  const { gameState, startGame, rollDice, moveOneStep, completeTask } =
    useBoardGame();

  // Initialize game on mount
  useEffect(() => {
    startGame(player1, player2);
  }, [player1, player2, startGame]);

  // Check for winner
  useEffect(() => {
    if (gameState.winner) {
      navigation.replace("Winner", { winnerName: gameState.winner });
    }
  }, [gameState.winner, navigation]);

  // Audio Player
  const player = useAudioPlayer(require("../../assets/pop.mp3"));
  const dice = useAudioPlayer(require("../../assets/dice.mp3"));
  player.setPlaybackRate(2);
  // Movement Animation Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState.status === "moving") {
      interval = setInterval(() => {
        player.seekTo(0);
        player.volume = 0.3;
        player.play();
        moveOneStep();
      }, 300); // Move every 300ms
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState.status, moveOneStep, player]);

  // Dice Animation
  const diceScale = useSharedValue(1);
  const diceRotation = useSharedValue(0);

  const handleRoll = () => {
    // Enhanced dice animation
    dice.seekTo(0);
    dice.volume = 0.3;
    dice.play();
    diceScale.value = withSequence(
      withTiming(0.5, { duration: 200 }),
      withTiming(1.5, { duration: 200 }),
      withSpring(1)
    );
    diceRotation.value = withSequence(
      withTiming(720, {
        duration: 800,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
      withTiming(0, { duration: 0 })
    );

    // Delay actual roll logic slightly to match animation
    setTimeout(() => {
      rollDice();
    }, 500);
  };

  const diceAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: diceScale.value },
        { rotate: `${diceRotation.value}deg` },
      ],
    };
  });

  // Render Board
  const renderBoard = () => {
    const tiles = [];
    for (let i = MAX_TILES; i >= 1; i--) {
      tiles.push(i);
    }

    return (
      <View style={styles.board}>
        {tiles.map((tileNumber) => {
          const isP1Here = gameState.positions[0] === tileNumber;
          const isP2Here = gameState.positions[1] === tileNumber;

          let backgroundColor = "#ecf0f1";
          let isPenalty = false;

          // Check if key exists in PENALTY_TILES (keys are strings in Object.keys but numbers in index access)
          if (PENALTY_TILES[tileNumber] !== undefined) {
            isPenalty = true;
            backgroundColor = "#ffebee"; // Light red for penalty
          } else if (tileNumber <= 25) backgroundColor = "#dff9fb"; // Warmup
          else if (tileNumber <= 50) backgroundColor = "#fef9e7"; // Personal
          else if (tileNumber <= 75) backgroundColor = "#fdedec"; // Bold
          else backgroundColor = "#e8f8f5"; // Final

          return (
            <View key={tileNumber} style={[styles.tile, { backgroundColor }]}>
              <Text style={styles.tileNumber}>
                {tileNumber} {isPenalty && "⚠️"}
              </Text>
              <View style={styles.tokenContainer}>
                {isP1Here && (
                  <View
                    style={[styles.token, { backgroundColor: "#3498db" }]}
                  />
                )}
                {isP2Here && (
                  <View
                    style={[styles.token, { backgroundColor: "#e74c3c" }]}
                  />
                )}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={[
            styles.playerInfo,
            gameState.currentPlayerIndex === 0 && styles.activePlayer,
          ]}
        >
          <Text style={styles.playerName}>{player1}</Text>
          <View
            style={[styles.tokenIndicator, { backgroundColor: "#3498db" }]}
          />
        </View>
        <View
          style={[
            styles.playerInfo,
            gameState.currentPlayerIndex === 1 && styles.activePlayer,
          ]}
        >
          <Text style={styles.playerName}>{player2}</Text>
          <View
            style={[styles.tokenIndicator, { backgroundColor: "#e74c3c" }]}
          />
        </View>
      </View>

      <ScrollView style={styles.boardContainer}>{renderBoard()}</ScrollView>

      <View style={styles.controls}>
        {gameState.currentTask && (
          <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>
              {gameState.currentTask.category}
            </Text>
            <Text style={styles.taskText}>{gameState.currentTask.text}</Text>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={completeTask}
            >
              <Text style={styles.completeButtonText}>Complete Task</Text>
            </TouchableOpacity>
          </View>
        )}
        (
        <>
          {!!gameState.diceValue && (
            <Text style={styles.diceValueDisplay}>
              Rolled: {gameState.diceValue}
            </Text>
          )}
          <TouchableOpacity
            onPress={handleRoll}
            disabled={gameState.status !== "playing"}
            style={[
              styles.rollButton,
              gameState.status !== "playing" && styles.disabledButton,
            ]}
          >
            <Animated.View style={diceAnimatedStyle}>
              <Text style={styles.diceEmoji}>🎲</Text>
            </Animated.View>
            <Text style={styles.rollButtonText}>
              {gameState.status === "moving" ? "Moving..." : "Roll Dice"}
            </Text>
          </TouchableOpacity>
        </>
        )
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
  },
  activePlayer: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  tokenIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  boardContainer: {
    flex: 1,
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    justifyContent: "center",
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
    borderRadius: 4,
  },
  tileNumber: {
    fontSize: 8,
    color: "#95a5a6",
    position: "absolute",
    top: 1,
    left: 1,
  },
  tokenContainer: {
    flexDirection: "row",
    gap: 2,
  },
  token: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
  },
  controls: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
    minHeight: 120, // fixed height to prevent jumps
    justifyContent: "center",
  },
  rollButton: {
    backgroundColor: "#2c3e50",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  disabledButton: {
    opacity: 0.5,
  },
  diceEmoji: {
    fontSize: 24,
  },
  rollButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  diceValueDisplay: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 16,
  },
  taskContainer: {
    width: "100%",
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: 8,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  taskText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 24,
  },
  completeButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    width: "100%",
    alignItems: "center",
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
