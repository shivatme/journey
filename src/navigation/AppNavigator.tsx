import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import GameScreen from "../screens/GameScreen";
import WinnerScreen from "../screens/WinnerScreen";
import DareSetupScreen from "../screens/DareSetupScreen";

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Home: undefined;
  Game: { player1: string; player2: string };
  Winner: { winnerName: string };
  DareSetup: undefined;
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DareSetup" component={DareSetupScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Winner" component={WinnerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
