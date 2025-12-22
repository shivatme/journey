import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Game: { player1: string; player2: string };
  DareSetup: undefined;
};

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleStart = () => {
    if (!player1.trim() || !player2.trim()) {
      Alert.alert("Error", "Please enter names for both players.");
      return;
    }
    navigation.navigate("Game", { player1, player2 });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Journey</Text>
        <Text style={styles.subtitle}>A Couples Board Game</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Player 1 Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={player1}
            onChangeText={setPlayer1}
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Player 2 Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={player2}
            onChangeText={setPlayer2}
            placeholderTextColor="#888"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate("DareSetup")}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Add Custom Dares
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#7f8c8d",
    marginBottom: 48,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#2c3e50",
  },
  button: {
    width: "100%",
    height: 56,
    backgroundColor: "#e74c3c",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#e74c3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e74c3c",
    marginTop: 16,
    shadowColor: "transparent",
    elevation: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  secondaryButtonText: {
    color: "#e74c3c",
  },
});
