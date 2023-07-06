import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Exam } from '../../Models/exam';
import { ExamService } from '../../Services/exam.service';
import { StartExamDialogeComponent } from 'src/app/Shared/material/start-exam-dialoge/start-exam-dialoge.component';
import { MatDialog } from '@angular/material/dialog';
import { StorageServiceService } from 'src/app/login/Services/storage-service.service';
import { PreventRenderWithoutAttemptGuard } from '../../hasVisitedAttemptRoute.guard';
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

  ifUSerAttemptExam:boolean=false;
  userAttemptsExam:any[]=[];
  examAttemptsByUser:any[]=[];
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
    this.getAllAttemptsByUserId(this.userId);
    this.getAllUsersAttemptExam(this.examId);
  this.ifUSerAttemptExam = this.CheckIfStudentAttemptExam(this.userAttemptsExam,this.examAttemptsByUser);
  console.log(this.examAttemptsByUser)
  console.log(this.ifUSerAttemptExam)
  if(this.attemptId){
    this.result = this.getResult(this.attemptId);
  }
  }

  getExamInfo() {
    this.examId = Number(this._activatedRoute.snapshot.paramMap.get('examId'));
    this._examService.getExamById(this.examId).subscribe((data) => {
      this.examInfo = data;
      // err => throwError(err || "an error happened while getting exam info")
    });
  }
  getAllAttemptsByUserId(userId:number){
    this._examService.getAllAttemptsByUserId(userId).subscribe(data=>{
      this.userAttemptsExam = data;
    });
  }
  getAllUsersAttemptExam(examId:number){
    this._examService.getAllUsersAttemptExam(examId).subscribe(data =>{
      this.examAttemptsByUser = data;
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
    getResult(id:number):any{
      this._examService.getResult(id).subscribe(result =>{
        return result;
      })
    }
  }

