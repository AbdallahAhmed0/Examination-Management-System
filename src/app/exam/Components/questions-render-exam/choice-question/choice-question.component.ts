import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-choice-question',
  templateUrl: './choice-question.component.html',
  styleUrls: ['./choice-question.component.scss']
})
export class ChoiceQuestionComponent implements OnInit {
@Input() question!:any;
@Input() index!:number;

@Output() answer = new EventEmitter<object>();


answerForm!: FormGroup;
constructor(private sanitizer: DomSanitizer,
              private fb:FormBuilder) { }

  ngOnInit(): void {

    this.answerForm = this.fb.group({
      questionId: [this.question.id],
      answersIds: this.fb.array([])
    });
    this.addAnswer();

    this.answerForm.valueChanges.subscribe(()=>{
      this.answer.emit(this.answerForm.value);
      this.answerForm.patchValue(this.answerForm.value)
    });

  }
  get answers(): FormArray {
    return this.answerForm.get('answersIds') as FormArray;
  }
addAnswer() {
  this.answers.push(new FormControl(''));
  }
    // Sanitize the HTML content with the DomSanitizer service
    sanitizeHtml(html: string): any {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }


}
