export interface Exam {
  id?: string,
  examName: string,
  duration: number,
  startTime: Date,
  endTime: Date,
  successRate:number,
  state:boolean
}
