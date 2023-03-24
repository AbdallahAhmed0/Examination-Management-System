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

  question: Question[]=[];

  constructor(private examService: ExamService) { }

  ngOnInit(): void {

    this.examService.renderExam(2).subscribe(data => {
      this.exam = data;
      console.log(data);
    })

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
