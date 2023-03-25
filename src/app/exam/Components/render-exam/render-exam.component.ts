import { ExamService } from './../../Services/exam.service';
import { Question, Exam } from './../../Models/exam';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-render-exam',
  templateUrl: './render-exam.component.html',
  styleUrls: ['./render-exam.component.scss']
})
export class RenderExamComponent implements OnInit {

  exam?: Exam;
  responseString: string | undefined;

  question: Question[]=[];

  constructor(private examService: ExamService) { }

  ngOnInit(): void {

    this.examService.renderExam(2).subscribe(data => {
      console.log(data);
      this.exam = {
        id: data.id,
        examName: data.examName,
        duration: data.duration,
        startTime: data.startTime,
        endTime: data.endTime,
        successRate: data.successRate,
        questions: data.questions.map((q) => ({
          id: q.id,
          questionText: this.parseHTML(q.questionText),
          points: q.points,
          questionType: q.questionType,
          questionAnswers: q.questionAnswers.map((a) => ({
            id: a.id,
            answerText: this.parseHTML(a.answerText)
          }))
        }))
      };
      console.log(this.exam)
    });


  }

  parseHTML(htmlString: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body? doc.body.textContent?.trim() || '' : '';
  }






  // checkAnswer(question: Question) {
  //   if (question.selectedAnswer === question.correctAnswer) {
  //     console.log('Correct!');
  //     this.answers[question.id] = true;
  //   } else {
  //     console.log('Wrong answer, try again.');
  //     this.answers[question.id] = false;
  //   }
  // }

  // submitExam() {
  //   const numCorrect = Object.values(this.answers).filter((val) => val === true).length;
  //   const numQuestions = this.exam.questions.length;
  //   const successRate = (numCorrect / numQuestions) * 100;
  //   console.log(`You got ${numCorrect} out of ${numQuestions} correct (${successRate}% success rate).`);
  // }

}
