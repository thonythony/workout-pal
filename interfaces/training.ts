import IExercise from "./exercise";

export default interface ITraining {
  id?: number;
  name: string;
  rest: number;
  exercises?: IExercise[];
}
