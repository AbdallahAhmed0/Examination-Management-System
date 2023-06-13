import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-code-question',
  templateUrl: './code-question.component.html',
  styleUrls: ['./code-question.component.scss']
})
export class CodeQuestionComponent implements OnInit {
  @Input() question!:any;
  @Input() index!:number;
  @Input() savedAnswer?:any;

  constructor(private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
  }
// Sanitize the HTML content with the DomSanitizer service
sanitizeHtml(html: string): any {
  return this.sanitizer.bypassSecurityTrustHtml(html);
}

}
