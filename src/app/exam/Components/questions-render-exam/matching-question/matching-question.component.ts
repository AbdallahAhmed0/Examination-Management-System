import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-matching-question',
  templateUrl: './matching-question.component.html',
  styleUrls: ['./matching-question.component.scss']
})
export class MatchingQuestionComponent implements OnInit {
  @Input() question!:any;
  @Input() index!:number;
  @Input() savedAnswer?:any;

  @Output() answer = new EventEmitter<object>();

  answerForm!: FormGroup;
  constructor(private sanitizer: DomSanitizer,
              private fb:FormBuilder) { }

  ngOnInit(): void {
    if(this.savedAnswer[this.question.id]){
      this.answerForm = this.fb.group({
        questionId: [this.question.id],
        textAnswer: [this.savedAnswer[this.question.id]]
      });
    }else{
      this.answerForm = this.fb.group({
        questionId: [this.question.id],
        textAnswer: ['']
      });
    }
    this.answer.emit(this.answerForm.value);
    this.answerForm.valueChanges.subscribe(()=>{
      this.answer.emit(this.answerForm.value);
    });
  }


  // Sanitize the HTML content with the DomSanitizer service
      sanitizeHtml(html: string): any {
        return this.sanitizer.bypassSecurityTrustHtml(html);
      }

}
