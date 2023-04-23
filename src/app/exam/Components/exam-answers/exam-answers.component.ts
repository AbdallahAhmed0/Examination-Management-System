import { Component, OnInit } from '@angular/core';
import { tstarr } from './tst-data';
@Component({
  selector: 'app-exam-answers',
  templateUrl: './exam-answers.component.html',
  styleUrls: ['./exam-answers.component.scss'],
})
export class ExamAnswersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  questions = tstarr;
}
