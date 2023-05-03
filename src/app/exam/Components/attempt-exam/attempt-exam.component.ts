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

  // Send userId and examId then get response with user data
  getAttemptExamData(userId: number) {
    this._examService
      .attemptExam(this.examId, userId)
      .subscribe((data) => console.log(data));
  }

  startExam(examId: any) {
    this.router.navigate(['exams/render/', examId]); //This should take the user to the exam
    this.getAttemptExamData(1); //FIXed userID
    this._examService.renderExam(examId);
  }
}
