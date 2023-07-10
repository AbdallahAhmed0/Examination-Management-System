import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from '../../Services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from '../../Models/exam';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/course/course.service';
import { Course } from 'src/app/course/course.model';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.scss']
})
export class EditExamComponent implements OnInit {
  exam:Exam ={} as Exam;
  newExam!: FormGroup;
  EditExam!:Exam;
  id!:number;
  consoleError:any;
  subExam?:Subscription;
  subRoute?:Subscription;
  theCourses?:Course[];
  sliderValue?:number;

  editCourse!:any;

  constructor(private router:Router,
    private examService:ExamService,
    private fb:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private courseService:CourseService) { }
    ngOnInit(): void {
      this.getCourses()

      this.subRoute= this.activatedRoute.paramMap.subscribe((paramMap)=>{
        this.id=Number(paramMap.get('id'));

        this.examService.getExamById(this.id).subscribe(data =>{
            this.exam=data;

            this.editCourse=this.exam.course;
            this.sliderValue=data.successRate
            this.sliderValue=data.successRate


            this.newExam = this.fb.group({
              examName:[data.examName,[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
              duration:[data.duration,[Validators.required]],
              successRate:[data.successRate,Validators.required],
              course:[data.course,Validators.required],
              state:[false,[]],
              questionsPerPage:[data.questionsPerPage,[Validators.required]],
              showResult: [data.showResult],
              startTime:[this.formatDateToform(data.startTime.toString()),[Validators.required]],
              endTime:[this.formatDateToform(data.endTime.toString()),[Validators.required]]

            })

    })
  });
    }
    updateExam(){
      const observer={
        next: (exam:Exam) => {
          this.router.navigateByUrl('/exams');
          this.examService.openSnackBar('Updated');
        },
        error: (err:Error)=>{
          this.consoleError = err.message
          }
      }
      let  start = this.startTime?.value
      let  end = this.endTime?.value

      this.startTime?.setValue(this.transformDate(start))
      this.endTime?.setValue(this.transformDate(end))



      this.EditExam=this.newExam.value;
      this.EditExam.id=this.id.toString();


        this.subExam= this.examService.updateExam(this.EditExam).subscribe(observer);

    }
    goback(){
      this.router.navigate(['/exams']);
    }
    getCourses(){
      this.courseService.getAllCourses().subscribe(data=>{
        this.theCourses=data
      })
    }
    transformDate(time:any){
      let transformedDate
      console.log(time);


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
     formatDateToform(dateString: string): string {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }



    get examName(){
      return this.newExam.get('examName')
    }

    get duration(){
      return this.newExam.get('duration')
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
    get course(){
      return this.newExam.get('course')
    }
    get questionsPerPage(){
      return this.newExam.get('questionsPerPage')
    }
  get showResult(){
      return this.newExam.get('showResult')
    }

  }
