export interface Exam {
  id?: string,
  examName?: string,
  duration: number,
  startTime: Date,
  endTime: Date,
  successRate: number;
  questions: Question[];
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
