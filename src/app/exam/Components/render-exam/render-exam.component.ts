import { ExamService } from './../../Services/exam.service';
import { Question, Exam, Answer } from './../../Models/exam';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-render-exam',
  templateUrl: './render-exam.component.html',
  styleUrls: ['./render-exam.component.scss']
})
export class RenderExamComponent implements OnInit {

  exam?: any;
  responseString: string | undefined;
  answerQustion = [];

  questions: Question[]=[];
  questionForms: FormGroup[] = [];
  questionPages: Question[][] = [];
  currentPageIndex = 0;

  nextButtonLabel = 'Save';

  constructor(private examService: ExamService, private sanitizer: DomSanitizer, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.examService.renderExam(5).subscribe(data => {
      this.exam = data;
      this.questions = this.exam.questions;
      this.questionPages = this.chunk(this.questions, 3);

      console.log(this.exam)

       // Initialize a form group for each question
    this.questionForms = this.questions.map(question => {
      const formGroup = this.formBuilder.group({
        answerIds: []
      });
      return formGroup;
    });
    });
  }

  chunk(questions: Question[], size: number): Question[][] {
    return Array.from(
      { length: Math.ceil(questions.length / size) },
      (_, index) => questions.slice(index * size, index * size + size)
    );
  }

  saveAnswer(): void {
    // Save the answer to the current question.
  }

  nextQuestion(): void {
    // Move to the next question on the current page.
  }

  previousQuestion(): void {
    // Move to the previous question on the current page.
  }

  changePage(pageIndex: number) {
    this.currentPageIndex = pageIndex;
  }

  previousPage() {
    this.currentPageIndex--;
  }

  nextPage() {
    this.currentPageIndex++;

  }

  // onNext() {
  //   if (this.questionForms.valid) {
  //     const data = this.form.value;
  //     this.http.post('your-api-url', data).subscribe(response => {
  //       // handle the response from the server
  //       // navigate to the next page
  //     });
  //   } else {
  //     // handle the case when the form is not valid
  //   }
  // }
  // Sanitize the HTML content with the DomSanitizer service
  sanitizeHtml(html: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }



}



