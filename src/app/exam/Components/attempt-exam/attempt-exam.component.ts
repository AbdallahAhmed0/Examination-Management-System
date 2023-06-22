import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Exam } from '../../Models/exam';
import { ExamService } from '../../Services/exam.service';
import { StartExamDialogeComponent } from 'src/app/Shared/material/start-exam-dialoge/start-exam-dialoge.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-attempt-exam',
  templateUrl: './attempt-exam.component.html',
  styleUrls: ['./attempt-exam.component.scss'],
})
export class AttemptExamComponent implements OnInit {


  examInfo!: Exam;
  examId!: number;

  attemptData:any;
  ifUSerAttemptExam:boolean=false;
  userAttemptsExam:any[]=[];
  examAttemptsByUser:any[]=[];
  constructor(
    private _examService: ExamService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog

  ) {}

  ngOnInit(): void {
    this.getExamInfo();
    this._examService.getAllAttemptsByUserId(1).subscribe(data=>{ //FIXed userID
      this.userAttemptsExam = data;
    });
    this._examService.getAllUsersAttemptExam(this.examId).subscribe(data =>{
      this.examAttemptsByUser = data;
    });

  this.ifUSerAttemptExam = this.CheckIfStudentAttemptExam(this.userAttemptsExam,this.examAttemptsByUser);
  }

  getExamInfo() {
    this.examId = Number(this._activatedRoute.snapshot.paramMap.get('examId'));
    this._examService.getExamById(this.examId).subscribe((data) => {
      this.examInfo = data;
      // err => throwError(err || "an error happened while getting exam info")
    });
  }


  startExam(examId: any) {
    const dialogRef = this.dialog.open(StartExamDialogeComponent, {
      width: '400px',
      height: '270px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this._examService
        .attemptExam(this.examId, 1) //FIXed userID
        .subscribe((data) => {
          this.attemptData = data;
          this._examService.renderExam(examId);
          this.router.navigate(['exams/render/', examId],{state:{data:this.attemptData}}); //This should take the user to the exam

      });
      }
    });

  }
  CheckIfStudentAttemptExam(array1: any[], array2: any[]): boolean {
      for (let obj1 of array1) {
        for (let obj2 of array2) {
          if (obj1.id === obj2.id) {
            return true;
          }
        }
      }
      return false;
    }
  }

