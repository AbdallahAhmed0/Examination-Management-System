import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Exam } from '../../Models/exam';
import { ExamService } from '../../Services/exam.service';
@Component({
  selector: 'app-attempt-exam',
  templateUrl: './attempt-exam.component.html',
  styleUrls: ['./attempt-exam.component.scss'],
})
export class AttemptExamComponent implements OnInit {

  attemptData:any;
  constructor(
    private _examService: ExamService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getExamInfo();
  }

  examInfo!: Exam;
  examId!: number;

  getExamInfo() {
    this.examId = Number(this._activatedRoute.snapshot.paramMap.get('examId'));
    this._examService.getExamById(this.examId).subscribe((data) => {
      this.examInfo = data;
      // err => throwError(err || "an error happened while getting exam info")
    });
  }


  startExam(examId: any) {
    this._examService
    .attemptExam(this.examId, 1) //FIXed userID
    .subscribe((data) => {
      this.attemptData = data;
      this._examService.renderExam(examId);
      this.router.navigate(['exams/render/', examId],{state:{data:this.attemptData}}); //This should take the user to the exam

  });


  }
}
