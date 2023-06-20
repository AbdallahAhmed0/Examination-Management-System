import { ExamService } from './../../Services/exam.service';
import { Question, Exam } from './../../Models/exam';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Location } from '@angular/common';

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { coding } from 'src/app/question/Models/codingQuestion';

@Component({
  selector: 'app-render-exam',
  templateUrl: './render-exam.component.html',
  styleUrls: ['./render-exam.component.scss'],
})
export class RenderExamComponent implements OnInit,OnDestroy {
  private hasMadeDecision = false;

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
    private location: Location
  ) {}

                  /////////////////////////////////////
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any): void {
    if (!this.hasMadeDecision) {
      event.preventDefault(); // Prevent the default back navigation
      this.handleBrowserBack();
    }
  }

  private handleBrowserBack(): void {
    // Show a confirmation dialog or perform any necessary actions
    const confirmed = window.confirm('Are you sure you want to navigate away?');

    if (confirmed) {
      this.hasMadeDecision = true;
      this.location.back(); // Continue with the back navigation
    }
  }
                /////////////////////////////////////////

  ngOnInit(): void {
    const examId = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.renderExam(examId);
    // Get the array parameter from the state object
    this.attemptData = history.state.data;
    console.log(history.state.data)
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
    let minutes = duration;
    let seconds = 0;
    this.remainingTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Create a setInterval function that will update the remaining time every second
    this.intervalId = setInterval(() => {
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
        clearInterval(this.intervalId);
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
    const observer={
      next: (answer:any) => {
      },
      error: (err:Error)=>{
        //Take dicition when occur Error
        }
    }
    this.examService.saveJudgeCodeQuestion(attemptId,questionId,language,code).subscribe(observer);
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

    const observer={
      next: (answer:any) => {
        // create result
        this.examService.createResult(this.attemptData.id).subscribe(
          data =>{ console.log(data) });

        if(this.exam.showResult){
        //go to Show Answer Page
        this.router.navigate([`/exams/showAnswers/${this.attemptData.id}`]);
      }else{
        this.router.navigate(['/courses']);
      }
      history.pushState(null, '');
    }
    }
    this.examService.endExam(this.attemptData.id).subscribe(observer);

}
ngOnDestroy(): void {
  clearInterval(this.intervalId);
}
}
