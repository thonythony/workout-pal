import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ITraining from "../interfaces/training";
import ExerciseNameEditorScreen from "./exerciseEditor/ExerciseNameEditorScreen";
import ExerciseRestEditorScreen from "./exerciseEditor/ExerciseRestEditorScreen";
import ExerciseSetsEditorScreen from "./exerciseEditor/ExerciseSetsEditorScreen";
import IExercise from "../interfaces/exercise";

const EditExerciseStack = createStackNavigator();

type EditExerciseScreenProps = {
  route: { params: { training: ITraining; exercise: IExercise } };
};

export default function EditExerciseScreen({ route }: EditExerciseScreenProps) {
  const { training, exercise } = route.params;
  return (
    <EditExerciseStack.Navigator>
      <EditExerciseStack.Screen
        name="EditExerciseName"
        component={ExerciseNameEditorScreen}
        options={{ headerShown: false }}
        initialParams={{
          mode: "edit",
          training,
          exercise,
        }}
      />
      <EditExerciseStack.Screen
        name="EditExerciseRest"
        component={ExerciseRestEditorScreen}
        options={{ headerShown: false }}
        initialParams={{ mode: "edit" }}
      />
      <EditExerciseStack.Screen
        name="EditExerciseSets"
        component={ExerciseSetsEditorScreen}
        options={{ headerShown: false }}
        initialParams={{ mode: "edit" }}
      />
    </EditExerciseStack.Navigator>
  );
}
