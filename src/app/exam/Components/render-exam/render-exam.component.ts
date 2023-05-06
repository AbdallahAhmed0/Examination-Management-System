import { ExamService } from './../../Services/exam.service';
import { Question, Exam } from './../../Models/exam';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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

  remainingTime: number = 0;
  attemptData: any;

  constructor(
    private examService: ExamService,
    private sanitizer: DomSanitizer,
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
        // this.questionPages = this.chunk(this.questions, +data.questionsPerPage);
        this.questionPages = this.chunk(this.questions, 3);
        // console.log(this.questions);
      }
    });
  }

  startTimer(duration: number) {
    this.remainingTime = duration;

    // Create a setInterval function that will update the remaining time every second
    const intervalId = setInterval(() => {
      // Calculate the remaining time by subtracting the current time from the end time
      this.remainingTime--;
      console.log(this.remainingTime);
      if (this.remainingTime <= 0) {
        this.submitExam();
        clearInterval(intervalId);
      }
    }, 1000 * 60);
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

  // Sanitize the HTML content with the DomSanitizer service
  sanitizeHtml(html: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
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
    console.log('answerID: ', this.answerID,'answerMatching: ',this.answerMatching)
    this.saveAnswersById(this.attemptData.id,this.answerID);
    this.saveAnswersByText(this.attemptData.id,this.answerMatching);
    this.answerID = [];
    this.answerMatching = [];
  }

  submitExam(): void {

    this.examService.endExam(this.attemptData.id).subscribe(()=>{
      if(this.exam.showResult){
        //go to Show Answer Page
      }else{
        this.router.navigate(['/courses']);
      }
    })
}

}
