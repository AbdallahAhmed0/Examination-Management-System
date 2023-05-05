import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-true-false-question',
  templateUrl: './true-false-question.component.html',
  styleUrls: ['./true-false-question.component.scss']
})
export class TrueFalseQuestionComponent implements OnInit {
  @Input() question!:any;
  @Input() index!:number;
    constructor(private sanitizer: DomSanitizer,) { }

    ngOnInit(): void {
    }
      // Sanitize the HTML content with the DomSanitizer service
      sanitizeHtml(html: string): any {
        return this.sanitizer.bypassSecurityTrustHtml(html);
      }


  }
