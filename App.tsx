import React from "react";
import { StatusBar } from "expo-status-bar";
import { useKeepAwake } from "expo-keep-awake";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateTrainingScreen from "./screens/CreateTrainingScreen";
import TrainScreen from "./screens/TrainScreen";
import CreateExerciseScreen from "./screens/CreateExerciseScreen";
import EditExerciseScreen from "./screens/EditExerciseScreen";
import EditTrainingScreen from "./screens/EditTrainingScreen";
import HomeScreen from "./screens/HomeScreen";
import { TrainingContextProvider } from "./context/trainingContext";
import useDatabase from "./hooks/useDatabase";

const Stack = createStackNavigator();

export default function App() {
  useKeepAwake();
  const isDatabaseReady = useDatabase();

  if (isDatabaseReady === false) {
    return null;
  }

  return (
    <TrainingContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TrainingList">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Workout Pal",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Train"
            component={TrainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateTraining"
            component={CreateTrainingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateExercise"
            component={CreateExerciseScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditTraining"
            component={EditTrainingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditExercise"
            component={EditExerciseScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </TrainingContextProvider>
  );
}
