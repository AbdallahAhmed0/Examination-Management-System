import { Component, OnInit } from '@angular/core';
import { Course } from '../../course.model';
import { CourseService } from './../../course.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogeComponent } from '../../../Shared/material/dialog/dialog.component';


@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})
export class AllCoursesComponent implements OnInit {
  courses!:Course[];

  constructor(private courseService:CourseService,
              public dialog: MatDialog) { }

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

deleteCourse(id:any){
  const dialogRef = this.dialog.open(DialogeComponent, {
    width: '400px',
    height:'280px'
    });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === 'confirm') {

      this.courseService.deleteCourse(id)
      window.location.reload();

    }

    });

}
}
