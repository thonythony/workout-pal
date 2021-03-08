import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableHighlight, Button } from "react-native";
import InputText from "../../components/InputText";
import { TrainingContext } from "../../context/trainingContext";
import useCapitalize from "../../hooks/useCapitalize";
import {
  CreateExerciseNameEditorScreenProps,
  EditExerciseNameEditorScreenProps,
} from "../../types";

export default function ExerciseNameEditorScreen({
  navigation,
  route,
}: EditExerciseNameEditorScreenProps | CreateExerciseNameEditorScreenProps) {
  const context = useContext(TrainingContext);
  const {
    params: { mode, training, exercise },
  } = route;
  const [name, setName] = useState(exercise?.name || "");
  const modeCapitalized = useCapitalize(mode);

  if (!exercise.trainingId) {
    exercise.trainingId = training.id;
  }

  function onChange(value: string) {
    setName(value);
    exercise.name = value;
  }

  async function onSubmit() {
    try {
      const { id } = await context.saveExercise({ ...exercise, name });
      exercise.id = id;
      navigation.navigate(`${modeCapitalized}ExerciseSets`, {
        mode,
        exercise,
        training,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <InputText
        label={"Choose a name for your exercise"}
        value={name}
        onChange={onChange}
        style={{ width: "100%", marginTop: "auto" }}
      />
      <TouchableHighlight
        style={{
          borderRadius: 10,
          backgroundColor: "yellow",
          opacity: name.length === 0 ? 0.5 : 1,
          padding: 10,
          marginTop: "auto",
          alignSelf: "flex-end",
          width: "100%",
          marginBottom: 32,
        }}
      >
        <Button
          disabled={name.length === 0}
          color="black"
          title={"Apply name"}
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
