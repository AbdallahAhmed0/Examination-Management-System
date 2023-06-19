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
  deleteCourseError?:{id:number,msg:string};
  constructor(private courseService:CourseService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCourses()

  }

getCourses(){

  this.courseService.getAllCourses().subscribe(data=>{
    this.courses=data
  })
}

deleteCourse(course:any){
  if(course.admins.length){
    this.deleteCourseError = {id:course.id,msg:"Must Delete All Teachers in this Course Before Delete"};

  }else{
  const dialogRef = this.dialog.open(DialogeComponent, {
    width: '400px',
    height:'280px'
    });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === 'confirm') {

      this.courseService.deleteCourse(course.id).subscribe(
        (data)=>{
          window.location.reload();
          this.courseService.openSnackBar("Deleted");}
      );
    }
    });
  }
}

}
