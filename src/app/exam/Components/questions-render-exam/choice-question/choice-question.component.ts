import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-choice-question',
  templateUrl: './choice-question.component.html',
  styleUrls: ['./choice-question.component.scss']
})
export class ChoiceQuestionComponent implements OnInit {
@Input() question!:any;

  constructor(private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
  }
    // Sanitize the HTML content with the DomSanitizer service
    sanitizeHtml(html: string): any {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }


}
