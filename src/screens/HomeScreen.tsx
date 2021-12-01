import React, { useContext, useEffect, useState } from "react";
import { Alert, ImageBackground, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { TrainingContext } from "../context/trainingContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import ITraining from "../interfaces/training";
import SwipeableRow from "../components/SwipeableRow";
import IExercise from "../interfaces/exercise";

export default function HomeScreen({ navigation }: any) {
  const context = useContext(TrainingContext);
  const [trainings, setTrainings] = useState([] as any);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchTrainings();
    });

    return unsubscribe;
  }, [navigation]);

  async function fetchTrainings() {
    try {
      const results = await context.getTrainings();
      setTrainings(results);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAction(action: string, training?: ITraining) {
    try {
      Haptics.impactAsync();
      switch (action) {
        case "train":
          navigation.navigate("Train", { trainingId: training?.id });
          break;
        case "create":
          navigation.navigate("CreateTraining");
          break;
        case "edit":
          navigation.navigate("EditTraining", { training });
          break;
        case "delete":
          Alert.alert(
            "Delete training",
            `Are you sure to delete ${training?.name} ?`,
            [
              {
                text: "Yes",
                onPress: async () => {
                  await context.removeTraining(training?.id as number);
                  const trainingsUpdated = trainings.filter(
                    (it: ITraining) => it.id !== training?.id
                  );
                  setTrainings([...trainingsUpdated]);
                },
                style: "destructive",
              },
              {
                text: "No",
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }

  function calculateTotalRestTime(training: ITraining) {
    const exercises = training.exercises || [];
    const totalExercises = exercises.length;

    let total = training.rest * totalExercises;
    total = exercises.reduce((acc: number, exercise: IExercise) => {
      acc += exercise.rest || 0;
      return acc;
    }, total);

    return Math.ceil(total / 60);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.jpeg")}
        style={styles.image}
      ></ImageBackground>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingVertical: 20,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.heading}>Workout Pal</Text>
          <TouchableOpacity onPress={() => handleAction("create")}>
            <MaterialCommunityIcons
              name="plus-circle"
              size={42}
              color="yellow"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ height: 350, maxHeight: 350 }}
          data={trainings}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 30,
                height: 200,
              }}
            >
              <Text style={{ color: "gray", textAlign: "center" }}>
                There is no training. Touch + button to create a new one.
              </Text>
            </View>
          )}
          renderItem={({ item }: { item: ITraining }) => (
            <SwipeableRow
              rightActionList={[
                {
                  action: "edit",
                  icon: "edit",
                  color: "white",
                  backgroundColor: "#16a75a",
                },
                {
                  action: "delete",
                  icon: "delete",
                  color: "white",
                  backgroundColor: "red",
                },
              ]}
              item={item}
              onAction={(action: string) => handleAction(action, item)}
              renderRow={
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <View>
                    <Text style={styles.trainingName}>{item.name}</Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          marginRight: 14,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="format-list-numbered"
                          size={20}
                          color="gray"
                          style={{ paddingTop: 4 }}
                        />
                        <Text
                          style={{
                            color: "gray",
                            marginTop: "auto",
                            marginLeft: 8,
                            fontSize: 14,
                          }}
                        >
                          {item.exercises?.length || 0} exercises
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <MaterialCommunityIcons
                          name="clock-outline"
                          size={20}
                          color="gray"
                          style={{ paddingTop: 4 }}
                        />
                        <Text
                          style={{
                            color: "gray",
                            marginTop: "auto",
                            marginLeft: 8,
                            fontSize: 14,
                          }}
                        >
                          {calculateTotalRestTime(item)}min. rest
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ marginLeft: "auto" }}>
                    <MaterialCommunityIcons
                      name="chevron-double-right"
                      size={24}
                      color="white"
                    />
                  </View>
                </View>
              }
            ></SwipeableRow>
          )}
          keyExtractor={(item, index) => `${item.id} ${index}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  heading: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 48,
  },

  separator: {
    backgroundColor: "gray",
    height: StyleSheet.hairlineWidth,
  },

  trainingName: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "transparent",
    fontSize: 18,
  },
});
