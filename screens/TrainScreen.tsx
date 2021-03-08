import React, { useContext, useEffect, useReducer } from "react";
import * as Haptics from "expo-haptics";
import {
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Animatable from "react-native-animatable";
import useFormatSecondsToMinSec from "../hooks/useFormatSecondsToMinSec";
import { TrainingContext } from "../context/trainingContext";

const renderTime = ({ remainingTime }: { remainingTime: number }) => {
  const { min, sec } = useFormatSecondsToMinSec(remainingTime);
  return (
    <Text style={{ color: "#fff", fontSize: 48 }}>
      {min}:{sec < 10 ? "0" + sec.toString() : sec}
    </Text>
  );
};

type Action = {
  type: "next" | "rest-ended" | string;
  [key: string]: any;
};

type State = {
  training: any;
  rest: number;
  progress: number;
  finished: boolean;
  exercise: any;
  lastExercise: boolean;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "set-training":
      return {
        ...state,
        training: action.training,
        exercise: action.training.exercises[0],
        progress: 0,
      };
    case "next":
      let rest = 0;
      let exercise = { ...state.exercise };
      let progress = state.progress;
      let finished = false;
      let lastExercise = false;

      if (!state.training.exercises[progress + 1]) {
        lastExercise = true;
      }

      if (exercise.series > 1) {
        exercise.series--;
        rest = exercise.rest;
      } else {
        progress += 1;
        if (state.training.exercises[progress]) {
          exercise = state.training.exercises[progress];
          rest = state.training.rest;
        } else {
          exercise = null;
          finished = true;
        }
      }

      return {
        ...state,
        exercise,
        progress,
        finished,
        rest,
        lastExercise,
      };
    case "rest-ended":
      return {
        ...state,
        rest: 0,
      };
    default:
      throw new Error("Action not handled");
  }
}

export default function TrainScreen({ route }: any) {
  const context = useContext(TrainingContext);
  const [state, dispatch] = useReducer(reducer, {
    training: undefined,
    rest: 0,
    progress: 0,
    exercise: undefined,
    finished: false,
    lastExercise: false,
  });

  useEffect(() => {
    async function loadTraining() {
      try {
        if (route.params.trainingId) {
          const training = await context.getTraining(route.params.trainingId);
          dispatch({
            type: "set-training",
            training,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadTraining();
  }, [route.params?.trainingId]);

  function getButtonTitle(): string {
    if (state.lastExercise === true && state.exercise?.series === 1) {
      return "Finish training";
    } else if (state.exercise?.series === 1) {
      return "Next exercise";
    } else {
      return "Next serie";
    }
  }

  return (
    <View style={styles.container}>
      {state.rest > 0 && state.finished === false && (
        <Animatable.View
          style={styles.restContainer}
          animation="bounceInRight"
          iterationCount={1}
        >
          <CountdownCircleTimer
            isPlaying={state.rest > 0}
            duration={state.rest}
            colors={"#FFF"}
            trailColor={"#121212"}
            onComplete={() => dispatch({ type: "rest-ended" })}
          >
            {renderTime}
          </CountdownCircleTimer>
          <View style={styles.restButton}>
            <Button
              color="white"
              title="Pass timer"
              onPress={() => {
                Haptics.impactAsync();
                dispatch({ type: "rest-ended" });
              }}
            />
          </View>
        </Animatable.View>
      )}
      {state.rest === 0 && state.finished === false && (
        <View style={styles.exerciseContainer}>
          <Animatable.View
            style={{ alignItems: "center" }}
            animation="bounceInDown"
            iterationCount={1}
          >
            <Text style={styles.exerciseName}>{state.exercise?.name}</Text>
            <Text style={styles.finishedText}>{state.exercise?.series}</Text>
            <Text style={styles.text}>Serie(s) remaining</Text>
          </Animatable.View>

          <Animatable.View
            style={{
              borderRadius: 10,
              backgroundColor: "yellow",
              padding: 10,
              marginTop: "auto",
              width: "100%",
            }}
            animation="bounceInUp"
            iterationCount={1}
          >
            <TouchableHighlight>
              <Button
                color="black"
                title={getButtonTitle()}
                onPress={() => {
                  Haptics.impactAsync();
                  dispatch({ type: "next" });
                }}
              />
            </TouchableHighlight>
          </Animatable.View>
        </View>
      )}
      {state.finished === true && (
        <View style={styles.finishedContainer}>
          <Animatable.Text
            animation="tada"
            iterationCount={5}
            style={styles.finishedText}
          >
            Great job!
          </Animatable.Text>
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 0 }}
            fallSpeed={5000}
            autoStart={true}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    height: "100%",
  },
  restContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  restButton: {
    marginTop: 48,
  },
  exerciseContainer: {
    flex: 1,
    alignItems: "center",
    padding: 50,
  },
  exerciseName: {
    color: "#fff",
    fontSize: 24,
    margin: 16,
    fontWeight: "bold",
    marginTop: 84,
    textTransform: "uppercase",
    marginBottom: 64,
  },
  text: {
    color: "#fff",
  },
  finishedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  finishedText: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "bold",
  },
});
