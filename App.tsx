import React from "react";
import { StatusBar } from "expo-status-bar";
import { useKeepAwake } from "expo-keep-awake";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateTrainingScreen from "./src/screens/CreateTrainingScreen";
import TrainScreen from "./src/screens/TrainScreen";
import CreateExerciseScreen from "./src/screens/CreateExerciseScreen";
import EditExerciseScreen from "./src/screens/EditExerciseScreen";
import EditTrainingScreen from "./src/screens/EditTrainingScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { TrainingContextProvider } from "./src/context/trainingContext";
import useDatabase from "./src/hooks/useDatabase";

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
