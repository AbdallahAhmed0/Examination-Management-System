

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamService }  from './../../Services/exam.service'

import { Subscription } from 'rxjs';
import { Exam } from './../../Models/exam';
import { Course } from 'src/app/course/course.model';
import { CourseService } from 'src/app/course/course.service';


@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnInit {
  consoleError:any;
  newExam!: FormGroup;
  subExam?:Subscription;
  theCourses?:Course[];
  sliderValue?:number;


  constructor(private router:Router,
    private fb:FormBuilder,
    private examService:ExamService,
    private courseService:CourseService) { }

  ngOnInit(): void {
    this.getCourses()
    this.newExam=this.fb.group({
      examName:['',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      duration:["",[Validators.required]],
      successRate:[0,Validators.required],
      course:["",[Validators.required]],
      state:[false,[]],
      questionsPerPage:["",[Validators.required]],
      showResult: [true],
      noCheatingApp:[true],
      startTime:["",[Validators.required]],
      endTime:["",[Validators.required]]

    })

  }
  goback(){
    this.router.navigateByUrl('/exams');

  }
  addExam(){
    let  start = this.startTime?.value
    let  end = this.endTime?.value
    console.log(start);
    console.log(typeof(start));



    this.startTime?.setValue(this.transformDate(start))
    this.endTime?.setValue(this.transformDate(end))

    const observer={
      next: (exam:Exam) => {
        this.router.navigateByUrl('/exams');
        this.examService.openSnackBar('Added');
      },
      error: (err:Error)=>{
        this.consoleError = err.message
        }
    }

    this.subExam= this.examService.saveExam(this.newExam.value).subscribe(observer);

}

  getCourses(){
    this.courseService.getAllCourses().subscribe(data=>{
      this.theCourses=data
    })
  }
  btnToggle(){

  }
  transformDate(time:any){
    let transformedDate


    let myDate = new Date(time);
    let year = myDate.getFullYear().toString();
    let month = (myDate.getMonth() + 1).toString().padStart(2, '0');
    let day = myDate.getDate().toString().padStart(2, '0');
    let hours:any = myDate.getHours()
    let minutes = myDate.getMinutes().toString().padStart(2, '0');
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;

    if(hours<10){
      hours="0"+hours
    }
    hours = hours ? hours : 12;
    transformedDate = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
    return transformedDate
  }
  get examName(){
    return this.newExam.get('examName')
  }

  get duration(){
    return this.newExam.get('duration')
  }
  get course(){
    return this.newExam.get('course')
  }
  get startTime(){
    return this.newExam.get('startTime')
  }
  get endTime(){
    return this.newExam.get('endTime')
  }
  get successRate(){
    return this.newExam.get('succesRate')
  }
  get questionsPerPage(){
    return this.newExam.get('questionsPerPage')
  }
get showResult(){
    return this.newExam.get('showResult')
  }
  get noCheatingApp(){
    return this.newExam.get('noCheatingApp')
  }
}
