import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Button,
  FlatList,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ITraining from "../../interfaces/training";
import IExercise from "../../interfaces/exercise";
import { TrainingContext } from "../../context/trainingContext";

type TrainingExercisesEditorScreenProps = {
  navigation: any;
  route: { params: { training: ITraining; exercise?: IExercise } };
};

export default function TrainingExercisesEditorScreen({
  navigation,
  route,
}: TrainingExercisesEditorScreenProps) {
  const context = useContext(TrainingContext);
  const {
    params: { training, exercise },
  } = route;
  const [exercises, setExercises] = useState(training?.exercises || []);

  useEffect(() => {
    if (exercise) {
      const indexExerciseAlreadyExists = exercises?.findIndex(
        (it: IExercise) => it.id === exercise.id
      ) as number;
      if (indexExerciseAlreadyExists === -1) {
        exercises?.push(exercise);
      } else {
        (exercises as IExercise[])[indexExerciseAlreadyExists] = exercise;
      }
      setExercises([...exercises]);
    }
  }, [exercise]);

  async function removeExercise(id: number) {
    try {
      await context.removeExercise(id);
      const exercisesUpdated = exercises?.filter(
        (it: IExercise) => it.id === id
      ) as IExercise[];
      setExercises(exercisesUpdated);
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add some exercises to your training</Text>
      <View style={{ height: 300, width: "100%" }}>
        <FlatList
          data={exercises as any[]}
          style={styles.exerciseList}
          renderItem={(item: any) => {
            return (
              <View style={styles.item}>
                <Text
                  style={{
                    color: "white",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  {item.item.name}
                </Text>
                <TouchableHighlight
                  style={{ marginLeft: "auto" }}
                  onPress={() => removeExercise(item.item.id)}
                >
                  <MaterialIcons name="delete" size={16} color="red" />
                </TouchableHighlight>
              </View>
            );
          }}
          keyExtractor={(item, index) => `${item.id} ${index}`}
        />
      </View>
      <Button
        color="white"
        title="Add more exercise"
        onPress={() => navigation.navigate("CreateExercise", { training })}
      />
      <TouchableHighlight
        style={{
          borderRadius: 10,
          backgroundColor: "yellow",
          opacity: 1,
          padding: 10,
          marginTop: "auto",
          alignSelf: "flex-end",
          width: "100%",
          marginBottom: 32,
        }}
      >
        <Button
          color="black"
          title={"Validate"}
          onPress={() => navigation.navigate("Home")}
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
