import * as SQLite from "expo-sqlite";
import IExercise from "./interfaces/exercise";
import ITraining from "./interfaces/training";

const db = SQLite.openDatabase("workoutpal.db");

const getTrainings = (): Promise<ITraining[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await executeSql(
        `
          SELECT trainings.id AS Training_id, 
                 trainings.name AS Training_name,
                 trainings.rest AS Training_rest,
                 exercises.id as Training__exercises_id,
                 exercises.name as Training__exercises_name,
                 exercises.rest as Training__exercises_rest,
                 exercises.sets as Training__exercises_sets
          FROM trainings
          LEFT JOIN exercises ON exercises.trainingId = trainings.id;
        `
      );
      const trainings = (result.rows as any)._array.reduce(
        (acc: ITraining[], item: any) => {
          const index = acc.findIndex(
            (it: ITraining) => it.id === item["Training_id"]
          );

          const exercise = {
            id: item["Training__exercises_id"],
            name: item["Training__exercises_name"],
            rest: item["Training__exercises_rest"],
            sets: item["Training__exercises_sets"],
            trainingId: item["Training_id"],
          };

          if (index === -1) {
            acc.push({
              id: item["Training_id"],
              name: item["Training_name"],
              rest: item["Training_rest"],
              exercises: [exercise],
            });
          } else if (acc[index]) {
            if (!acc[index].exercises) {
              acc[index].exercises = [];
            }
            acc[index].exercises?.push(exercise);
          }

          return acc;
        },
        [] as ITraining[]
      );

      return resolve(trainings);
    } catch (error) {
      return reject(error);
    }
  });
};

const getTraining = (id: number): Promise<ITraining> => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await executeSql(
        `
        SELECT trainings.id AS Training_id, 
                trainings.name AS Training_name,
                trainings.rest AS Training_rest,
                exercises.id as Training__exercises_id,
                exercises.name as Training__exercises_name,
                exercises.rest as Training__exercises_rest,
                exercises.sets as Training__exercises_sets
        FROM trainings
        LEFT JOIN exercises ON exercises.trainingId = trainings.id
        WHERE trainings.id = ?;
        `,
        [id]
      );
      const training = (result.rows as any)._array.reduce(
        (acc: ITraining, item: any) => {
          const exercise = {
            id: item["Training__exercises_id"],
            name: item["Training__exercises_name"],
            rest: item["Training__exercises_rest"],
            sets: item["Training__exercises_sets"],
            trainingId: item["Training_id"],
          };

          if (!acc.id) {
            acc = {
              id: item["Training_id"],
              name: item["Training_name"],
              rest: item["Training_rest"],
              exercises: [exercise],
            };
          } else {
            acc.exercises?.push(exercise);
          }

          return acc;
        },
        {} as ITraining
      );

      return resolve(training);
    } catch (error) {
      return reject(error);
    }
  });
};

const createTraining = (training: ITraining): Promise<ITraining> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, exercises, ...payload } = training;
      const result = await executeSql(
        "INSERT INTO trainings (name, rest) VALUES (?, ?)",
        Object.values(payload)
      );

      training.id = result.insertId;
      return resolve(training);
    } catch (error) {
      return reject(error);
    }
  });
};

const updateTraining = (training: ITraining): Promise<ITraining> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, exercises, ...payload } = training;
      let sqlQuery = Object.keys(payload).reduce((query, key, idx, allKeys) => {
        query += `${key} = ?`;
        if (idx <= allKeys.length - 2) {
          query += ", ";
        }

        return query;
      }, "UPDATE trainings SET ");

      sqlQuery += " WHERE id = ?";
      const params = [...Object.values(payload), id];

      await executeSql(sqlQuery, params);

      return resolve(training);
    } catch (error) {
      return reject(error);
    }
  });
};

const removeTraining = (id: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await executeSql("DELETE FROM trainings WHERE id = ?", [id]);
      return resolve();
    } catch (error) {
      return reject(error);
    }
  });
};

const createExercise = async (exercise: IExercise): Promise<IExercise> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await executeSql(
        "INSERT INTO exercises (name, rest, sets, trainingId) VALUES (?, ?, ?, ?)",
        Object.values(exercise)
      );

      exercise.id = result.insertId;
      return resolve(exercise);
    } catch (error) {
      return reject(error);
    }
  });
};

const updateExercise = async (exercise: IExercise): Promise<IExercise> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...payload } = exercise;
      let sqlQuery = Object.keys(payload).reduce((query, key, idx, allKeys) => {
        query += `${key} = ?`;
        if (idx <= allKeys.length - 2) {
          query += ", ";
        }

        return query;
      }, "UPDATE exercises SET ");

      sqlQuery += " WHERE id = ?";
      const params = [...Object.values(payload), id];

      await executeSql(sqlQuery, params);

      return resolve(exercise);
    } catch (error) {
      return reject(error);
    }
  });
};

const removeExercise = async (id: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await executeSql("DELETE FROM exercises WHERE id = ?", [id]);
      return resolve();
    } catch (error) {
      return reject(error);
    }
  });
};

const executeSql = (
  query: string,
  params?: any[]
): Promise<SQLite.SQLResultSet> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      async (tx: SQLite.SQLTransaction) => {
        tx.executeSql(
          query,
          params,
          (_: SQLite.SQLTransaction, result: SQLite.SQLResultSet) => {
            resolve(result);
          },
          (_: SQLite.SQLTransaction, err: SQLite.SQLError) => {
            reject(err);
            return true;
          }
        );
      },
      (err: SQLite.SQLError) => reject(err)
    );
  });
};

const setupDatabase = (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await executeSql(
        `CREATE TABLE IF NOT EXISTS trainings (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT NOT NULL,
                  rest INTEGER NOT NULL
               );`
      );
      await executeSql(
        `CREATE TABLE IF NOT EXISTS exercises (
                  id INTEGER PRIMARY KEY NOT NULL, 
                  name TEXT NOT NULL, 
                  rest INTEGER NOT NULL, 
                  sets INTEGER NOT NULL, 
                  trainingId INTEGER
               );`
      );
      await executeSql(
        `CREATE TABLE temp_training_exercise (
                  id INTEGER PRIMARY KEY NOT NULL, 
                  name TEXT NOT NULL, 
                  rest INTEGER NOT NULL, 
                  sets INTEGER NOT NULL, 
                  trainingId INTEGER, 
                  CONSTRAINT "FK_42" FOREIGN KEY (trainingId) REFERENCES trainings (id) ON DELETE CASCADE ON UPDATE CASCADE
               );`
      );
      await executeSql(
        `INSERT INTO temp_training_exercise (id, name, rest, sets, trainingId) SELECT id, name, rest, sets, trainingId FROM exercises;`
      );
      await executeSql(`DROP TABLE exercises;`);
      await executeSql(
        `ALTER TABLE temp_training_exercise RENAME TO exercises;`
      );
      return resolve();
    } catch (error) {
      return reject(error);
    }
  });
};

export default {
  setupDatabase,
  getTrainings,
  getTraining,
  createExercise,
  createTraining,
  updateTraining,
  updateExercise,
  removeExercise,
  removeTraining,
};
