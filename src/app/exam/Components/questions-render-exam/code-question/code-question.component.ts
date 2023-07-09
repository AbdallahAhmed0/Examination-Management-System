import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
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

  @Output() answer = new EventEmitter<object>();

  lang:string='java';
  languages = [
    { name: 'java', value: 'java',checked: true },
    { name: 'C++', value: 'C++',checked: false },
    { name: 'python', value: 'python',checked: false },
    { name: 'javaScript', value: 'javascript',checked: false },
    { name: 'C#', value: 'c#',checked: false },
  ];
  editorOptions = {theme: 'vs-dark', language: 'java'};
  code: string= 'class Main{\r\n public static void main(String [] args){\r\n \r\n }\r\n}';

  constructor(private sanitizer: DomSanitizer,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    if(this.savedAnswer[this.question.id]){
      this.code = this.savedAnswer[this.question.id].code;
    }
    this.onCodeChange(this.code);
  }

changeLanguage(language: string): void {
  this.lang = language;
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
  this.answer.emit({questionId:this.question.id,language:this.lang,code:code});
}
// Sanitize the HTML content with the DomSanitizer service
sanitizeHtml(html: string): any {
  return this.sanitizer.bypassSecurityTrustHtml(html);
}

}
