import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
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
} from "react-native-reanimated";
import { useBoardGame } from "../hooks/useBoardGame";

type RootStackParamList = {
  Home: undefined;
  Game: { player1: string; player2: string };
  Winner: { winnerName: string };
};

type GameScreenRouteProp = RouteProp<RootStackParamList, "Game">;

const { width } = Dimensions.get("window");
const TILE_SIZE = (width - 32) / 5; // 5 columns

export default function GameScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<GameScreenRouteProp>();
  const { player1, player2 } = route.params;

  const { gameState, startGame, rollDice, completeTask } = useBoardGame();

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

  // Dice Animation
  const diceScale = useSharedValue(1);
  const diceRotation = useSharedValue(0);

  const handleRoll = () => {
    diceScale.value = withSequence(
      withTiming(0.8, { duration: 100 }),
      withSpring(1.2),
      withSpring(1)
    );
    diceRotation.value = withSequence(
      withTiming(360, { duration: 500 }),
      withTiming(0, { duration: 0 })
    );
    rollDice();
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
    for (let i = 50; i >= 1; i--) {
      tiles.push(i);
    }

    return (
      <View style={styles.board}>
        {tiles.map((tileNumber) => {
          const isP1Here = gameState.positions[0] === tileNumber;
          const isP2Here = gameState.positions[1] === tileNumber;

          // Determine row for snake pattern (optional, but simple grid is easier for now)
          // Let's just do simple grid for MVP

          let backgroundColor = "#ecf0f1";
          if (tileNumber <= 10) backgroundColor = "#dff9fb"; // Warmup
          else if (tileNumber <= 25) backgroundColor = "#fef9e7"; // Personal
          else if (tileNumber <= 40) backgroundColor = "#fdedec"; // Bold
          else backgroundColor = "#e8f8f5"; // Final

          return (
            <View key={tileNumber} style={[styles.tile, { backgroundColor }]}>
              <Text style={styles.tileNumber}>{tileNumber}</Text>
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
            {gameState.diceValue
              ? `Rolled: ${gameState.diceValue}`
              : "Roll Dice"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task Modal */}
      <Modal
        visible={!!gameState.currentTask}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {gameState.currentTask?.category.toUpperCase()}
            </Text>
            <Text style={styles.modalText}>{gameState.currentTask?.text}</Text>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={completeTask}
            >
              <Text style={styles.completeButtonText}>Complete Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontSize: 10,
    color: "#95a5a6",
    position: "absolute",
    top: 2,
    left: 2,
  },
  tokenContainer: {
    flexDirection: "row",
    gap: 4,
  },
  token: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
  },
  controls: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 32,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#7f8c8d",
    marginBottom: 16,
    letterSpacing: 1,
  },
  modalText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 32,
  },
  completeButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
