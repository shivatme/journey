import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDares } from "../context/DareContext";

export default function DareSetupScreen() {
  const navigation = useNavigation();
  const { customDares, addDare, removeDare } = useDares();
  const [newDare, setNewDare] = useState("");

  const handleAdd = () => {
    if (newDare.trim()) {
      addDare(newDare);
      setNewDare("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Custom Dares</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a custom dare..."
            value={newDare}
            onChangeText={setNewDare}
            placeholderTextColor="#95a5a6"
            onSubmitEditing={handleAdd}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Your Dares ({customDares.length})</Text>

        <FlatList
          data={customDares}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.dareItem}>
              <Text style={styles.dareText}>{item}</Text>
              <TouchableOpacity
                onPress={() => removeDare(index)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No custom dares added yet. Add some to spice up the game!
            </Text>
          }
          contentContainerStyle={styles.listContent}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#3498db",
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#2c3e50",
  },
  addButton: {
    width: 80,
    height: 50,
    backgroundColor: "#2ecc71",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  dareItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dareText: {
    flex: 1,
    fontSize: 16,
    color: "#2c3e50",
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteButtonText: {
    fontSize: 18,
    color: "#e74c3c",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#95a5a6",
    marginTop: 32,
    fontSize: 16,
  },
});
