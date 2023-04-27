export interface Question {
  id?: number,
  questionText: string,
  points: number,
  questionType: string,
  questionAnswers: answers[],

}
interface answers{

    id?: number,
    answerText: string,
    correctAnswer: boolean,
    comment: string
}
