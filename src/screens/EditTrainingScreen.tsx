import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TrainingNameEditorScreen from "./trainingEditor/TrainingNameEditorScreen";
import TrainingRestEditorScreen from "./trainingEditor/TrainingRestEditorScreen";
import TrainingExercisesEditorScreen from "./trainingEditor/TrainingExercisesEditorScreen";
import ITraining from "../interfaces/training";

const EditTrainingStack = createStackNavigator();

type EditTrainingScreenProps = {
  route: { params: { training: ITraining } };
};

export default function EditTrainingScreen({ route }: EditTrainingScreenProps) {
  const { training } = route.params;
  return (
    <EditTrainingStack.Navigator>
      <EditTrainingStack.Screen
        name="EditTrainingName"
        component={TrainingNameEditorScreen}
        options={{ headerShown: false }}
        initialParams={{ mode: "edit", training }}
      />
      <EditTrainingStack.Screen
        name="EditTrainingRest"
        component={TrainingRestEditorScreen}
        options={{ headerShown: false }}
        initialParams={{ mode: "edit" }}
      />
      <EditTrainingStack.Screen
        name="EditTrainingExercises"
        component={TrainingExercisesEditorScreen}
        options={{ headerShown: false }}
      />
    </EditTrainingStack.Navigator>
  );
}
