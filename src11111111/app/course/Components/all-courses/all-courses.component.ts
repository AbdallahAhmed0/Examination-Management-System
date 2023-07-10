import { Component, OnInit } from '@angular/core';
import { Course } from '../../course.model';
import { CourseService } from './../../course.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogeComponent } from '../../../Shared/material/dialog/dialog.component';
import { CustomDialogeComponent } from 'src/app/Shared/material/custom-dialoge/custom-dialoge.component';


@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})
export class AllCoursesComponent implements OnInit {
  courses!:Course[];
  sentDataToDialoge:object={value:'',header:''};
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
  // check if course contain Teachers
  if(course.admins.length){
    const dialogRef = this.dialog.open(CustomDialogeComponent, {
      width: '400px',
      height: '280px',
      data: { value: 'Must Delete All Teachers in this Course Before Delete.',
              header:'Not Allowed' } // Pass the value as an object property
    });
    
    dialogRef.afterClosed().subscribe((result) => {
    });
      // check if course contain Exams
  }else if(course.numOfExams){
    const dialogRef = this.dialog.open(CustomDialogeComponent, {
      width: '400px',
      height: '280px',
      data: { value: 'Must Delete All Exams in this Course Before Delete.',
              header:'Not Allowed' } // Pass the value as an object property
    });
    
    dialogRef.afterClosed().subscribe((result) => {
    });
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
          this.courseService.openSnackBar("Deleted");
        }
      );
    }
    });
  }
}

}
