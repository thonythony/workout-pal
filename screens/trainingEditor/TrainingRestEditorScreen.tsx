import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableHighlight, Button } from "react-native";
import InputDuration from "../../components/InputDuration";
import { TrainingContext } from "../../context/trainingContext";
import useCapitalize from "../../hooks/useCapitalize";
import ITraining from "../../interfaces/training";

type TrainingRestEditorScreenProps = {
  navigation: any;
  route: { params: { training: ITraining; mode: "create" | "edit" } };
};

export default function TrainingRestEditorScreen({
  navigation,
  route,
}: TrainingRestEditorScreenProps) {
  const context = useContext(TrainingContext);
  const {
    params: { mode, training },
  } = route;
  const [rest, setRest] = useState(training?.rest || 0);
  const modeCapitalized = useCapitalize(mode);

  function onChange(value: number) {
    setRest(value);
    training.rest = value;
  }

  async function onSubmit() {
    try {
      await context.saveTraining({ ...training, rest });
      navigation.navigate(`${modeCapitalized}TrainingExercises`, { training });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <InputDuration
        label={"Set time to rest between exercises"}
        value={rest || 0}
        onChange={onChange}
        style={styles.input}
      />
      <TouchableHighlight style={styles.button}>
        <Button
          color="black"
          title={"Add exercises"}
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
