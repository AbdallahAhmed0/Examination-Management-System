import { ExamService } from './../../Services/exam.service';
import { Question, Exam, Answer } from './../../Models/exam';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-render-exam',
  templateUrl: './render-exam.component.html',
  styleUrls: ['./render-exam.component.scss'],
})
export class RenderExamComponent implements OnInit {
  exam?: Exam;
  responseString: string | undefined;
  answerQustion = [];

  questions: Question[] = [];
  questionForms: FormGroup[] = [];
  questionPages: Question[][] = [];
  currentPageIndex = 0;

  nextButtonLabel = 'Save';
  timeRemaining: number = 0;
  attemptData: any;

  constructor(
    private examService: ExamService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const examId = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.renderExam(examId);
    // Get the array parameter from the state object
    this.attemptData = history.state.data;
  }

  renderExam(examId: number): void {
    this.examService.renderExam(examId).subscribe((data) => {
      this.exam = data;
      this.questions = data.questions;
      this.questionPages = this.chunk(this.questions, 3);

      console.log(this.exam);

      // Initialize a form group for each question
      this.questionForms = this.questions.map((question) => {
        const formGroup = this.formBuilder.group({
          answerIds: [],
        });
        return formGroup;
      });

      // Calculate the time remaining in seconds
      const now = new Date();
      const endTime = new Date(this.exam.endTime);
      this.timeRemaining = Math.max(
        0,
        Math.floor((endTime.getTime() - now.getTime()) / 1000)
      );

      // Start the countdown timer
      setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
        } else {
          // Time's up, submit the exam
          this.submitExam();
        }
      }, 1000);
    });
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

  savePage() {
    // if (this.exam) {
    //   const questionIds = this.questionPages[this.currentPageIndex].map(
    //     (question) => question.id
    //   );
    //   const answerIds = this.questionForms.map(
    //     (form) => form.controls['answerIds'].value
    //   );

    //   // Save answers for each question
    //   for (let i = 0; i < questionIds.length; i++) {
    //     const questionId = questionIds[i];
    //     const answerId = answerIds[i];

    //     const questionType = this.questions.find(
    //       (q) => q.id === questionId
    //     )?.questionType;
    //     if (
    //       questionType === 'multiple_choice' ||
    //       questionType === 'true_false'
    //     ) {
    //       this.examService
    //         .saveSelectedStudentAnswer(
    //           this.attemptData.id,
    //           questionId,
    //           answerId
    //         )
    //         .subscribe((response) => {
    //           console.log(response);
    //         });
    //     } else if (questionType === 'multiple_answers') {
    //       const answer = new Answer();
    //       answer.id = answerId;
    //       this.examService
    //         .saveSelectedStudentAnswer(this.attemptData.id, questionId, answer)
    //         .subscribe((response) => {
    //           console.log(response);
    //         });
    //     }
    //   }

    //   console.log('Page saved.');
    // }
  }

  // show answer nav

  submitExam() {

  }

  // Sanitize the HTML content with the DomSanitizer service
  sanitizeHtml(html: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // edit it to duration not date 
  formatTimeRemaining(): string {
    const hours = Math.floor(this.timeRemaining / 3600);
    const minutes = Math.floor((this.timeRemaining % 3600) / 60);
    const seconds = this.timeRemaining % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
