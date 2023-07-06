import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Exam } from '../../Models/exam';
import { ExamService } from '../../Services/exam.service';
import { StartExamDialogeComponent } from 'src/app/Shared/material/start-exam-dialoge/start-exam-dialoge.component';
import { MatDialog } from '@angular/material/dialog';
import { StorageServiceService } from 'src/app/login/Services/storage-service.service';
import { PreventRenderWithoutAttemptGuard } from '../../hasVisitedAttemptRoute.guard';
import { tap } from 'rxjs';
@Component({
  selector: 'app-attempt-exam',
  templateUrl: './attempt-exam.component.html',
  styleUrls: ['./attempt-exam.component.scss'],
})
export class AttemptExamComponent implements OnInit {


  examInfo!: Exam;
  examId!: number;
  userId:number=0;
  attemptId:number=0;
  result:any;

  ifUSerAttemptExam:number = 0;

  constructor(
    private _examService: ExamService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private preventGuard:PreventRenderWithoutAttemptGuard,
    private storageService:StorageServiceService
  ) {

  }

  ngOnInit(): void {
    this.getExamInfo();
    this.userId = this.storageService.getUser().userId;
    this.checkUserAttemptExamBefore(this.userId,this.examId)

  }

  getExamInfo() {
    this.examId = Number(this._activatedRoute.snapshot.paramMap.get('examId'));
    this._examService.getExamById(this.examId).subscribe((data) => {
      this.examInfo = data;
      // err => throwError(err || "an error happened while getting exam info")
    });
  }
  checkUserAttemptExamBefore(userId:number,examId:number){
    this._examService.getAllAttemptsByUserId(userId).subscribe((userAttemptsExam) => {

      this._examService.getAllUsersAttemptExam(examId).subscribe((examAttemptsByUser) =>{

        this.ifUSerAttemptExam = this.CheckIfStudentAttemptExam(userAttemptsExam,examAttemptsByUser);
        if(this.ifUSerAttemptExam){
          this._examService.getResult(this.ifUSerAttemptExam).subscribe(result =>{
            this.result = result;
          })
        }
      });

    });
  }
  startExam(examId: any) {
    const dialogRef = this.dialog.open(StartExamDialogeComponent, {
      width: '400px',
      height: '270px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {

        //accses to start exam
        this.preventGuard.setAttemptRoute(true);
        this._examService
        .attemptExam(this.examId, this.userId)
        .subscribe((data) => {

        //save attempt Data in local storage
          this.storageService.saveAttemptData(data);
          this._examService.renderExam(examId);
          this.router.navigate(['exams/render/', examId]); //This should take the user to the exam

      });
      }
    });

  }
  CheckIfStudentAttemptExam(array1: any[], array2: any[]): number {
      for (let obj1 of array1) {
        for (let obj2 of array2) {
          if (obj1.id === obj2.id) {
            return obj1.id;
          }
        }
      }
      return 0;
    }
  }

