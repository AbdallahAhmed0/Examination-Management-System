import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Exam } from '../../Models/exam';
import { ExamService } from '../../Services/exam.service';
import { StorageService } from 'src/app/login/Services/storage.service';

@Component({
  selector: 'app-attempt-exam-by-app',
  templateUrl: './attempt-exam-by-app.component.html',
  styleUrls: ['./attempt-exam-by-app.component.scss']
})
export class AttemptExamByAppComponent implements OnInit {


  examInfo!: Exam;
  examId!: number;
  userId:number=0;
  attemptError:any;

  constructor(
    private _examService: ExamService,
    private _activatedRoute: ActivatedRoute,
    private storageService:StorageService
  ) {

  }

  ngOnInit(): void {
    this.getExamInfo();
    this.userId = this.storageService.getUser().userId;

    this.solveExam(this.examId);

  }

  getExamInfo() {
    this.examId = Number(this._activatedRoute.snapshot.paramMap.get('examId'));
    this._examService.getExamById(this.examId).subscribe((data) => {
      this.examInfo = data;
      // err => throwError(err || "an error happened while getting exam info")
    });
  }
  solveExam(examId:any){
    this._examService
    .attemptExam(examId, this.userId)
    .subscribe((data) => {
      //accses to start exam
  },
  (err)=>{ this.attemptError = err.message;}
  );
  }
  }
