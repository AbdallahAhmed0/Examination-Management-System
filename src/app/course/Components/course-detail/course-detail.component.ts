import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../course.service';
import { Subscription } from 'rxjs';
import { Course } from '../../course.model';
import { Exam } from 'src/app/exam/Models/exam';
import { ExamService } from 'src/app/exam/Services/exam.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogeComponent } from '../../../Shared/material/dialog/dialog.component';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  subRoute ?:Subscription;
  id!: number;
  course !: Course;
  Exams!:Exam[];
  admins !:any;

  constructor(private courseService:CourseService,
              private activatedRoute:ActivatedRoute,
              private examservice:ExamService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subRoute=this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.id=Number(paramMap.get('id'));
      this.courseService.getCourseById(this.id).subscribe(data=>{
        this.course=data
        this.admins=data.admins
        console.log(data);
      })
      this.courseService.getExamsofCourse(this.id).subscribe(data=>{
        this.Exams=data
        console.log(data);

      })
    })
  }
  deleteExam(id :any){
    const dialogRef = this.dialog.open(DialogeComponent, {
      width: '400px',
      height:'280px'
      });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        console.log(id);

        this.examservice.deleteExam(id)
       window.location.reload();

      }

      });


  }


}
