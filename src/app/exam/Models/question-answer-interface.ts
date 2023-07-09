export interface QuestionAnswer {
  id: number;
  questionAnswers: Answer[];
  question: Question;
  points: number;
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
  correctAnswer: boolean;
  comment: string;
}
