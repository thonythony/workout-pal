import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import ITraining from "./interfaces/training";
import IExercise from "./interfaces/exercise";

export type CreateExerciseStackParamList = {
  CreateExerciseName: {
    mode: "create";
    exercise: IExercise;
    training: ITraining;
  };
  CreateExerciseRest: {
    mode: "create";
    training: ITraining;
  };
  CreateExerciseSeries: {
    mode: "create";
    exercise: IExercise;
    training: ITraining;
  };
};

export type EditExerciseStackParamList = {
  EditExerciseName: {
    mode: "edit";
    exercise: IExercise;
    training: ITraining;
  };
  EditExerciseRest: {
    mode: "edit";
    training: ITraining;
  };
  EditExerciseSeries: {
    mode: "edit";
    exercise: IExercise;
    training: ITraining;
  };
};

type CreateExerciseNameEditorScreenRouteProp = RouteProp<
  CreateExerciseStackParamList,
  "CreateExerciseName"
>;

type CreateExerciseNameEditorScreenNavigationProp = StackNavigationProp<
  CreateExerciseStackParamList,
  "CreateExerciseName"
>;

export type CreateExerciseNameEditorScreenProps = {
  route: CreateExerciseNameEditorScreenRouteProp;
  navigation: CreateExerciseNameEditorScreenNavigationProp;
};

type EditExerciseNameEditorScreenRouteProps = RouteProp<
  EditExerciseStackParamList,
  "EditExerciseName"
>;

type EditExerciseNameEditorScreenNavigationProps = StackNavigationProp<
  EditExerciseStackParamList,
  "EditExerciseName"
>;

export type EditExerciseNameEditorScreenProps = {
  route: EditExerciseNameEditorScreenRouteProps;
  navigation: EditExerciseNameEditorScreenNavigationProps;
};
