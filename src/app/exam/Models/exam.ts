import { Course } from "src/app/course/course.model";

export interface Exam {
  id?: string,
  examName: string,
  duration: number,
  startTime: Date,
  endTime: Date,
  successRate:number,
  status:boolean,
  questionsPerPage: string,
  showResult: boolean,
  course: Course

}
export interface Question {
  id: number;
  questionText: string;
  points: number;
  questionType: string;
  questionAnswers: Answer[];
}

export interface Answer {
  id: number;
  answerText: string;
}
