import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableHighlight, Button } from "react-native";
import InputNumber from "../../components/InputNumber";
import { TrainingContext } from "../../context/trainingContext";
import useCapitalize from "../../hooks/useCapitalize";
import IExercise from "../../interfaces/exercise";
import ITraining from "../../interfaces/training";

export default function ExerciseSetsEditorScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: {
    params: {
      mode: "create" | "update";
      exercise: IExercise;
      training: ITraining;
    };
  };
}) {
  const context = useContext(TrainingContext);
  const {
    params: { mode, exercise, training },
  } = route;
  const [series, setSeries] = useState(exercise?.series || 0);
  const modeCapitalized = useCapitalize(mode);

  function onChange(value: number) {
    setSeries(value);
    exercise.series = value;
  }

  async function onSubmit() {
    try {
      await context.saveExercise({ ...exercise, series });
      navigation.navigate(`${modeCapitalized}ExerciseRest`, {
        exercise,
        training,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <InputNumber
        label={"How many sets for your exercise ?"}
        value={series || 0}
        onChange={onChange}
        style={{ width: "100%", marginTop: "auto" }}
      />
      <TouchableHighlight
        style={{
          borderRadius: 10,
          backgroundColor: "yellow",
          opacity: series === 0 ? 0.5 : 1,
          padding: 10,
          marginTop: "auto",
          alignSelf: "flex-end",
          width: "100%",
          marginBottom: 32,
        }}
      >
        <Button
          disabled={series === 0}
          color="black"
          title={"Apply sets"}
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
  text: {
    color: "#fff",
    fontSize: 48,
    textAlign: "left",
    alignSelf: "flex-start",
    marginTop: "auto",
  },
  input: {
    height: 80,
    fontSize: 32,
    width: "100%",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderColor: "gray",
    borderWidth: 1,
    color: "gray",
  },
  exerciseList: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 32,
  },
  item: {
    borderBottomWidth: 1,
    borderColor: "gray",
    width: "100%",
    flex: 1,
    height: 64,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
