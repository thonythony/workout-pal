import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TrainingNameEditorScreen from "./trainingEditor/TrainingNameEditorScreen";
import TrainingRestEditorScreen from "./trainingEditor/TrainingRestEditorScreen";
import TrainingExercisesEditorScreen from "./trainingEditor/TrainingExercisesEditorScreen";

const CreateTrainingStack = createStackNavigator();

export default function CreateTrainingScreen() {
  return (
    <CreateTrainingStack.Navigator>
      <CreateTrainingStack.Screen
        name="CreateTrainingName"
        component={TrainingNameEditorScreen}
        options={{ headerShown: false }}
        initialParams={{ mode: "create", training: { name: "", rest: 0 } }}
      />
      <CreateTrainingStack.Screen
        name="CreateTrainingRest"
        component={TrainingRestEditorScreen}
        options={{ headerShown: false }}
        initialParams={{ mode: "create" }}
      />
      <CreateTrainingStack.Screen
        name="CreateTrainingExercises"
        component={TrainingExercisesEditorScreen}
        options={{ headerShown: false }}
      />
    </CreateTrainingStack.Navigator>
  );
}
