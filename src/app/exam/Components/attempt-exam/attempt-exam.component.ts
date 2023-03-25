import { ActivatedRoute } from '@angular/router';
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

  constructor(private _examService:ExamService, private _activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.attemptExam();
  }

  examInfo!: Exam;

  attemptExam(){
    let examId = Number(this._activatedRoute.snapshot.paramMap.get('examId')) ;
    this._examService.getExamInfo(examId).subscribe(
      data=>this.examInfo = data ,
      err => throwError(err || "an error happened while getting exam info")
    )
  }


}
