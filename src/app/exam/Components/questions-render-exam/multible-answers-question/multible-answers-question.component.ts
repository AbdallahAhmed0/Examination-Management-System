import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-multible-answers-question',
  templateUrl: './multible-answers-question.component.html',
  styleUrls: ['./multible-answers-question.component.scss']
})
export class MultibleAnswersQuestionComponent implements OnInit {

  @Input() question!:any;

  constructor(private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
  }
    // Sanitize the HTML content with the DomSanitizer service
    sanitizeHtml(html: string): any {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }


}
