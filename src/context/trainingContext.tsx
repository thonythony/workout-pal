import React, { createContext } from "react";
import database from "../database";
import IExercise from "../interfaces/exercise";
import ITraining from "../interfaces/training";

export type TrainingContextType = {
  getTrainings: () => Promise<ITraining[]>;
  getTraining: (id: number) => Promise<ITraining>;
  saveTraining: (training: ITraining) => Promise<ITraining>;
  removeTraining: (id: number) => Promise<void>;
  saveExercise: (exercise: IExercise) => Promise<IExercise>;
  removeExercise: (id: number) => Promise<void>;
};

export const TrainingContext = createContext<TrainingContextType>(
  {} as TrainingContextType
);

export const TrainingContextProvider = ({ children }: any) => {
  const getTrainings = () => {
    return database.getTrainings();
  };

  const getTraining = (id: number) => {
    return database.getTraining(id);
  };

  const saveTraining = (training: ITraining) => {
    if (training.id) {
      return database.updateTraining(training);
    }

    return database.createTraining(training);
  };

  const removeTraining = (id: number) => {
    return database.removeTraining(id);
  };

  const saveExercise = (exercise: IExercise) => {
    if (exercise.id) {
      return database.updateExercise(exercise);
    }

    return database.createExercise(exercise);
  };

  const removeExercise = (id: number) => {
    return database.removeExercise(id);
  };

  const trainingContext = {
    getTrainings,
    getTraining,
    saveTraining,
    removeTraining,
    saveExercise,
    removeExercise,
  };

  return (
    <TrainingContext.Provider value={trainingContext}>
      {children}
    </TrainingContext.Provider>
  );
};
