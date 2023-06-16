import { Component, Input, NgZone, OnInit } from '@angular/core';
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

  constructor(private sanitizer: DomSanitizer,
              private ngZone: NgZone) { }

  ngOnInit(): void {
  }
// Sanitize the HTML content with the DomSanitizer service
sanitizeHtml(html: string): any {
  return this.sanitizer.bypassSecurityTrustHtml(html);
}

languages = [
  { name: 'Java', value: 'java',checked: true },
  { name: 'C++', value: 'C++',checked: false },
  { name: 'Python', value: 'python',checked: false },
  { name: 'JavaScript', value: 'javascript',checked: false },
  { name: 'C#', value: 'c#',checked: false },
];
editorOptions = {theme: 'vs-dark', language: 'java'};
code: string= this.savedAnswer;

changeLanguage(language: string): void {
  this.languages.forEach(lang => {
    lang.checked = lang.value === language;
  });
  this.ngZone.run(() => {
    this.editorOptions = {
      ...this.editorOptions,
      language: language
    };
  });
}
onCodeChange(code: string): void {
  this.savedAnswer = code;
}
}
