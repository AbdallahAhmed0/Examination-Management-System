import { ExamService } from './../../Services/exam.service';
import { Question, Exam } from './../../Models/exam';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-render-exam',
  templateUrl: './render-exam.component.html',
  styleUrls: ['./render-exam.component.scss'],
})
export class RenderExamComponent implements OnInit {
  exam: Exam = {} as Exam;
  responseString: string | undefined;
  answerID:any[] = [];
  answerMatching:any[] = [];

  questions: Question[] = [];
  questionPages: Question[][] = [];
  currentPageIndex = 0;

  remainingTime!: string;
  attemptData: any;

  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    const examId = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.renderExam(examId);
    // Get the array parameter from the state object
    this.attemptData = history.state.data;
    console.log(this.attemptData)
  }

  renderExam(examId: number): void {
    this.examService.renderExam(examId).subscribe((data) => {
      this.exam = data;
      this.startTimer(this.exam.duration);

      if (data.questions) {
        // Check if data.question is defined
        this.questions = data.questions;
        this.questionPages = this.chunk(this.questions, +data.questionsPerPage);
        // this.questionPages = this.chunk(this.questions, 3);
        // console.log(this.questions);
      }
    });
  }

  startTimer(duration: number) {
    let minutes = duration;
    let seconds = 0;
    this.remainingTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Create a setInterval function that will update the remaining time every second
    const intervalId = setInterval(() => {
      // Decrement the seconds
      seconds--;
      if (seconds < 0) {
        // Decrement the minutes if seconds reach 0
        minutes--;
        if (minutes < 0) {
          // Submit the exam if time is up
        } else {
          seconds = 59;
        }
      }
      // Update the remaining time
      this.remainingTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      // Check if both minutes and seconds are equal to 0
      if (minutes === 0 && seconds === 0) {
        // Submit the exam if time is up
        this.submitExam();
        clearInterval(intervalId);
      }
    }, 1000);
  }

  chunk(questions: Question[], size: number): Question[][] {
    return Array.from(
      { length: Math.ceil(questions.length / size) },
      (_, index) => questions.slice(index * size, index * size + size)
    );
  }

  previousPage() {
    this.currentPageIndex--;
  }

  nextPage() {
    this.currentPageIndex++;
  }



  saveAnswersById(attemptId:any ,answers: any[]): void {
    const observer={
      next: (answer:any) => {
      },
      error: (err:Error)=>{
        //Take dicition when occur Error
        }
    }
    this.examService.saveSelectedStudentAnswer(attemptId,answers).subscribe(observer);
  }

  saveAnswersByText(attemptId:any, answers: any[]): void {
    const observer={
      next: (answer:any) => {
      },
      error: (err:Error)=>{
        //Take dicition when occur Error
        }
    }
    this.examService.saveCompleteStudentAnswer(attemptId,answers).subscribe(observer);
  }

  addAnswerByIDs(answer:any){
    this.answerID.push(answer);
  }
  addAnswerByString(answer:any){
    this.answerMatching.push(answer);
  }

  savePage(): void {
    this.saveAnswersById(this.attemptData.id,this.answerID);
    this.saveAnswersByText(this.attemptData.id,this.answerMatching);
    this.answerID = [];
    this.answerMatching = [];
  }

  submitExam(): void {

    this.saveAnswersById(this.attemptData.id,this.answerID);
    this.saveAnswersByText(this.attemptData.id,this.answerMatching);
    this.answerID = [];
    this.answerMatching = [];

    this.examService.endExam(this.attemptData.id).subscribe(()=>{
      if(this.exam.showResult){
        //go to Show Answer Page
      }else{
        this.router.navigate(['/courses']);
      }
    })
}

}
