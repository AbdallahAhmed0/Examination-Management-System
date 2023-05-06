import { Component, Input, OnInit } from '@angular/core';
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

  answerForm!: FormGroup;
  answer:any;
  constructor(private sanitizer: DomSanitizer,
              private fb:FormBuilder) { }

ngOnInit(): void {

  this.answer = this.question.questionAnswers[0];
this.answerForm = this.fb.group({
questionId: [this.question.id],
answersIds: this.fb.array([])
});
this.addAnswer();
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
