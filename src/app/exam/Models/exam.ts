import { Course } from "src/app/course/course.model";

export interface Exam {
  id?: string,
  examName: string,
  duration: number,
  startTime: Date,
  endTime: Date,
  successRate:number,
  status:boolean,
  course: Course
}
