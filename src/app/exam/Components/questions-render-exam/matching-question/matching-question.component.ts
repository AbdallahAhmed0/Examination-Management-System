import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-matching-question',
  templateUrl: './matching-question.component.html',
  styleUrls: ['./matching-question.component.scss']
})
export class MatchingQuestionComponent implements OnInit {
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
