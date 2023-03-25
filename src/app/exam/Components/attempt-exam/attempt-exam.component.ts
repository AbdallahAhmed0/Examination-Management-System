import { throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Exam } from '../../Models/exam';
import { ExamService } from '../../Services/exam.service';
@Component({
  selector: 'app-attempt-exam',
  templateUrl: './attempt-exam.component.html',
  styleUrls: ['./attempt-exam.component.scss']
})
export class AttemptExamComponent implements OnInit {

  constructor(private _examService:ExamService) {}

  ngOnInit(): void {
    this.attemptExam();

  }
  id:number = 2 ;
  examInfo!: Exam;

  attemptExam(){
    this._examService.getExamInfo(this.id).subscribe(
      data=>this.examInfo = data ,
      err => throwError(err || "an error happened while getting exam info")
    )
  }


}
