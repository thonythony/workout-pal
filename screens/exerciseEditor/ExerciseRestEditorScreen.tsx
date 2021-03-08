import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableHighlight, Button } from "react-native";
import InputDuration from "../../components/InputDuration";
import { TrainingContext } from "../../context/trainingContext";
import useCapitalize from "../../hooks/useCapitalize";
import IExercise from "../../interfaces/exercise";
import ITraining from "../../interfaces/training";

type ExerciseRestEditorScreenProps = {
  navigation: any;
  route: {
    params: {
      mode: "create" | "edit";
      exercise: IExercise;
      training: ITraining;
    };
  };
};

export default function ExerciseRestEditorScreen({
  navigation,
  route,
}: ExerciseRestEditorScreenProps) {
  const context = useContext(TrainingContext);
  const {
    params: { mode, exercise, training },
  } = route;
  const [rest, setRest] = useState(exercise?.rest || 0);
  const modeCapitalized = useCapitalize(mode);

  function onChange(value: number) {
    setRest(value);
    exercise.rest = value;
  }

  async function onSubmit() {
    try {
      await context.saveExercise({ ...exercise, rest });
      navigation.navigate(`${modeCapitalized}Training`, {
        screen: `${modeCapitalized}TrainingExercises`,
        params: {
          exercise,
          training,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <InputDuration
        label={"Set time to rest between series"}
        value={rest}
        onChange={onChange}
        style={styles.input}
      />
      <TouchableHighlight style={styles.button}>
        <Button
          color="black"
          title={"Apply rest time"}
          onPress={() => onSubmit()}
        />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 32,
    paddingRight: 32,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "yellow",
    opacity: 1,
    padding: 10,
    marginTop: "auto",
    alignSelf: "flex-end",
    width: "100%",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    marginTop: "auto",
  },
});
