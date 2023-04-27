import { Component, OnInit } from '@angular/core';
import { tstarr } from './tst-data';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-exam-answers',
  templateUrl: './exam-answers.component.html',
  styleUrls: ['./exam-answers.component.scss'],
})
export class ExamAnswersComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}
  questions = tstarr;

  // Security Step
  // Sanitize the HTML content with the DomSanitizer service
  sanitizeHtml(html: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
