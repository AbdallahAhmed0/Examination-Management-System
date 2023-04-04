import { Component, OnInit } from '@angular/core';
import { Course } from '../../course.model';
import { CourseService } from './../../course.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})
export class AllCoursesComponent implements OnInit {
  courses!:Course[];

  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
    this.getCourses()

  }
  goCourse(id:number){
    console.log(id);


  }
getCourses(){
  this.courseService.getAllCourses().subscribe(data=>{
    this.courses=data
    console.log(data);

  })
}
}
