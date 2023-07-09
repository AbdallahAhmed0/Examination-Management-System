import { Course } from 'src/app/course/course.model';

export interface Exam {
  id?: string;
  examName: string;
  duration: number;
  startTime: Date;
  endTime: Date;
  successRate: number;
  state: boolean;
  questionsPerPage: string;
  showResult: boolean;
  noCheatingApp: boolean,
  course: Course;
  question: Question[];
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
