import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Answer } from './../../../Models/exam';

@Component({
  selector: 'app-multible-answers-question',
  templateUrl: './multible-answers-question.component.html',
  styleUrls: ['./multible-answers-question.component.scss']
})
export class MultibleAnswersQuestionComponent implements OnInit {

  @Input() question!:any;
  @Input() index!:number;

  @Output() answer = new EventEmitter<object>();

  answerForm!: FormGroup;
  Answers!:object;
  constructor(private sanitizer: DomSanitizer,
              private fb:FormBuilder) { }

  ngOnInit(): void {
    this.answerForm = this.fb.group({
      questionId: [this.question.id],
      answersIds: this.fb.array([])
    });
    this.addAnswer();

    this.answerForm.valueChanges.subscribe(()=>{

      const selectedAnswers = this.question.questionAnswers
      .filter((_: any, i: number) => this.answers.value[i])
      .map((answer: any) => answer.id);
      this.Answers= {"questionId": this.question.id, "answersIds":selectedAnswers}
      this.answer.emit(this.Answers);
    });

  }

  get answers(): FormArray {
    return this.answerForm.get('answersIds') as FormArray;
  }

  addAnswer() {
    this.question.questionAnswers.forEach(() => {
      this.answers.push(this.fb.control(false));
    });
  }

// Sanitize the HTML content with the DomSanitizer service
  sanitizeHtml(html: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }


}
