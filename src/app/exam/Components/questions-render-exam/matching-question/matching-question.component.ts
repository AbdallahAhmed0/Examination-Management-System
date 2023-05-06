import { Component, Input, OnInit } from '@angular/core';
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

  answerForm!: FormGroup;
constructor(private sanitizer: DomSanitizer,
              private fb:FormBuilder) { }

  ngOnInit(): void {

    this.answerForm = this.fb.group({
      questionId: [this.question.id],
      textAnswer: ['']
    });

  }


  // Sanitize the HTML content with the DomSanitizer service
      sanitizeHtml(html: string): any {
        return this.sanitizer.bypassSecurityTrustHtml(html);
      }

}
