import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-true-false-question',
  templateUrl: './true-false-question.component.html',
  styleUrls: ['./true-false-question.component.scss']
})
export class TrueFalseQuestionComponent implements OnInit {
  @Input() question!:any;
  @Input() index!:number;
  @Input() savedAnswer:any[]=[];

  @Output() answer = new EventEmitter<object>();

  answerForm!: FormGroup;
  Answer:any;
  constructor(private sanitizer: DomSanitizer,
              private fb:FormBuilder) { }

ngOnInit(): void {

  this.Answer = this.question.questionAnswers[0];
  this.answerForm = this.fb.group({
      questionId: [this.question.id],
      answersIds: this.fb.array([])
    });

    this.addAnswer(this.savedAnswer[0]);
    console.log(this.savedAnswer[0])

    this.answerForm.valueChanges.subscribe(()=>{
      this.answer.emit(this.answerForm.value);
    })

}
get answers(): FormArray {
return this.answerForm.get('answersIds') as FormArray;
}
addAnswer(answer = '') {
this.answers.push(new FormControl(answer));
}

    // Sanitize the HTML content with the DomSanitizer service
      sanitizeHtml(html: string): any {
        return this.sanitizer.bypassSecurityTrustHtml(html);
      }


  }
