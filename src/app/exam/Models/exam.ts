export interface Exam {
  id?: string,
  examName: string,
  duration: number,
  startTime: Date,
  successRate:number,
  state:boolean,
  endTime: Date
}
