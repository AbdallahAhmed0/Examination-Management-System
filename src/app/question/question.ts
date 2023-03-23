export interface Question {
  id?: string,
  questionText: string,
  points: number,
  questionType: string,
  questionAnswers: answers[],

}
interface answers{

    id?: string,
    answerText: string,
    correctAnswer: boolean,
    comment: string
}
