import { Component, ElementRef, OnInit } from '@angular/core';
import { Answer, QuestionAnswer } from '../../Models/question-answer-interface';
import { DomSanitizer } from '@angular/platform-browser';
import { ExamService } from '../../Services/exam.service';
@Component({
  selector: 'app-exam-answers',
  templateUrl: './exam-answers.component.html',
  styleUrls: ['./exam-answers.component.scss'],
})
export class ExamAnswersComponent implements OnInit {
  constructor(
    private sanitizer: DomSanitizer,
    private _examService: ExamService
  ) {}

  ngOnInit(): void {
    this.getExamAnswers(102);
    this.getResult(91);
  }
  examAnswers: QuestionAnswer[] = [];
  examResult: any;

  // Security Step
  // Sanitize the HTML content with the DomSanitizer service
  sanitizeHtml(html: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getExamAnswers(examAttemptId: number) {
    this._examService.getAllExamAnswers(examAttemptId).subscribe((response) => {
      this.examAnswers = response;
    });
  }

  getResult(attemptId: number) {
    this._examService
      .getResult(attemptId)
      .subscribe((response) => (this.examResult = response));
  }

  // check if selected using ID
  isSelected(questionAnswerId: number, userAnswers: Answer[]): boolean {
    let isSelectedAns: boolean = userAnswers.some(
      (elm: Answer) => elm.id === questionAnswerId
    );
    return isSelectedAns;
  }
}
