import { ExamService } from './../../Services/exam.service';
import { Question, Exam } from './../../Models/exam';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { coding } from 'src/app/question/Models/codingQuestion';
import { MatDialog } from '@angular/material/dialog';
import { EndExamDialogeComponent } from 'src/app/Shared/material/end-exam-dialoge/end-exam-dialoge.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { StorageService } from 'src/app/login/Services/storage.service';
import { PreventRenderWithoutAttemptGuard } from '../../hasVisitedAttemptRoute.guard';

@Component({
  selector: 'app-render-exam',
  templateUrl: './render-exam.component.html',
  styleUrls: ['./render-exam.component.scss'],
})
export class RenderExamComponent implements OnInit,OnDestroy {

  exam: Exam = {} as Exam;
  responseString: string | undefined;
  answerID:any[] = [];
  answerMatching:any[] = [];
  answerCoding:any[] = [];

  questions: Question[] = [];
  codeQuestions:coding[]=[];
  questionPages: Question[][] = [];
  currentPageIndex:number = 1;
  questionsPerPage!:number;

  remainingTime!: string;
  attemptData: any;
  intervalId:any;

  statusCode:any={status:'',log:''};

  // when click previous and next send value to questions components untile save in form
  sentAnswerToChoice:{[key: string]: any} = {};
  sentAnswerToMultibleAnswers:{[key: string]: any} = {};
  sentAnswerToTrue_False:{[key: string]: any} = {};
  sentAnswerToMatching:{[key: string]: any} = {};
  sentAnswerToCoding:{[key: string]: any} = {};

  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private router:Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private storageServices:StorageService,
    private preventGuard:PreventRenderWithoutAttemptGuard,

  ) {}


  ngOnInit(): void {
    const examId = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.renderExam(examId);

    this.attemptData = JSON.parse(this.storageServices.getAttemptData());

    if(!this.attemptData){
      this.router.navigate(['/exams']);
    }
  }

  renderExam(examId: number): void {
    this.examService.renderExam(examId).subscribe((data) => {
      this.exam = data;
      this.startTimer(this.exam.duration);


      if (data.codeQuestionDtos) {
        // Handle code questions
          this.codeQuestions = data.codeQuestionDtos;
      }
      if (data.questions) {
        // Handle regular questions
        const regularQuestions = data.questions;
        this.questionPages = this.chunk([...this.codeQuestions,...regularQuestions], +data.questionsPerPage);
        this.questionsPerPage = +data.questionsPerPage;
      }
    });
  }


  startTimer(duration: number) {
    const storedStartTime = localStorage.getItem('examStartTime');
    let startTime: number;

    if (storedStartTime) {
      startTime = Number(storedStartTime);
    } else {
      startTime = Date.now();
      localStorage.setItem('examStartTime', startTime.toString());
    }

    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const remainingTime = duration * 60 - elapsedTime;

    if (remainingTime <= 0) {
      this.endExam();
      return;
    }

    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;

    this.remainingTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    this.intervalId = setInterval(() => {
      seconds--;
      if (seconds < 0) {
        minutes--;
        if (minutes < 0) {
          this.endExam();
          clearInterval(this.intervalId);
          return;
        } else {
          seconds = 59;
        }
      }
      this.remainingTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      if (minutes === 0 && seconds === 0) {
        this.endExam();
        clearInterval(this.intervalId);
        localStorage.removeItem('examStartTime');
      }
      let endTime = new Date(this.exam.endTime);
      if (endTime.getTime() <= Date.now()) {
        this.endExam();
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
  saveAnswersByCoding(attemptId:number,questionId:number,language:string,code:string): void {

    this.examService.saveJudgeCodeQuestion(attemptId,questionId,language,code).pipe(
      tap((response:any) => {
      this.statusCode = response
        if(!this.statusCode.status){
            const snackBarRef = this.snackBar.open('Compilation Error '+this.statusCode.log, 'Close', {
              duration: 7000,
              verticalPosition: 'top',
              panelClass: ['mat-toolbar', 'mat-warn']
            })

          }
        })
      ).subscribe();
    }




  addAnswerByIDs(answer:any,questionType:any){

    const existingAnswerIndex = this.answerID.findIndex(a => a.questionId === answer.questionId);
    existingAnswerIndex !== -1 ? this.answerID[existingAnswerIndex] = answer :this.answerID.push(answer);

    if(questionType == 'Multiple_choice'){
      this.sentAnswerToChoice[answer.questionId] = answer.answersIds;
    }
    else if(questionType == 'Multiple_Answers'){
      this.sentAnswerToMultibleAnswers[answer.questionId] = answer.answersIds;
    }
    else{
      this.sentAnswerToTrue_False[answer.questionId] = answer.answersIds;
    }
  }
  addAnswerByString(answer:any){
    const existingAnswerIndex = this.answerMatching.findIndex(a => a.questionId === answer.questionId);
    existingAnswerIndex !== -1 ? this.answerMatching[existingAnswerIndex] = answer :this.answerMatching.push(answer);

    this.sentAnswerToMatching[answer.questionId] = answer.textAnswer;
  }
  addAnswerByCoding(answer:any){
    const existingAnswerIndex = this.answerCoding.findIndex(a => a.questionId === answer.questionId);
    existingAnswerIndex !== -1 ? this.answerCoding[existingAnswerIndex] = answer :this.answerCoding.push(answer);

    this.sentAnswerToCoding[answer.questionId] = answer;
  }

  savePage(): void {
    console.log(this.attemptData)
    this.saveAnswersById(this.attemptData.id,this.answerID);
    this.saveAnswersByText(this.attemptData.id,this.answerMatching);
    // to sent question by question
    this.answerCoding.forEach(ques=>{
      this.saveAnswersByCoding(this.attemptData.id,ques.questionId,ques.language,ques.code);
      console.log(this.attemptData.id,ques.questionId,ques.language,ques.code)
    })
    console.log("ID",this.answerID,"matching",this.answerMatching,"Coding",this.answerCoding)
    this.answerID = [];
    this.answerMatching = [];
    this.answerCoding = [];
  }

  submitExam(): void {

    const dialogRef = this.dialog.open(EndExamDialogeComponent, {
      width: '400px',
      height: '280px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.endExam();
      }
    });

}
endExam(){

  this.saveAnswersById(this.attemptData.id,this.answerID);
  this.saveAnswersByText(this.attemptData.id,this.answerMatching);
 // to sent question by question
  this.answerCoding.forEach(ques=>{
    this.saveAnswersByCoding(this.attemptData.id,ques.questionId,ques.language,ques.code);
  })
  clearInterval(this.intervalId);
  this.answerID = [];
  this.answerMatching = [];
  this.answerCoding = [];

  localStorage.removeItem('examStartTime');
  const observer={
    next: (answer:any) => {
      // sent to guards to allow change routing
      this.examService.variableSubject.next(true);
      this.preventGuard.setAttemptRoute(false);

      // create result
      this.examService.createResult(this.attemptData.id).subscribe(
        data =>{ console.log(data) });

      if(this.exam.showResult){
      //go to Show Answer Page
      this.router.navigate([`/exams/showAnswers/${this.attemptData.id}`]);
    }else{
      this.router.navigate(['/courses']);
    }
  }
  }
  this.examService.endExam(this.attemptData.id).subscribe(observer);
  // remove Attempt Date on local storge
}
ngOnDestroy(): void {
  clearInterval(this.intervalId);
}
}
