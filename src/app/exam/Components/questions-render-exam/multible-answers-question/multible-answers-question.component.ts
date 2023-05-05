import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-multible-answers-question',
  templateUrl: './multible-answers-question.component.html',
  styleUrls: ['./multible-answers-question.component.scss']
})
export class MultibleAnswersQuestionComponent implements OnInit {

  @Input() question!:any;
  @Input() index!:number;

  answerForm!: FormGroup;

  constructor(private sanitizer: DomSanitizer,
              private fb:FormBuilder) { }

        ngOnInit(): void {
          this.answerForm = this.fb.group({
            questionId: [this.question.id],
            answersIds: this.fb.array([])
          });
          this.addAnswer()
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
