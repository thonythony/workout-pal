import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ITraining from "../interfaces/training";
import ExerciseNameEditorScreen from "./exerciseEditor/ExerciseNameEditorScreen";
import ExerciseRestEditorScreen from "./exerciseEditor/ExerciseRestEditorScreen";
import ExerciseSetsEditorScreen from "./exerciseEditor/ExerciseSetsEditorScreen";
import { CreateExerciseStackParamList } from "../types";

// type CreateExerciseStackParamList = {
//   CreateExerciseName: {
//     mode: "create";
//     training: ITraining;
//     exercise: IExercise;
//   };
//   CreateExerciseRest: {
//     mode: "create";
//     training: ITraining;
//   };
//   CreateExerciseSeries: {
//     mode: "create";
//     training: ITraining;
//   };
// };

const CreateExerciseStack = createStackNavigator<
  CreateExerciseStackParamList
>();

type CreateExerciseScreenProps = { route: { params: { training: ITraining } } };

export default function CreateExerciseScreen({
  route,
}: CreateExerciseScreenProps) {
  const { training } = route.params;
  return (
    <CreateExerciseStack.Navigator>
      <CreateExerciseStack.Screen
        name="CreateExerciseName"
        component={ExerciseNameEditorScreen}
        options={{ headerShown: false }}
        initialParams={{
          mode: "create",
          training,
          exercise: { name: "", rest: 0, sets: 0 },
        }}
      />
      <CreateExerciseStack.Screen
        name="CreateExerciseRest"
        component={ExerciseRestEditorScreen}
        options={{ headerShown: false }}
        initialParams={{ mode: "create", training }}
      />
      <CreateExerciseStack.Screen
        name="CreateExerciseSeries"
        component={ExerciseSetsEditorScreen}
        options={{ headerShown: false }}
        initialParams={{ mode: "create", training }}
      />
    </CreateExerciseStack.Navigator>
  );
}
