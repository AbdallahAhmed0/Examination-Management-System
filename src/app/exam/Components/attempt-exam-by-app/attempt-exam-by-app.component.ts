import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Exam } from '../../Models/exam';
import { ExamService } from '../../Services/exam.service';
import { StorageServiceService } from 'src/app/login/Services/storage-service.service';

@Component({
  selector: 'app-attempt-exam-by-app',
  templateUrl: './attempt-exam-by-app.component.html',
  styleUrls: ['./attempt-exam-by-app.component.scss']
})
export class AttemptExamByAppComponent implements OnInit {


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
    private storageService:StorageServiceService
  ) {

  }

  ngOnInit(): void {
    this.getExamInfo();
    this.userId = this.storageService.getUser().userId;
    this._examService.getAllAttemptsByUserId(this.userId).subscribe(data=>{ //FIXed userID
      this.userAttemptsExam = data;
    });
    this._examService.getAllUsersAttemptExam(this.examId).subscribe(data =>{
      this.examAttemptsByUser = data;
    });
  this.ifUSerAttemptExam = this.CheckIfStudentAttemptExam(this.userAttemptsExam,this.examAttemptsByUser);
  //get Result If Student Atempt exam
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


  CheckIfStudentAttemptExam(array1: any[], array2: any[]): boolean {
      for (let obj1 of array1) {
        for (let obj2 of array2) {
          if (obj1.id === obj2.id) {
            this.attemptId = Number(obj1);
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

